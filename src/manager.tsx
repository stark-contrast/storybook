import React from "react";
import { addons, types } from "storybook/manager-api";
import { ADDON_ID, PANEL_ID, TOOL_ID } from "./constants";
import { Tool } from "./components/Tool";
import { Panel } from "./components/Panel";

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Stark",
    match: ({ tabId, viewMode }) => !tabId && viewMode === "story",
    render: Tool,
  });

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Stark",
    match: ({ viewMode }) => viewMode === "story",
    // @ts-ignore
    render: ({ active }) => <Panel active={active} />,
  });
});
