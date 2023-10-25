# Cache Configs

::: code-group

```ts [app/config.ts]
import { IApplicationConfig, CacheStrategies } from "axe-api";

const config: IApplicationConfig = {
  ...
  cache: {
    enable: true,
    ttl: 300,
    invalidation: CacheStrategies.TimeBased,
  }
  ...
};

export default config;
```

:::

:::tip
All configurations can be overridden by version, model, and handler-based configurations.
:::

:::tip
You can override only a specific configuration if you wish in version, model, and handler-based configurations.
:::

## `enable`

You can use this configuration to enable or disable the auto-caching across all endpoints.

The default value is `false`.

## `ttl`

The default invalidation time in seconds.

### `invalidation`

The cache invalidation strategy.

There are two times cache invalidation strategies that you can use.

```ts
enum CacheStrategies {
  TimeBased,
  TagBased,
}
```

##### `CacheStrategies.TimeBased`

In this cache invalidation strategy, cache values would be invalid after the `ttl` time automatically.

##### `CacheStrategies.TagBased`

In this strategy, the cached value would be invalidated both when after `ttl` time and the cached record is updated or deleted.
