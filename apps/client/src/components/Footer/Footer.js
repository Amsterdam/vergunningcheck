import {
  Column,
  CompactThemeProvider,
  FooterBottom,
  FooterBottomLinkList,
  FooterBottomLinkListItem,
  Footer as FooterComp,
  FooterContent,
  FooterHeading,
  FooterLinkList,
  FooterLinkListItem,
  FooterToggle,
  FooterTop,
  Paragraph,
  Row,
} from "@datapunt/asc-ui";
import React from "react";

import { FOOTER } from "../../utils/test-ids";
import Link from "../Link";
import { ContentContainer } from "./FooterStyles";

const eventNameSuffix = "- Footer";

const FirstColumn = () => (
  <FooterLinkList>
    <CompactThemeProvider>
      <Paragraph gutterBottom={12}>
        Hebt u een vraag en kunt u het antwoord niet vinden op deze website?
        Neem dan contact met ons op.
      </Paragraph>
      <Paragraph strong gutterBottom={0}>
        Bel het telefoonnummer{" "}
        <Link
          href="tel:14020"
          variant="blank"
          eventName={`Telefoonnummer ${eventNameSuffix}`}
          strong
        >
          14 020
        </Link>
      </Paragraph>
      <Paragraph gutterBottom={8}>
        maandag tot en met vrijdag van 08.00 tot 18.00 uur.
      </Paragraph>
      <FooterLinkListItem>
        <Link
          href="https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx"
          variant="with-chevron"
          eventName={`Contact formulier ${eventNameSuffix}`}
        >
          Contactformulier
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link
          href="https://www.amsterdam.nl/contact/"
          variant="with-chevron"
          eventName={`Contactgegevens en openingstijden ${eventNameSuffix}`}
        >
          Contactgegevens en openingstijden
        </Link>
      </FooterLinkListItem>
    </CompactThemeProvider>
  </FooterLinkList>
);

const SecondColumn = () => (
  <FooterLinkList>
    <CompactThemeProvider>
      <FooterLinkListItem>
        <Link
          href="https://www.amsterdam.nl/nieuwsbrieven/nieuws/nieuwsbrief/nieuwsbrief/"
          variant="with-chevron"
          eventName={`Nieuwsbrief ${eventNameSuffix}`}
        >
          Nieuwsbrief Amsterdam.nl
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link
          href="https://twitter.com/AmsterdamNL"
          variant="with-chevron"
          eventName={`Twitter ${eventNameSuffix}`}
        >
          Twitter
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link
          href="https://www.facebook.com/gemeenteamsterdam"
          variant="with-chevron"
          eventName={`Facebook ${eventNameSuffix}`}
        >
          Facebook
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link
          href="https://www.instagram.com/gemeenteamsterdam/"
          variant="with-chevron"
          eventName={`Instagram ${eventNameSuffix}`}
        >
          Instagram
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link
          href="https://www.linkedin.com/company/gemeente-amsterdam"
          variant="with-chevron"
          eventName={`Linkedin ${eventNameSuffix}`}
        >
          Linkedin
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link
          href="https://www.amsterdam.nl/bestuur-organisatie/werkenbij/"
          variant="with-chevron"
          eventName={`Werken bij ${eventNameSuffix}`}
        >
          Werken bij
        </Link>
      </FooterLinkListItem>
    </CompactThemeProvider>
  </FooterLinkList>
);

const ThirdColumn = () => (
  <>
    <FooterLinkList>
      <CompactThemeProvider>
        <Paragraph>
          Wat is er te doen in Amsterdam? Informatie over toerisme, cultuur,
          uitgaan, evenementen en meer vindt u op{" "}
          <Link
            href="http://www.iamsterdam.com/"
            eventName={`iamsterdam.com ${eventNameSuffix}`}
            variant="blank"
            strong
          >
            Iamsterdam.com
          </Link>
        </Paragraph>
      </CompactThemeProvider>
    </FooterLinkList>
  </>
);

const Footer = () => (
  <FooterComp data-testid={FOOTER}>
    <FooterTop>
      <ContentContainer>
        <Row>
          <Column
            wrap
            span={{ small: 1, medium: 2, big: 2, large: 5, xLarge: 5 }}
          >
            <>
              <FooterToggle title="Contact" hideAt="tabletM">
                <FooterContent indent>
                  <FirstColumn />
                </FooterContent>
              </FooterToggle>
              <FooterContent showAt="tabletM">
                <FooterHeading forwardedAs="h3">Contact</FooterHeading>
                <FirstColumn />
              </FooterContent>
            </>
          </Column>
          <Column
            wrap
            span={{ small: 1, medium: 2, big: 2, large: 3, xLarge: 3 }}
          >
            <>
              <FooterToggle title="Volg de gemeente" hideAt="tabletM">
                <FooterContent indent>
                  <SecondColumn />
                </FooterContent>
              </FooterToggle>
              <FooterContent showAt="tabletM">
                <FooterHeading forwardedAs="h3">Volg de gemeente</FooterHeading>
                <SecondColumn />
              </FooterContent>
            </>
          </Column>
          <Column
            wrap
            span={{ small: 1, medium: 2, big: 2, large: 4, xLarge: 4 }}
          >
            <>
              <FooterToggle title="Uit in Amsterdam" hideAt="tabletM">
                <FooterContent indent>
                  <ThirdColumn />
                </FooterContent>
              </FooterToggle>
              <FooterContent showAt="tabletM">
                <FooterHeading forwardedAs="h3" styleAs="h3">
                  Uit in Amsterdam
                </FooterHeading>
                <ThirdColumn />
              </FooterContent>
            </>
          </Column>
        </Row>
      </ContentContainer>
    </FooterTop>
    <FooterBottom>
      <ContentContainer>
        <Row>
          <Column
            wrap
            span={{ small: 1, medium: 2, big: 6, large: 10, xLarge: 10 }}
          >
            <FooterBottomLinkList>
              <FooterBottomLinkListItem>
                <Link
                  href="https://www.amsterdam.nl/overdezesite/"
                  variant="with-chevron"
                  eventName={`Over deze site ${eventNameSuffix}`}
                >
                  Over deze site
                </Link>
              </FooterBottomLinkListItem>
              <FooterBottomLinkListItem>
                <Link
                  href="https://www.amsterdam.nl/privacy/"
                  variant="with-chevron"
                  eventName={`Privacy ${eventNameSuffix}`}
                >
                  Privacy
                </Link>
              </FooterBottomLinkListItem>
              <FooterBottomLinkListItem>
                <Link
                  href="https://www.amsterdam.nl/privacy/cookies-site/"
                  variant="with-chevron"
                  eventName={`Cookies ${eventNameSuffix}`}
                >
                  Cookies op deze site
                </Link>
              </FooterBottomLinkListItem>
              <FooterBottomLinkListItem>
                <Link
                  href="https://www.amsterdam.nl/nieuwsarchief/"
                  variant="with-chevron"
                  eventName={`Webarchief ${eventNameSuffix}`}
                >
                  Webarchief
                </Link>
              </FooterBottomLinkListItem>
            </FooterBottomLinkList>
          </Column>
        </Row>
      </ContentContainer>
    </FooterBottom>
  </FooterComp>
);

export default Footer;
