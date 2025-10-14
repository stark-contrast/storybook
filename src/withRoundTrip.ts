import { useEffect, useChannel } from "storybook/preview-api";
import type { DecoratorFunction } from "storybook/internal/types";
import { EVENTS } from "./constants";
import { RuleResult, scanPage } from "@stark-contrast/rule-engine";

const check = () => {
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
  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, check());
    },
  });
  useEffect(() => {
    emit(EVENTS.RESULT, check());
  });

  return storyFn();
};
