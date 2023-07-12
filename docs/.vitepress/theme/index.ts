import { h } from "vue";
import Theme from "vitepress/theme";
import SpecialLayout from "./SpecialLayout.vue";

import "./styles/vars.css";

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      "home-hero-after": () => h(SpecialLayout),
    });
  },
};
