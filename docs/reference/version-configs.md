# Version Configs

::: code-group

```ts [app/v1/config.ts]
import { IVersionConfig, allow, QueryFeature } from "axe-api";

const config: IVersionConfig = {
  transaction: [],
  serializers: [],
  supportedLanguages: ["en"],
  defaultLanguage: "en",
  query: {
    limits: [allow(QueryFeature.All)],
    defaults: {
      perPage: 10,
      minPerPage: 10,
      maxPerPage: 100,
    },
  },
};

export default config;
```

:::
