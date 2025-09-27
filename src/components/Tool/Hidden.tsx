import { styled } from "storybook/internal/theming";

const Hidden = styled.div({
  "&, & svg": {
    position: "absolute",
    width: 0,
    height: 0,
  },
});

export default Hidden;
