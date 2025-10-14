import type { ProjectAnnotations, Renderer } from "storybook/internal/types";

import { PARAM_KEY } from "./constants";
import { withRoundTrip } from "./withRoundTrip";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withRoundTrip],
  initialGlobals: {
    [PARAM_KEY]: false,
  },
};

export default preview;
