# Caching

<p class="description">
Axe API has started to provide an auto-caching mechanism with the new version. In this section, you can learn everything about the Axe API auto-caching mechanism.
</p>

<ul class="intro">
  <li>You will learn</li>
  <li>What is caching?</li>
  <li>How does auto-caching work?</li>
  <li>How to configure the auto-caching setup?</li>
  <li>What is the time-based cache strategy?</li>
  <li>What is the tag-based cache strategy?</li>
  <li>How does Axe API solve the cache invalidation issues?</li>
</ul>

## What is caching?

Caching is a technique used in REST APIs to improve performance and reduce server load.

It stores copies of frequently requested data temporarily. When a client requests data, the server checks if it's in the cache. If so, it's faster to retrieve, reducing response time and server workload.

Caches have expiration times to ensure data remains fresh. This enhances API efficiency, minimizes redundant data transfer, and promotes a responsive user experience.

## Auto-caching

Axe API provides auto-caching support. This means, as a developer you don't need to manage the whole caching strategies for your endpoint. You can provide great caching support for your API by changing simple configurations.

Axe API uses [Redis](https://redis.io/) as the cache database. You have to set up the Redis connection in your configuration files.

::: code-group

```ts [app/config.ts]
import { RedisClientOptions } from "redis";
import { IApplicationConfig, CacheStrategies } from "axe-api";

const config: IApplicationConfig = {
  // ...
  redis: {
    url: "redis://127.0.0.1:6379",
  },
  // ...
};
```

:::

Axe API allows developers to define different cache configurations at the application level, version level, model level, and handler level.

You can use the following configurations to support auto-caching features for all endpoints.

::: code-group

```ts [app/config.ts]
import { IApplicationConfig, CacheStrategies } from "axe-api";

const config: IApplicationConfig = {
  // ...
  cache: {
    enable: true,
    ttl: 300,
    invalidation: CacheStrategies.TimeBased,
  },
  // ...
};
```

:::

After this configuration, all [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) handlers ([PAGINATE](/reference/handlers-paginate-handler), [ALL](/reference/handlers-all-handler), and [SHOW](/reference/handlers-show-handler)) will be cached automatically.

The caching time is `300` seconds. Also, the cache invalidation strategy will be `time-based` which means the cache data will be invalidated by **only time consumed**.

The data will be fetched via the database in the first request as expected. But in the second request, **Axe API** returns the cached data on **Redis**.

You can check the [HTTP Response Headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header) to validate if the cache hit. You can find an example HTTP response with the cURL request in the following code block.

::: code-group

```bash [Response Headers]
HTTP/1.1 200 OK
X-Axe-Api-Cache: Hit
```

```bash [cURL]
$ curl \
  -H "Content-Type: application/json" \
  -X GET http://localhost:3000/api/v1/users
```

```json [HTTP Response]
{
  "data": [
    {
      "id": 1,
      "name": "Karl",
      "surname": "Popper",
      "created_at": "2023-04-16T11:37:08.000Z",
      "updated_at": "2023-04-16T11:37:08.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "lastPage": 1,
    "perPage": 10,
    "currentPage": 1,
    "from": 0,
    "to": 1
  }
}
```

:::

## Configurations

Axe API allows developers to configure the caching in the following levels,

- 0 - Application
- 1 - Version
- 2 - Model
- 3 - Handler

:::tip
The configurations that have the bigger importance would override the others.
:::

You can find example configurations for each level in the following code blocks.

::: code-group

```ts [app/config.ts]
import { IApplicationConfig, CacheStrategies } from "axe-api";

const config: IApplicationConfig = {
  // ...
  cache: {
    enable: true,
    ttl: 100,
    invalidation: CacheStrategies.TimeBased,
  },
  // ...
};
```

```ts [app/v1/config.ts]
import { IVersionConfig, CacheStrategies } from "axe-api";

const config: IVersionConfig = {
  // ...
  cache: {
    enable: true,
    ttl: 200,
    invalidation: CacheStrategies.TimeBased,
  },
  // ...
};
```

```ts [app/v1/Models/User.ts]
import { Model, CacheStrategies } from "axe-api";

class User extends Model {
  // Model-based configuration
  get cache() {
    return {
      enable: true,
      ttl: 300,
      invalidation: CacheStrategies.TimeBased,
    };
  }
}

export default User;
```

```ts [app/v1/Models/Role.ts]
import { Model, HandlerTypes, CacheStrategies } from "axe-api";

class Role extends Model {
  // Handler-based configuration
  get cache() {
    return [
      {
        handlers: [HandlerTypes.ALL],
        cache: {
          enable: true,
          ttl: 400,
          invalidation: CacheStrategies.TimeBased,
        },
      },
    ];
  }
}

export default Role;
```

:::

## Next step

Axe API supports powerful documentation that is created automatically by your model definitions. It is another magic of Axe API.

But this is not enough. You will learn how advanced queries you can use in the next section.
