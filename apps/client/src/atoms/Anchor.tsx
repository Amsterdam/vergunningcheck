import styled from "styled-components";

/**
 * The problem with Link from asc-ui is that it adds padding-right
 * (with DefaultLinkStyleCSS), or it overrides the color (InlineLinkStyleCSS)
 * or it does not provide text-decoration (BlankLinkStyleCSS).
 *
 * What we want is a link that's underlined, when hovered.
 * In addition we need a bold font with the same color as the parent.
 */
export default styled.a`
  color: inherit;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;
