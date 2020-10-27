import { ChevronRight } from "@amsterdam/asc-assets";
import { Icon, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import React, { Fragment, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

import { AUTOSUGGEST_ITEM, AUTOSUGGEST_LIST } from "../utils/test-ids";

const StyledList = styled.ul`
  max-width: 160px;
  margin: 0;
  padding: 0;
  border: 1px solid ${themeColor("tint", "level5")};
  border-top: 0;
  background-color: white;
`;

const Li = styled.li`
  line-height: ${themeSpacing(5)};
  padding: ${themeSpacing(2)};
  cursor: pointer;
  display: flex;

  &:hover,
  &:focus {
    background-color: ${themeColor("tint", "level3")};
  }
`;

const Chevron = styled(ChevronRight)`
  display: inline-block;
`;

const StyledIcon = styled(Icon)`
  margin: 0 ${themeSpacing(2)} 0 0;
  display: inline-block;
`;

const SuggestList: React.FC<{
  activeIndex: number;
  className?: string;
  onSelectOption: Function;
  options: [{ id: number; value: string }];
  role: string;
}> = ({ activeIndex, className, onSelectOption, options, role }) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;

    if (activeIndex >= 0 && activeIndex < options.length && list) {
      (list.children[activeIndex] as HTMLElement).focus();
    }
  }, [activeIndex, options.length]);

  const onSelect = useCallback(
    (option) => {
      onSelectOption(option);
    },
    [onSelectOption]
  );

  const handleKeyDown = useCallback(
    (event, option) => {
      event.preventDefault();

      // preventing the page from scrolling when cycling through the list of options
      switch (event.key) {
        case "ArrowUp":
        case "Up":
        case "ArrowDown":
        case "Down":
          break;

        case "Enter":
          onSelect(option);
          break;

        default:
          break;
      }
    },
    [onSelect]
  );

  if (!options.length) {
    return null;
  }

  return (
    <StyledList
      className={className}
      data-testid={AUTOSUGGEST_LIST}
      role={role}
      ref={listRef}
    >
      {options.map((option) => (
        <Li
          data-id={option.id}
          data-testid={AUTOSUGGEST_ITEM}
          key={option.id}
          onMouseDown={() => onSelect(option)} // Use instead of onClick to prevent a bug with the focus state
          onKeyDown={(event) => handleKeyDown(event, option)}
          role="option"
          tabIndex={-1}
        >
          <Fragment>
            <StyledIcon size={12}>
              <Chevron />
            </StyledIcon>
            {option.value}
          </Fragment>
        </Li>
      ))}
    </StyledList>
  );
};

export default SuggestList;
