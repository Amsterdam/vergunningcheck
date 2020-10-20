import { List, breakpoint, themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

type Props = {
  compactThemeSpacing?: boolean;
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

  ${({ compactThemeSpacing }) =>
    // Without the `<CompactThemeSpacing />` the default font-size is 18px on larger screens
    // with the `compactThemeSpacing` prop you can make the fonts equal, eg: Alert
    compactThemeSpacing &&
    css`
      @media ${breakpoint("min-width", "tabletS")} {
        li {
          font-size: 16px;
          line-height: 20px;
        }
      }
    `}
`;
