import React, { Fragment, memo, useCallback, useState } from "react";
import { Result } from "src/types";
import { AddonPanel } from "storybook/internal/components";
import { Button, Placeholder, TabsState } from "storybook/internal/components";
import { useChannel } from "storybook/manager-api";
import { styled, useTheme } from "storybook/theming";

import { EVENTS } from "../../constants";
import { List } from "../List";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

export const Panel = memo(function MyPanel(props) {
  const theme = useTheme();

  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
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
    <AddonPanel active={true}>
      <>
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
                <p>The following elements have a style attribute</p>
                <List
                  items={violations.map((item, index) => ({
                    title: `item #${index}`,
                    description: JSON.stringify(item, null, 2),
                  }))}
                />
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
                <p>The following divs have less than 2 childNodes</p>
                <List
                  items={potentials.map((item, index) => ({
                    title: `item #${index}`,
                    description: JSON.stringify(item, null, 2),
                  }))}
                />
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
                <p>The following elements have a style attribute</p>
                <List
                  items={passed.map((item, index) => ({
                    title: `item #${index}`,
                    description: JSON.stringify(item, null, 2),
                  }))}
                />
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
