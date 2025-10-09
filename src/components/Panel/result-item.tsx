import { getWcagExplainedInfo } from "@stark-contrast/rule-engine";
import React from "react";
import { useTheme } from "storybook/internal/theming";

export const ResultItem: React.FC<{ type: string; item: any }> = ({
  type,
  item,
}) => {
  const theme = useTheme();

  const linkInfo = getWcagExplainedInfo(
    item.info?.rulesets[0].referenceNumber[0],
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        {type === "violation" && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.3335 8C1.3335 4.3181 4.31826 1.33333 8.00016 1.33333C11.6821 1.33333 14.6668 4.3181 14.6668 8C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8ZM6.47157 5.52859C6.21122 5.26824 5.78911 5.26824 5.52876 5.52859C5.26841 5.78894 5.26841 6.21105 5.52876 6.4714L7.05735 8L5.52876 9.52859C5.26841 9.78894 5.26841 10.2111 5.52876 10.4714C5.78911 10.7317 6.21122 10.7317 6.47157 10.4714L8.00016 8.9428L9.52876 10.4714C9.78911 10.7317 10.2112 10.7317 10.4716 10.4714C10.7319 10.2111 10.7319 9.78894 10.4716 9.52859L8.94297 8L10.4716 6.4714C10.7319 6.21105 10.7319 5.78894 10.4716 5.52859C10.2112 5.26824 9.78911 5.26824 9.52876 5.52859L8.00016 7.05719L6.47157 5.52859Z"
              fill="#ba1c1c"
            ></path>
          </svg>
        )}
        {type === "potential" && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M9.14972 2.63909C8.63419 1.76268 7.36677 1.76268 6.85123 2.63909L1.35017 11.9909C0.827324 12.8797 1.4682 14.0002 2.49942 14.0002H13.5015C14.5328 14.0002 15.1736 12.8797 14.6508 11.9909L9.14972 2.63909Z"
              fill="#fedb63"
            ></path>
            <path
              d="M7.2822 2.8926C7.60441 2.34484 8.39654 2.34484 8.71875 2.8926L14.2198 12.2444C14.5466 12.7999 14.146 13.5002 13.5015 13.5002H2.49942C1.85491 13.5002 1.45436 12.7999 1.78114 12.2444L7.2822 2.8926Z"
              stroke="#757575"
            ></path>
            <circle
              cx="8"
              cy="11.25"
              r="0.75"
              fill="black"
              fillOpacity="0.7"
            ></circle>
            <rect
              x="7.25"
              y="6"
              width="1.5"
              height="4"
              rx="0.75"
              fill="#757575"
            ></rect>
          </svg>
        )}
        {type === "passed" && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Passed</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00016 1.33333C4.31826 1.33333 1.3335 4.3181 1.3335 8C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8C14.6668 4.3181 11.6821 1.33333 8.00016 1.33333ZM10.5161 6.75551C10.7493 6.47055 10.7073 6.05053 10.4223 5.81738C10.1374 5.58423 9.71734 5.62623 9.48419 5.91119L6.95067 9.00772L6.13823 8.19528C5.87788 7.93493 5.45577 7.93493 5.19543 8.19528C4.93508 8.45563 4.93508 8.87774 5.19543 9.13809L6.52876 10.4714C6.66194 10.6046 6.84525 10.6752 7.03337 10.6659C7.22149 10.6565 7.39686 10.568 7.51613 10.4222L10.5161 6.75551Z"
              fill="#28691b"
            ></path>
          </svg>
        )}

        <h3
          style={{
            fontSize: 14,
            fontWeight: 700,
            textAlign: "left",
          }}
        >
          {item?.message}
        </h3>
      </div>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,.04)",
          color: theme.color.defaultText,
          marginBottom: 4,
          padding: 8,
          fontSize: 12,
          borderRadius: 4,
          maxHeight: 128,
          marginLeft: 24,
          maxWidth: 900,
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily:
              "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
            fontSize: 12,
            lineHeight: "16px",
            lineClamp: 3,
            boxOrient: "vertical",
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: 32,
            textAlign: "left",
            padding: 4,
            fontWeight: 400,
            wordBreak: "break-all",
            whiteSpace: "nowrap",
          }}
        >
          {item?.element?.innerText ||
            item?.element?.outerHTML ||
            item?.elementSnippet ||
            item?.xpath}
        </pre>
      </div>
      <div
        style={{
          marginLeft: 24,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ marginRight: 4 }}
        >
          <title>Link</title>
          <path
            d="M6.5 4C6.77614 4 7 4.22386 7 4.5C7 4.77614 6.77614 5 6.5 5H5C3.34315 5 2 6.34315 2 8C2 9.65685 3.34315 11 5 11H6.5C6.77614 11 7 11.2239 7 11.5C7 11.7761 6.77614 12 6.5 12H5C2.79086 12 1 10.2091 1 8C1 5.79086 2.79086 4 5 4H6.5Z"
            fill="currentColor"
          ></path>
          <path
            d="M9 4.5C9 4.77614 9.22386 5 9.5 5H11C12.6569 5 14 6.34315 14 8C14 9.65685 12.6569 11 11 11H9.5C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12H11C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4H9.5C9.22386 4 9 4.22386 9 4.5Z"
            fill="currentColor"
          ></path>
          <path
            d="M6 7.5C5.72386 7.5 5.5 7.72386 5.5 8C5.5 8.27614 5.72386 8.5 6 8.5H10C10.2761 8.5 10.5 8.27614 10.5 8C10.5 7.72386 10.2761 7.5 10 7.5H6Z"
            fill="currentColor"
          ></path>
        </svg>
        <div
          style={{
            fontSize: 12,
            textAlign: "left",
            fontWeight: 500,
          }}
        >
          <a
            href={linkInfo.link}
            target="_blank"
            style={{
              color: theme.color.darkest,
              textDecoration: "none",
            }}
            aria-label={`${linkInfo.text} help`}
            onMouseOver={(e: React.MouseEvent) => {
              (e.target as HTMLElement).style.textDecoration = "underline";
            }}
            onMouseOut={(e: React.MouseEvent) => {
              (e.target as HTMLElement).style.textDecoration = "none";
            }}
          >{`${linkInfo.id} ${linkInfo.text}`}</a>
        </div>
      </div>
    </div>
  );
};
