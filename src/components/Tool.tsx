import React, { memo, useCallback, useEffect, useState } from "react";

import { useGlobals, useStorybookApi } from "storybook/manager-api";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "storybook/internal/components";
import {
  AccessibilityIcon,
  ContrastIcon,
  LightningIcon,
} from "@storybook/icons";

import { ADDON_ID, PARAM_KEY, TOOL_ID } from "../constants";
import { Global, styled } from "storybook/internal/theming";

export const Filters: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props}>
    <defs>
      <filter id="protanopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="protanomaly">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.817, 0.183, 0, 0, 0 0.333, 0.667, 0, 0, 0 0, 0.125, 0.875, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="deuteranopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="deuteranomaly">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.8, 0.2, 0, 0, 0 0.258, 0.742, 0, 0, 0 0, 0.142, 0.858, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="tritanopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.95, 0.05,  0, 0, 0 0,  0.433, 0.567, 0, 0 0,  0.475, 0.525, 0, 0 0,  0, 0, 1, 0"
        />
      </filter>
      <filter id="tritanomaly">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.967, 0.033, 0, 0, 0 0, 0.733, 0.267, 0, 0 0, 0.183, 0.817, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="achromatopsia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
    </defs>
  </svg>
);

const iframeId = "storybook-preview-iframe";

interface Option {
  name: string;
  percentage?: number;
}

export const baseList = [
  { name: "deuteranopia", percentage: 0.56 },
  { name: "protanopia", percentage: 0.59 },
  { name: "tritanopia", percentage: 0.016 },
  { name: "achromatopsia", percentage: 0.0001 },
  { name: "blurred", percentage: 0.0001 },
  { name: "ghosting", percentage: 0.0001 },
  { name: "yellowing", percentage: 0.0001 },
  { name: "loss of contrast", percentage: 0.0001 },
  { name: "bright light", percentage: 0.0001 },
] as Option[];

type Filter = Option | null;

const getFilter = (filterName: string) => {
  if (!filterName) {
    return "none";
  }
  if (filterName === "blurred vision") {
    return "blur(2px)";
  }
  if (filterName === "grayscale") {
    return "grayscale(100%)";
  }
  return `url('#${filterName}')`;
};

const Hidden = styled.div({
  "&, & svg": {
    position: "absolute",
    width: 0,
    height: 0,
  },
});

const ColorIcon = styled.span<{ filter: string }>(
  {
    background:
      "linear-gradient(to right, #F44336, #FF9800, #FFEB3B, #8BC34A, #2196F3, #9C27B0)",
    borderRadius: "1rem",
    display: "block",
    height: "1rem",
    width: "1rem",
  },
  ({ filter }) => ({
    filter: getFilter(filter),
  }),
  ({ theme }) => ({
    boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`,
  }),
);

export interface Link {
  id: string;
  title: ReactNode;
  right?: ReactNode;
  active: boolean;
  onClick: () => void;
}

const Column = styled.span({
  display: "flex",
  flexDirection: "column",
});

const Title = styled.span({
  textTransform: "capitalize",
});

const Description = styled.span(({ theme }) => ({
  fontSize: 11,
  color: theme.textMutedColor,
}));

const getColorList = (active: Filter, set: (i: Filter) => void): Link[] => [
  ...(active !== null
    ? [
        {
          id: "reset",
          title: "Reset color filter",
          onClick: () => {
            set(null);
          },
          right: undefined,
          active: false,
        },
      ]
    : []),
  ...baseList.map((i) => {
    const description =
      i.percentage !== undefined ? `${i.percentage}% of users` : undefined;
    return {
      id: i.name,
      title: (
        <Column>
          <Title>{i.name}</Title>
          {description && <Description>{description}</Description>}
        </Column>
      ),
      onClick: () => {
        set(i);
      },
      right: <ColorIcon filter={i.name} />,
      active: active === i,
    };
  }),
];

export const Tool = memo(function MyAddonSelector() {
  const [filter, setFilter] = useState(null);
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();

  const isActive = [true, "true"].includes(globals[PARAM_KEY]);

  const toggleMyTool = useCallback(() => {
    updateGlobals({
      [PARAM_KEY]: !isActive,
    });
  }, [isActive]);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: "Toggle Addon [8]",
      defaultShortcut: ["8"],
      actionName: "myaddon",
      showInMenu: false,
      action: toggleMyTool,
    });
  }, [toggleMyTool, api]);

  return (
    <>
      {filter && (
        <Global
          styles={{
            [`#${iframeId}`]: {
              filter: getFilter(filter.name),
            },
          }}
        />
      )}
      <WithTooltip
        placement="top"
        tooltip={({ onHide }) => {
          const colorList = getColorList(filter, (i) => {
            setFilter(i);
            onHide();
          });
          return <TooltipLinkList links={colorList} />;
        }}
        closeOnOutsideClick
        onDoubleClick={() => setFilter(null)}
      >
        <IconButton
          key="filter"
          active={!!filter}
          title="Stark Vision simulator"
        >
          <AccessibilityIcon />
        </IconButton>
      </WithTooltip>
    </>
  );
});
