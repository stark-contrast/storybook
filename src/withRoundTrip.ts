import { Result } from "src/types";
import { useEffect, useChannel } from "storybook/preview-api";
import type { DecoratorFunction } from "storybook/internal/types";

import { EVENTS } from "./constants";
import { RuleResult, scanPage } from "@stark-contrast/rule-engine";

/**
 * This is an example of a function that performs some sort of analysis on the
 * canvas. In this example, it returns the bounding rectangles for elements that
 * - have a style attribute
 * - are divs with fewer than 2 childNodes
 */
const check = (canvas: ParentNode = globalThis.document) => {
  const results = scanPage(globalThis.document, { snippetLength: 1000 });
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
  const canvasElement = context.canvasElement as ParentNode;
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
