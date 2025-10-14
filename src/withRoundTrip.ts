import { useEffect, useChannel } from "storybook/preview-api";
import type { DecoratorFunction } from "storybook/internal/types";

import { EVENTS } from "./constants";
import { RuleResult, scanPage } from "@stark-contrast/rule-engine";

const check = (canvas = globalThis.document) => {
  const results = scanPage(canvas, { snippetLength: 1000 });
  const violations = results.filter((r: RuleResult) => r?.result === "FAIL");
  const potentials = results.filter(
    (r: RuleResult) => r?.result === "INDETERMINATE",
  );
  const passed = results.filter((r: RuleResult) => r?.result === "PASS");
  return {
    violations: violations,
    potentials: potentials,
    passed: passed,
  };
};

export const withRoundTrip: DecoratorFunction = (storyFn, context) => {
  const canvasElement = context.canvasElement;
  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, check(canvasElement));
    },
  });
  useEffect(() => {
    emit(EVENTS.RESULT, check(canvasElement));
  });

  return storyFn();
};
