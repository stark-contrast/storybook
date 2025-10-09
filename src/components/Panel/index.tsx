import { RuleResult } from "@stark-contrast/rule-engine";
import React, { memo, useCallback, useState } from "react";
import {
  AddonPanel,
  Button,
  Placeholder,
  TabsState,
} from "storybook/internal/components";
import { useChannel } from "storybook/manager-api";
import { styled, useTheme } from "storybook/theming";
import { EVENTS } from "../../constants";
import { ResultItem } from "./result-item";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

export const Panel = memo(function MyPanel(props) {
  const theme = useTheme();

  const [{ violations, potentials, passed }, setState] = useState({
    violations: [],
    potentials: [],
    passed: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => {
      setState(newResults);
    },
  });

  const fetchData = useCallback(() => {
    emit(EVENTS.REQUEST);
  }, [emit]);

  return (
    <AddonPanel active={props.active}>
      <>
        <style>
          {`
            #panel-tab-content .sb-bar {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 1000;}
            `}
        </style>
        <TabsState
          initial="violations"
          backgroundColor={theme.background.hoverable}
        >
          <div
            id="violations"
            title={`${violations.length} Violations`}
            color={theme.color.negative}
          >
            {violations && violations.length > 0 ? (
              <Placeholder>
                <div>
                  {violations.map((item: RuleResult, index) => {
                    return (
                      <ResultItem type="violation" item={item} key={index} />
                    );
                  })}
                </div>
              </Placeholder>
            ) : (
              <Placeholder>
                <p>No violations found!</p>
              </Placeholder>
            )}
          </div>
          <div
            id="potentials"
            title={`${potentials.length} Potentials`}
            color={theme.color.warning}
          >
            {potentials && potentials.length > 0 ? (
              <Placeholder>
                <div>
                  {potentials.map((item: RuleResult, index) => {
                    return (
                      <ResultItem type="potential" item={item} key={index} />
                    );
                  })}
                </div>
              </Placeholder>
            ) : (
              <Placeholder>
                <p>No potential issues found</p>
              </Placeholder>
            )}
          </div>
          <div
            id="passed"
            title={`${passed.length} Passed`}
            color={theme.color.positive}
          >
            {passed && passed.length > 0 ? (
              <Placeholder>
                <div>
                  {passed.map((item: RuleResult, index) => {
                    return <ResultItem type="passed" item={item} key={index} />;
                  })}
                </div>
              </Placeholder>
            ) : (
              <Placeholder>
                <p>Nothing passed!</p>
              </Placeholder>
            )}
          </div>
        </TabsState>
      </>
    </AddonPanel>
  );
});
