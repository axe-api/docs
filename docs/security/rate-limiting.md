# Rate Limiting

**Axe API** does not provide an internal rate limiter. Nevertheless, we are going to show you an example of how you can add a rate limiter to your application. It is super easy.

Basically, we are going to use the [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) library as an [Express Middleware](https://expressjs.com/en/guide/using-middleware.html).

## Dependencies

You can use the following commands in the application root folder;

```js
$ npm install --save express-rate-limit
```

## Integration

In the `app/v1/init.ts` file, you can add the following middleware;

```ts
import { Express } from "express";
import RateLimitter from "./Middlewares/RateLimitter";

const onBeforeInit = async (app: Express) => {
  app.use(RateLimitter);
};

const onAfterInit = async (app: Express) => {};

export { onBeforeInit, onAfterInit };
```

After that, you can create the following file;

`app/v1/Middlewares/RateLimitter.ts`

```ts
import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
});
```

## Stores

[express-rate-limit](https://www.npmjs.com/package/express-rate-limit) library supports many store providers such as [Redis](https://redis.io/), [Memcached](https://memcached.org/), or [Mongo](https://www.mongodb.com/). You can use any of them easily.

In the following example, we are going to show how you can add Redis support for the rate limiter.

```js
$ npm install --save rate-limit-redis
```

`app/v1/Middlewares/RateLimitter.ts`

```ts
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

You can review the following store libraries;

- [rate-limit-redis](https://www.npmjs.com/package/rate-limit-redis)
- [rate-limit-memcached](https://npmjs.org/package/rate-limit-memcached)
- [rate-limit-mongo](https://www.npmjs.com/package/rate-limit-mongo)
