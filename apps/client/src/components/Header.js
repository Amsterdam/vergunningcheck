import React, { useContext } from "react";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoWrapper,
  StyledLogo,
} from "./HeaderStyles";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { actions, categories } from "../utils/MatamoConfig";
import Context from "../context";

export const Header = () => {
  const { trackEvent } = useMatomo();
  const { topic } = useContext(Context);

  const onClick = (href) => {
    if (href !== "/") {
      trackEvent({
        category: categories["navigate"],
        action: `${actions["clickExternalLink"]} - ${topic.slug || "home"}`,
        name: "Logo - Header",
      });
    }
    window.location.href = href;
  };

  return (
    <StyledHeader
      tall
      css={StyledHeaderWrapper}
      logo={() => (
        <StyledLogoWrapper
          onClick={() =>
            onClick(
              process.env.NODE_ENV === "production"
                ? "https://amsterdam.nl"
                : "/"
            )
          }
          tabIndex={4}
        >
          <StyledLogo />
        </StyledLogoWrapper>
      )}
    />
  );
};

export default Header;
