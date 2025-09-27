import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useGlobals, useStorybookApi } from "storybook/manager-api";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "storybook/internal/components";
import { ADDON_ID, PARAM_KEY } from "../../constants";
import { Global } from "storybook/internal/theming";
import { Filters } from "./Filters";
import Hidden from "./Hidden";

const iframeId = "storybook-preview-iframe";

interface Option {
  name: string;
  percentage?: number;
}

export interface Link {
  id: string;
  title: ReactNode;
  right?: ReactNode;
  active: boolean;
  onClick: () => void;
}

type Filter = Option | null;

export const baseList = [
  { name: "deuteranopia" },
  { name: "protanopia" },
  { name: "tritanopia" },
  { name: "achromatopsia" },
  { name: "blurred" },
  { name: "ghosting" },
  { name: "yellowing" },
  { name: "loss of contrast" },
  { name: "bright light" },
] as Option[];

const getFilter = (filterName: string) => {
  if (!filterName) {
    return "none";
  }
  if (filterName === "loss of contrast") {
    return "contrast(50%)";
  }
  if (filterName === "bright light") {
    return "contrast(75%) brightness(200%)";
  }
  return `url('#${filterName}')`;
};

const getColorList = (active: Filter, set: (i: Filter) => void): Link[] => [
  ...(active !== null
    ? [
        {
          id: "reset",
          title: "Reset vision simulator",
          onClick: () => {
            set(null);
          },
          right: undefined,
          active: false,
        },
      ]
    : []),
  ...baseList.map((i) => {
    return {
      id: i.name,
      title: (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            {getFilterIcon(i.name)}
            <span style={{ textTransform: "capitalize" }}>{i.name}</span>
          </div>
        </>
      ),
      onClick: () => {
        set(i);
      },
      active: active === i,
    };
  }),
];

