# Initialization

In this chapter, we are going to explain all details about the initialization (`init.js`) file.

## What Is It?

`init.js` is a file that lets developers extend the application easily. Axe API expects two main methods; `onBeforeInit` and `onAfterInit`. A simple initialization file look like the following one;

```js
const onBeforeInit = async ({ app }) => {};

const onAfterInit = async ({ app }) => {};

export { onBeforeInit, onAfterInit };
```

## `onBeforeInit`

This function is executed before the Axe API initialization process. In this step, Axe API literally knows nothing about your models or the database structure.

## `onAfterInit`

This function is executed after the Axe API initialization process. In this step, Axe API will be completed the analyzing process. All HTTP routers are ready to handle.

## Usage

Please keep in mind that these functions will be called only once.

```js
const onBeforeInit = async ({ app }) => {
  app.use(function(req, res, next) {
    // a middleware
    next();
  });
};

const onAfterInit = async ({ app }) => {
  app.use(function(err, req, res, next) {
    // error handler
    next();
  });
};

export { onBeforeInit, onAfterInit };
```
