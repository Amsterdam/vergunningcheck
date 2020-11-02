import {
  Column,
  CompactThemeProvider,
  FooterBottom,
  Footer as FooterComp,
  FooterSection,
  FooterTop,
  Paragraph,
  Row,
} from "@amsterdam/asc-ui";
import React, { memo } from "react";

import { List, ListItem } from "../../atoms";
import { eventNames, sections } from "../../config/matomo";
import { FOOTER } from "../../utils/test-ids";
import Link from "../Link";
import PhoneNumber from "../PhoneNumber";
import { ContentContainer } from "./FooterStyles";

const FirstColumn = () => (
  <>
    <Paragraph gutterBottom={12}>
      Hebt u een vraag en kunt u het antwoord niet vinden op deze website? Neem
      dan contact met ons op.
    </Paragraph>
    <Paragraph gutterBottom={8}>
      <strong>
        Bel het telefoonnummer{" "}
        <PhoneNumber
          darkBackground
          eventName={sections.FOOTER}
          variant={null}
        />
      </strong>{" "}
      maandag tot en met vrijdag van 08.00 tot 18.00 uur.
    </Paragraph>
    <List noPadding>
      <ListItem>
        <Link
          darkBackground
          eventName={`${eventNames.CONTACT_FORM} - ${sections.FOOTER}`}
          href="https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx"
          inList
        >
          Contactformulier
        </Link>
      </ListItem>
      <ListItem>
        <Link
          darkBackground
          eventName={`${eventNames.CONTACT_OPENING} - ${sections.FOOTER}`}
          href="https://www.amsterdam.nl/contact/"
          inList
        >
          Contactgegevens en openingstijden
        </Link>
      </ListItem>
    </List>
  </>
);

const SecondColumn = () => (
  <List noPadding>
    <ListItem>
      <Link
        darkBackground
        eventName={`${eventNames.NEWSLETTER} - ${sections.FOOTER}`}
        href="https://www.amsterdam.nl/nieuwsbrieven/nieuws/nieuwsbrief/nieuwsbrief/"
        inList
      >
        Nieuwsbrief Amsterdam.nl
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`${eventNames.TWITTER} - ${sections.FOOTER}`}
        href="https://twitter.com/AmsterdamNL"
        inList
      >
        Twitter
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`${eventNames.FACEBOOK} - ${sections.FOOTER}`}
        href="https://www.facebook.com/gemeenteamsterdam"
        inList
      >
        Facebook
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`${eventNames.INSTAGRAM} - ${sections.FOOTER}`}
        href="https://www.instagram.com/gemeenteamsterdam/"
        inList
      >
        Instagram
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`${eventNames.LINKEDIN} - ${sections.FOOTER}`}
        href="https://www.linkedin.com/company/gemeente-amsterdam"
        inList
      >
        Linkedin
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`${eventNames.WORK_AT} - ${sections.FOOTER}`}
        href="https://www.amsterdam.nl/bestuur-organisatie/werkenbij/"
        inList
      >
        Werken bij
      </Link>
    </ListItem>
  </List>
);

const ThirdColumn = () => (
  <List noPadding>
    <Paragraph>
      Wat is er te doen in Amsterdam? Informatie over toerisme, cultuur,
      uitgaan, evenementen en meer vindt u op{" "}
      <Link
        darkBackground
        eventName={`${eventNames.IAMSTERDAM} - ${sections.FOOTER}`}
        href="https://www.iamsterdam.com/"
        strong
      >
        Iamsterdam.com
      </Link>
    </Paragraph>
  </List>
);

const Footer = () => (
  <CompactThemeProvider>
    <FooterComp data-testid={FOOTER}>
      <FooterTop style={{ paddingBottom: 16 }}>
        <ContentContainer>
          <Row>
            <Column
              wrap
              span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}
            >
              <FooterSection title="Contact" hideAt="tabletM">
                <FirstColumn />
              </FooterSection>
            </Column>
            <Column
              wrap
              span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}
            >
              <FooterSection title="Volg de gemeente" hideAt="tabletM">
                <SecondColumn />
              </FooterSection>
            </Column>
            <Column
              wrap
              span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}
            >
              <FooterSection title="Uit in Amsterdam" hideAt="tabletM">
                <ThirdColumn />
              </FooterSection>
            </Column>
          </Row>
        </ContentContainer>
      </FooterTop>

      <ContentContainer>
        <FooterBottom>
          <Link
            eventName={`${eventNames.ABOUT} - ${sections.FOOTER}`}
            href="https://www.amsterdam.nl/overdezesite/"
            inList
          >
            Over deze site
          </Link>
          <Link
            eventName={`${eventNames.PRIVACY} - ${sections.FOOTER}`}
            href="https://www.amsterdam.nl/privacy/"
            inList
          >
            Privacy
          </Link>
          <Link
            eventName={`${eventNames.COOKIES} - ${sections.FOOTER}`}
            href="https://www.amsterdam.nl/privacy/cookies-site/"
            inList
          >
            Cookies op deze site
          </Link>
          <Link
            eventName={`${eventNames.WEBARCHIEF} - ${sections.FOOTER}`}
            href="https://www.amsterdam.nl/nieuwsarchief/"
            inList
          >
            Webarchief
          </Link>
        </FooterBottom>
      </ContentContainer>
    </FooterComp>
  </CompactThemeProvider>
);

export default memo(Footer);
