import {
  Button,
  Checkbox,
  Heading,
  Label,
  Radio,
  RadioGroup,
} from "@datapunt/asc-ui";
import React from "react";

import { ComponentWrapper } from "../atoms";
import { topics } from "../config";
import { actions, eventNames } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import Modal from "./Modal";

type Props = {
  matomoTrackEvent: Function;
};

const ConclusionModal: React.FC<Props> = ({ matomoTrackEvent }) => {
  const handleModalButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: eventNames.START_NEW_CHECK,
    });
  };

  return (
    <Modal
      buttonText="Nog een vergunningcheck doen"
      heading="Kies een vergunningcheck"
      onClick={handleModalButton}
    >
      <ComponentWrapper>
        <Heading forwardedAs="h2">
          Wilt u dezelfde adresgegevens gebruiken? [tekst updaten]
        </Heading>
        <Label htmlFor="ja" label="ja">
          <Checkbox
            // value="value"
            id="ja"
            // onChange={(e) => onChange(e)}
          />
        </Label>
      </ComponentWrapper>

      <ComponentWrapper>
        <Heading forwardedAs="h2">
          Welke check wilt u doen? [tekst updaten]
        </Heading>

        <ComponentWrapper>
          <RadioGroup name="checks">
            {topics
              .filter((topic) => topic.sttrFile)
              .map((topic) => (
                <Label htmlFor={topic.name} label={topic.name} key={topic.name}>
                  <Radio
                    value={topic.slug}
                    id={topic.name}
                    // onChange={(e) => onChange(e)}
                  />
                </Label>
              ))}
          </RadioGroup>
        </ComponentWrapper>

        <Button variant="secondary">Gaaan [tekst updaten]</Button>
      </ComponentWrapper>
    </Modal>
  );
};

export default withTracking(ConclusionModal);
