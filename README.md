<div align="center">
  <picture style="display: flex; flex-direction: column; align-items: center;">
    <img src="./static/logo.png"
      alt="Stark logomark"
      loading="lazy"
      decoding="async"
      height="106"
    />
  </picture>

  <h1>Storybook Addon - Stark (Beta)</h1>

</div>

---

## Installation

```sh
yarn add -D storybook-addon-stark
```

```sh
npm install -D storybook-addon-stark
```

In your `.storybook/main.ts` file, add the following:

```ts
// .storybook/main.ts
export default {
  addons: ["storybook-addon-stark"],
};
```

## Usage

There's two main ways to use the Stark addon:

### Vision Simulator

1. At the top of the Storybook preview, click the Stark logo and select a Vision Simulation from the dropdown.
2. To remove the simulation, simply select Reset Vision Simulation from the dropdown.

### WCAG Audit Panel

1. In the Storybook Panels, select Stark.
2. Stark will automatically audit the Storybook preview frame for accessibility issues.
3. Change between Violations, Potentials, and Passed using the tabs at the top.
4. More information on how to fix issues can be used by clicking the WCAG explained links below the code blocks.
