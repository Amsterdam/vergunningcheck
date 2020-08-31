import {
  Column,
  CompactThemeProvider,
  FooterBottom,
  Footer as FooterComp,
  FooterSection,
  FooterTop,
  Paragraph,
  Row,
} from "@datapunt/asc-ui";
import React, { memo } from "react";

import { List, ListItem } from "../../atoms";
import { eventNames } from "../../config/matomo";
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
          eventLocation={eventNames.FOOTER}
          variant={null}
        />
      </strong>{" "}
      maandag tot en met vrijdag van 08.00 tot 18.00 uur.
    </Paragraph>
    <List noPadding>
      <ListItem>
        <Link
          darkBackground
          eventName={`contactformulier - ${eventNames.FOOTER}`}
          href="https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx"
          variant="with-chevron"
        >
          Contactformulier
        </Link>
      </ListItem>
      <ListItem>
        <Link
          darkBackground
          eventName={`contactgegevens en openingstijden - ${eventNames.FOOTER}`}
          href="https://www.amsterdam.nl/contact/"
          variant="with-chevron"
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
        eventName={`nieuwsbrief amsterdam.nl - ${eventNames.FOOTER}`}
        href="https://www.amsterdam.nl/nieuwsbrieven/nieuws/nieuwsbrief/nieuwsbrief/"
        variant="with-chevron"
      >
        Nieuwsbrief Amsterdam.nl
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`twitter - ${eventNames.FOOTER}`}
        href="https://twitter.com/AmsterdamNL"
        variant="with-chevron"
      >
        Twitter
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`facebook - ${eventNames.FOOTER}`}
        href="https://www.facebook.com/gemeenteamsterdam"
        variant="with-chevron"
      >
        Facebook
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`instagram - ${eventNames.FOOTER}`}
        href="https://www.instagram.com/gemeenteamsterdam/"
        variant="with-chevron"
      >
        Instagram
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`linkedin - ${eventNames.FOOTER}`}
        href="https://www.linkedin.com/company/gemeente-amsterdam"
        variant="with-chevron"
      >
        Linkedin
      </Link>
    </ListItem>
    <ListItem>
      <Link
        darkBackground
        eventName={`werken bij - ${eventNames.FOOTER}`}
        href="https://www.amsterdam.nl/bestuur-organisatie/werkenbij/"
        variant="with-chevron"
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
        eventName={`iamsterdam.com - ${eventNames.FOOTER}`}
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
            href="https://www.amsterdam.nl/overdezesite/"
            variant="with-chevron"
          >
            Over deze site
          </Link>
          <Link href="https://www.amsterdam.nl/privacy/" variant="with-chevron">
            Privacy
          </Link>
          <Link
            href="https://www.amsterdam.nl/privacy/cookies-site/"
            variant="with-chevron"
          >
            Cookies op deze site
          </Link>
          <Link
            href="https://www.amsterdam.nl/nieuwsarchief/"
            variant="with-chevron"
          >
            Webarchief
          </Link>
        </FooterBottom>
      </ContentContainer>
    </FooterComp>
  </CompactThemeProvider>
);

export default memo(Footer);
