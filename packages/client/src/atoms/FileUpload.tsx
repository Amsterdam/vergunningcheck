import { Download } from "@amsterdam/asc-assets";
import { Icon, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import React, { FunctionComponent, HTMLAttributes } from "react";
import styled from "styled-components";

import Link from "../components/Link";
import { TEXT_TO_EDIT_BUTTON } from "../utils/test-ids";

const Wrapper = styled.div`
  position: relative;
  background-color: ${themeColor("tint", "level1")};
  text-align: center;

  /* input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
  } */
`;

const Inner = styled.div`
  padding: ${themeSpacing(5)};
  text-align: center;
`;

const FileUpload: FunctionComponent<HTMLAttributes<HTMLElement>> = () => (
  <Wrapper data-testid={TEXT_TO_EDIT_BUTTON}>
    {/* <input type="file" className="upload" /> */}
    <Inner>
      Sleep de bestanden in dit vlak of{" "}
      <Link eventName="" variant="inline">
        selecteer bestanden
      </Link>
      &nbsp; &nbsp;
      <Icon color="#004699" inline size={14}>
        <Download />
      </Icon>
    </Inner>
  </Wrapper>
);

export default FileUpload;