const getFilterIcon = (filterName: string) => {
  if (filterName === "deuteranopia") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10.5" cy="10.5" r="3.5" fill="#B4BD00" />
        <circle cx="21.5" cy="10.5" r="3.5" fill="#FFF500" />
        <circle cx="10.5" cy="21.5" r="3.5" fill="#85787A" />
        <circle cx="21.5" cy="21.5" r="3.5" fill="#221CDB" />
      </svg>
    );
  } else if (filterName === "protanopia") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10.5" cy="10.5" r="3.5" fill="#ADAB00" />
        <circle cx="21.5" cy="10.5" r="3.5" fill="#FFF500" />
        <circle cx="10.5" cy="21.5" r="3.5" fill="#8F906E" />
        <circle cx="21.5" cy="21.5" r="3.5" fill="#381fd1" />
      </svg>
    );
  } else if (filterName === "tritanopia") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10.5" cy="10.5" r="3.5" fill="#D90000" />
        <circle cx="21.5" cy="10.5" r="3.5" fill="#FFA9B0" />
        <circle cx="10.5" cy="21.5" r="3.5" fill="#329095" />
        <circle cx="21.5" cy="21.5" r="3.5" fill="#00C9C2" />
      </svg>
    );
  } else if (filterName === "achromatopsia") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10.5" cy="10.5" r="3.5" fill="#818181" />
        <circle cx="21.5" cy="10.5" r="3.5" fill="#ECECEC" />
        <circle cx="10.5" cy="21.5" r="3.5" fill="#A4A4A4" />
        <circle cx="21.5" cy="21.5" r="3.5" fill="#686868" />
      </svg>
    );
  } else if (filterName === "blurred") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_286_376)">
          <circle cx="17" cy="17" r="11" fill="#381fd1" />
        </g>
        <g filter="url(#filter1_f_286_376)">
          <circle cx="17" cy="17" r="8.8" fill="#381fd1" />
        </g>
        <defs>
          <filter
            id="filter0_f_286_376"
            x="0"
            y="0"
            width="20"
            height="20"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="3"
              result="effect1_foregroundBlur_286_376"
            />
          </filter>
          <filter
            id="filter1_f_286_376"
            x="6.19995"
            y="6.19995"
            width="21.6"
            height="21.6"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="1"
              result="effect1_foregroundBlur_286_376"
            />
          </filter>
        </defs>
      </svg>
    );
  } else if (filterName === "ghosting") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="6" width="17.5" height="17.4997" fill="#AFA5EC" />
        <rect
          x="8.5"
          y="8.50049"
          width="17.5"
          height="17.4997"
          fill="#381fd1"
        />
      </svg>
    );
  } else if (filterName === "yellowing") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_286_384"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="22"
          height="22"
        >
          <rect
            x="5"
            y="16"
            width="15.5564"
            height="15.5564"
            transform="rotate(-45 5 16)"
            fill="#0014CC"
          />
        </mask>
        <g mask="url(#mask0_286_384)">
          <rect
            x="16"
            y="4.76465"
            width="12.0994"
            height="22.4703"
            fill="#999B52"
          />
          <rect
            width="12.0994"
            height="22.4703"
            transform="matrix(-1 0 0 1 16 4.76465)"
            fill="#381fd1"
          />
        </g>
      </svg>
    );
  } else if (filterName === "loss of contrast") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 6C13.3478 6 10.8043 7.05357 8.92893 8.92893C7.05357 10.8043 6 13.3478 6 16C6 18.6522 7.05357 21.1957 8.92893 23.0711C10.8043 24.9464 13.3478 26 16 26L16 16V6Z"
          fill="#381fd1"
        />
        <path
          d="M16 6C18.6522 6 21.1957 7.05357 23.0711 8.92893C24.9464 10.8043 26 13.3478 26 16C26 18.6522 24.9464 21.1957 23.0711 23.0711C21.1957 24.9464 18.6522 26 16 26L16 16V6Z"
          fill="#AFA5EC"
        />
      </svg>
    );
  } else if (filterName === "bright light") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 3L17.086 7.75118L19.3646 3.44296L19.1839 8.31332L22.5 4.74167L21.0649 9.3993L25.1924 6.80761L22.6007 10.9351L27.2583 9.5L23.6867 12.8161L28.557 12.6354L24.2488 14.914L29 16L24.2488 17.086L28.557 19.3646L23.6867 19.1839L27.2583 22.5L22.6007 21.0649L25.1924 25.1924L21.0649 22.6007L22.5 27.2583L19.1839 23.6867L19.3646 28.557L17.086 24.2488L16 29L14.914 24.2488L12.6354 28.557L12.8161 23.6867L9.5 27.2583L10.9351 22.6007L6.80761 25.1924L9.3993 21.0649L4.74167 22.5L8.31332 19.1839L3.44296 19.3646L7.75118 17.086L3 16L7.75118 14.914L3.44296 12.6354L8.31332 12.8161L4.74167 9.5L9.3993 10.9351L6.80761 6.80761L10.9351 9.3993L9.5 4.74167L12.8161 8.31332L12.6354 3.44296L14.914 7.75118L16 3Z"
          fill="#381fd1"
        />
      </svg>
    );
  }
  return null;
};

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
      label: "Toggle Stark [8]",
      defaultShortcut: ["8"],
      actionName: "stark.vision.simulator",
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
              // @ts-ignore
              filter: getFilter(filter.name),
            },
          }}
        />
      )}
      <WithTooltip
        placement="top"
        tooltip={({ onHide }) => {
          const colorList = getColorList(filter, (i) => {
            // @ts-ignore
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 250 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ borderRadius: "100%" }}
          >
            <path
              d="M0 0H250V250H0V0Z"
              fill="rgb(115, 130, 140)"
              className="stark-logo-bg"
            ></path>
            <style>
              {`
              .stark-logo-bg {
                transition: fill 0.2s ease;
              }
              button:hover .stark-logo-bg {
                fill: #381fd1;
              }
              `}
            </style>
            <path
              d="M120.601 201.202V178.293C136.28 179.657 151.758 174.011 162.875 162.872C180.585 145.161 183.585 117.515 170.087 96.4185L79.9909 186.506C76.915 184.234 74.0132 181.734 71.3097 179.029C41.5634 149.286 41.5634 101.06 71.3097 71.314C86.7053 55.8855 107.986 47.8107 129.742 49.1421V72.0504C114.063 70.6862 98.585 76.3325 87.4682 87.4713C69.7586 105.182 66.7584 132.828 80.2565 153.925L170.353 63.8387C173.429 66.1113 176.331 68.6105 179.034 71.3155C208.78 101.059 208.78 149.285 179.034 179.031C163.638 194.459 142.357 202.533 120.601 201.202Z"
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </IconButton>
      </WithTooltip>
      <Hidden>
        <Filters />
      </Hidden>
    </>
  );
});
