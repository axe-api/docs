# Rate limiting

<p class="description">
Axe API does not provide an internal rate limiter. Nevertheless, we are going to show you an example of how you can add a rate limiter to your application in this section.
</p>

<ul class="intro">
  <li>You will learn</li>
  <li>What is rate limiting?</li>
  <li>How to add a rate limiter?</li>
  <li>How to store the rate-limiting data?</li>
</ul>

## Getting started

**Rate limiting** in REST API refers to the practice of restricting the number of requests a client can make within a specified timeframe. It helps prevent abuse, ensures **fair resource allocation**, and **protects** the API server from **excessive traffic**.

Rate limits are typically defined as a maximum number of requests per minute, hour, or day. When the limit is exceeded, the server responds with a specific HTTP status code (e.g., _429 Too Many Requests_), indicating the client has reached the limit.

Rate limiting can be implemented using various techniques such as token bucket, sliding window, or fixed window algorithms. It promotes API stability, mitigates denial-of-service attacks, and ensures equitable access to resources for all clients while maintaining the overall API performance and availability.

In this section, we are going to use the [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) library as an [Express Middleware](https://expressjs.com/en/guide/using-middleware.html).

## Install dependencies

You can use the following commands in the application root folder;

```js
$ npm install --save express-rate-limit
```

## Integration with Axe API

In the `app/v1/init.ts` file, you can add the following middleware;

::: code-group

```ts [app/v1/init.ts]
import { Express } from "express";
import RateLimitter from "./Middlewares/RateLimitter";

const onBeforeInit = async (app: Express) => {
  app.use(RateLimitter);
};

const onAfterInit = async (app: Express) => {};

export { onBeforeInit, onAfterInit };
```

:::

After that, you can create the following file;

::: code-group

```ts [app/v1/Middlewares/RateLimitter.ts]
import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
});
```

:::

## Storing the data

[express-rate-limit](https://www.npmjs.com/package/express-rate-limit) library supports many store providers such as [Redis](https://redis.io/), [Memcached](https://memcached.org/), or [Mongo](https://www.mongodb.com/). You can use any of them easily.

In the following example, we are going to show how you can add **Redis** support for the rate limiter.

```js
$ npm install --save rate-limit-redis
```

::: code-group

```ts [app/v1/Middlewares/RateLimitter.ts]
import RateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

export default new RateLimit({
  store: new RedisStore({
    // see Configuration
  }),
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});
```

:::

You can review the following store libraries;

- [rate-limit-redis](https://www.npmjs.com/package/rate-limit-redis)
- [rate-limit-memcached](https://npmjs.org/package/rate-limit-memcached)
- [rate-limit-mongo](https://www.npmjs.com/package/rate-limit-mongo)

## Next steps

In this section, we tried to simplify how you can add your rate-limiting features to the API.

In the next section, we are going to show how you can write unit test.
