# Roadmap

Nieuwe checkers toe te voegen zonder dat er technisch iets hoeft te gebeuren
Wie gaat dit functioneel beheren? Nu Chris/Banu. Op termijn. "Eigenaar" van de checks (persoon/afdeling). Nog niet helemaal duidelijk omdat we daar nu nog niet zijn.
Checks toevoegen voor andere toepassingen / gemeentes

## Zonder tussenkomst van techniek checkers in productie (loskoppelen)

- Aan uit zetten van checker in acceptatie (gepubliceerd of niet)
- Productie zetten
- Het kunnen updaten van een checker
- Aanmaken van nieuwe checker
- 1 flow-legal; sttr bestand aan checker koppelen
- upload xml
- Obv DSO-url bestand in kunnen laden (on the fly) (Dus niet FTP/VPN/wachtwoord etc.) Is dit DSO compatible.
- Meerdere sttr bestanden in 1 checker samenvoegen
- Formulieren (indieningsvereisten) in kunnen laden
- Intro teksten / uitkomsten wijzigen / aanmaken
- Publieke url's inladen. checkers met zelfde techniek die niet onder omgevingswet vallen

## Beheer van Chappie zelf (beheer-document). Voor dienstverlening.

- Autofill resolvers koppelen
- Geen beheer functionaliteit vd app zelf nodig op korte termijn. Knop tekst, footer, header etc.
- Rollen (per omgeving acc/prod)?
- Wie kan de rollen vervolgens aanpassen?
- Koppeling met gem.a'dam systeem

# Vergunningcheck Manager

Goals:

- Make vergunningcheck application more dynamic (reduce load on development)
- Give team a management tool to be able to change functionality of the system
- Easily test upcoming checkers topics
- Faster iteration on texts, no need for deployment

Functionality:

- Checker configuration
  - remove need for topics.json, should be backend-endpoint
  - add new topic (without deployment)
  - remove [slug].json from frontend repo, should come from backend
  - configure dynamic imtr files (from remote urls)
  - different topics and versions of checkers on differtent environments (staging / production)
- Content management
  - update topic intro's (without deployent)
  - configure topic conclusions (without deployent)
  - site strings configuration, url's, titles, seo, footer etc.
- Sessions
  - store sessions
  - resume sessions (eg. for sharing)
  - data / analytics needs?

# TODO

## IMTR processing

- Manager
  - IMTR file vs Permit vs Topic in admin
  - hosting + production hardening
- GraphQL
  - model Checker
  - mock manager-api in graphql for easy development
  - create mock-update script that scrapes prod manager-api
  - get imtr checker from external url(s)
- Frontend
  - use graphql server instead of imtr-files
  - use topics list from api for homescreen
  - remove imtr-json files from repo and topics.json
- Other
  - remove all imtr-build stuff from repo

## CMS

- use the intro field and update headings

## Sessions

- api-endpoints:
  - save and generate unique hash
  - get by hash
- frontend: restore by hash

## Nice to have

- import imtr file
- autofill in graphql checker object

## API's

GET /v1/topics

```
[
  {
    slug: 'dakkapel-plaatsen',
    name: 'Dakkapel plaatsen',
    flow: 'IMTR',
    permits: [{
      name: 'dakkapel monument',
      imtrUrl: 'http://...',
    }, {
      name: 'dakkapel bouwen',
      imtrUrl: 'http://...',
    }]
  }
]
```

POST /graphql

```
{
  topic(slug: 'dakkapel-plaatsen') {
    slug: 'dakkapel-plaatsen',
    name: 'Dakkapel plaatsen',
    imtr: {
      permits: [{
        "version": 7,
        "name": "Conclusie Dakkapel monument",
        "questions": [{
          "text": "Gaat ..."
          ....
        }],
        ...
      }]
    }
  }
  topics: [...]
}
```
