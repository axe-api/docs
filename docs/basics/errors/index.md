# Error Handling

You already know that Axe API is basically an Express.js project. With that power, you can use a simple error handler of Express.js.

Let's remember how does it look like.

```js
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // the default error handler.
});
```

You can see that the error handler function is defined at last just because to catch all errors.

In Axe API, You can define any middleware function like Express.js. To create an error handler, you should use the initialization functions;

`app/init.js`

```js
const onBeforeInit = async ({ app }) => {};

const onAfterInit = async ({ app }) => {
  app.use(function(err, req, res, next) {
    // the default error handler.

    // Send the error to an error logger
    // sendErrorToLogges(err)

    // You may want to hide the error detail on production
    if (process.env.NODE_ENV === "production") {
      return res.status(500).json({
        message: "An error occurred.",
      });
    }

    throw err;
  });
};

export { onBeforeInit, onAfterInit };
```
