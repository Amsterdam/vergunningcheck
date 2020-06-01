import styled, { css } from "styled-components";
import { themeColor } from "@datapunt/asc-ui";
import { printOnly } from "../utils/themeUtils";
import { avoidPageBreak } from "../utils/themeUtils";

export default styled.div`
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
