import { List, themeSpacing } from "@datapunt/asc-ui";
import styled, { css } from "styled-components";

type Props = {
  noPadding?: boolean;
};

export default styled(List)<Props>`
  -webkit-print-color-adjust: exact;

  ${({ noPadding }) =>
    // By default we add a padding to make it look better,
    // but in same rare cases we don't need a padding, eg: Footer
    !noPadding &&
    css`
      padding-left: ${themeSpacing(5)};
    `}
`;
