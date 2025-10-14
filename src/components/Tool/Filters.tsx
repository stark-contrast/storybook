import React from "react";

export const Filters: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props}>
    <defs>
      <filter id="protanopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.152, 1.053, -0.205, 0.0, 0.0, 0.115, 0.786, 0.099, 0.0, 0.0, -0.004,
        -0.048, 1.052, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0"
        />
      </filter>
      <filter id="deuteranopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.367, 0.861, -0.228, 0.0, 0.0, 0.28, 0.673, 0.047, 0.0, 0.0, -0.012,
        0.043, 0.969, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0"
        />
      </filter>
      <filter id="tritanopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1.256, -0.077, -0.179, 0.0, 0.0, -0.078, 0.931, 0.148, 0.0, 0.0, 0.005,
        0.691, 0.304, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0"
        />
      </filter>
      <filter id="achromatopsia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.213, 0.715, 0.072, 0.0, 0.0, 0.213, 0.715, 0.072, 0.0, 0.0, 0.213,
        0.715, 0.072, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0"
        />
      </filter>
      <filter id="blurred">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.25"></feGaussianBlur>
      </filter>
      <filter id="ghosting">
        <feOffset in="SourceGraphic" result="OFFSET" dx="8" dy="8" />
        <feComponentTransfer in="SourceGraphic" result="OPACITY">
          <feFuncA type="linear" slope="0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="OFFSET" />
          <feMergeNode in="OPACITY" />
        </feMerge>
      </filter>
      <filter id="yellowing">
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0
              -0.2 1.0 0.3 0.1 0
              -0.1 0 1 0 0
              0 0 0 1 0 "
        />
      </filter>
    </defs>
  </svg>
);
