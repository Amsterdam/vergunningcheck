import { Button, Heading } from "@amsterdam/asc-ui";
import React, { Component } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import styled from "styled-components";

import { isProduction } from "../config";

function reloadCurrentPage() {
  window.location.reload();
}

const RELOADED_ONCE = "reloadedOnce";

const PageContainer = styled.div`
  display: flex;
  height: 90vh;
`;

const CenteredContent = styled.div`
  margin: auto;
`;

const ContentBox = styled.div`
  text-align: center;
  margin-bottom: 3em;
`;

interface ErrorBoundaryProps extends WithTranslation {}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate() {
    const reloadedOnce = localStorage.getItem(RELOADED_ONCE);
    /* istanbul ignore else */
    if (reloadedOnce !== "true") {
      localStorage.setItem(RELOADED_ONCE, "true");
      // reload in production only
      // do not reload in develop env to prevent removal of helpful debug info from console
      if (isProduction) {
        reloadCurrentPage();
      }
    }
  }

  render() {
    const { t } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <PageContainer>
          <CenteredContent>
            <ContentBox>
              <Heading>{t("errorMessages.error occured")}</Heading>
            </ContentBox>
            <ContentBox>
              <Button onClick={reloadCurrentPage}>
                {t("errorMessages.reloadCurrentPage")}
              </Button>
            </ContentBox>
          </CenteredContent>
        </PageContainer>
      );
    }

    // this will reset the reloadedOnce flag when app successfully reloads
    localStorage.setItem(RELOADED_ONCE, "false");
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
