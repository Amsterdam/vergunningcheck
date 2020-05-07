#!groovy
// Project Settings for Deployment
String PROJECTNAME = "vergunningcheck"
String CONTAINERDIR = "."
String PRODUCTION_BRANCH = "master"
String ACCEPTANCE_BRANCH = "develop"
String PLAYBOOK = 'deploy.yml'

// All other data uses variables, no changes needed for static
String NGINX_CONTAINERNAME = "ois/vergunningcheck_nginx:${env.BUILD_NUMBER}"
String NGINX_DOCKERFILE="ci/Dockerfile.client"
String BACKEND_CONTAINERNAME = "ois/vergunningcheck_graphql:${env.BUILD_NUMBER}"
String BACKEND_DOCKERFILE="ci/Dockerfile.graphql"
String BRANCH = "${env.BRANCH_NAME}"

def sendMessage(String message, String color = "good") {
  slackSend message: "${env.JOB_NAME}: ${message} ${env.BUILD_URL}", channel: "#ci-vergunningcheck", color: color
  slackSend message: "${env.JOB_NAME}: ${message} ${env.BUILD_URL}", channel: "#ci-channel", color: color
}

def tryStep(String message, Closure block) {
  try {
    block()
  } catch (Throwable t) {
    sendMessage "WARNING: ${message}", "warning"
    throw t
  }
}

node {
    // Get a copy of the code
    stage("Checkout") {
        checkout scm
    }

    // Build the Dockerfile in the $CONTAINERDIR and push it to Nexus
    stage("Build develop image") {
        tryStep "build", {
            docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                nginx_image = docker.build("${NGINX_CONTAINERNAME}","-f ${NGINX_DOCKERFILE} ${CONTAINERDIR}")
                nginx_image.push()

                backend_image = docker.build("${BACKEND_CONTAINERNAME}","-f ${BACKEND_DOCKERFILE} ${CONTAINERDIR}")
                backend_image.push()
            }
        }
    }
}

// Acceptance branch, fetch the container, label with acceptance and deploy to acceptance.
if (BRANCH == "${ACCEPTANCE_BRANCH}") {
    node {
        stage("Deploy '${ACCEPTANCE_BRANCH}' to ACC") {
            tryStep "Deploy '${ACCEPTANCE_BRANCH}' to ACC", {
                docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                    nginx_image.push("acceptance")
                    backend_image.push("acceptance")
                }

                build job: 'Subtask_Openstack_Playbook',
                        parameters: [
                                [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                                [$class: 'StringParameterValue', name: 'PLAYBOOK', value: "${PLAYBOOK}"],
                                [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_${PROJECTNAME}"],
                                [$class: 'StringParameterValue', name: 'STATIC_CONTAINER', value: "${PROJECTNAME}"],
                        ]
            }
            sendMessage "Build and deployment of '${ACCEPTANCE_BRANCH}' succeeded"
        }
    }
}

// On master branch, fetch the container, tag with production and latest and deploy to production
if (BRANCH == "${PRODUCTION_BRANCH}") {
    node {
        stage("Deploy ${PRODUCTION_BRANCH} to ACC") {
            tryStep "Deploy ${PRODUCTION_BRANCH} to ACC", {
                docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                    nginx_image.push("acceptance")
                    backend_image.push("acceptance")
                }

                build job: 'Subtask_Openstack_Playbook',
                        parameters: [
                                [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                                [$class: 'StringParameterValue', name: 'PLAYBOOK', value: "${PLAYBOOK}"],
                                [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_${PROJECTNAME}"],
                                [$class: 'StringParameterValue', name: 'STATIC_CONTAINER', value: "${PROJECTNAME}"],
                        ]
            }
        }
    }

    stage('Waiting for approval') {
        slackSend channel: '#ci-vergunningcheck', color: 'warning', message: 'Vergunningcheck is waiting for Production Release - please confirm'
        input "Deploy to Production?"
    }

    node {
        stage("Deploy ${PRODUCTION_BRANCH} to PROD") {
            tryStep "Deploy ${PRODUCTION_BRANCH} to PROD", {
                docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                    nginx_image.push("production")
                    nginx_image.push("latest")
                    backend_image.push("production")
                    backend_image.push("latest")
                }

                build job: 'Subtask_Openstack_Playbook',
                        parameters: [
                                [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                                [$class: 'StringParameterValue', name: 'PLAYBOOK', value: "${PLAYBOOK}"],
                                [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_${PROJECTNAME}"],
                                [$class: 'StringParameterValue', name: 'STATIC_CONTAINER', value: "${PROJECTNAME}"],
                        ]
            }
        }
    }
}
