import { themeColor } from "@datapunt/asc-ui";
import styled, { css } from "styled-components";

import { printOnly } from "../utils/themeUtils";
import { avoidPageBreak } from "../utils/themeUtils";

type PrintOnlyProps = {
  withBorder: boolean;
  avoidPageBreak: boolean;
};

export default styled.div<PrintOnlyProps>`
  ${printOnly}

  ${(props) =>
    props.withBorder &&
    css`
      @media print {
        border: 1px solid ${themeColor("tint", "level4")};
      }
    `}

  ${(props) =>
    props.avoidPageBreak &&
    css`
      ${avoidPageBreak}
    `}
`;
