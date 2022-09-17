# Handling

In the previous section, we've learned that Axe API creates your routes automatically. But the magic is not just this about. Axe API handles all HTTP requests for automatically-created routes too. In this section, we are going to talk about _handlers_.

## What Is Handlers?

Handlers represent HTTP request handler for a specific URL. Axe API has got many different handlers but the most importants are the following;

- `INSERT`
- `PAGINATE`
- `SHOW`
- `UPDATE`
- `DELETE`

As you may notices that those are CRUD actions. Axe API doesn't just create routes for your models. It also handles HTTP requests for routes. You will not worry about anything if your have a model like this;

```js
import { Model } from "axe-api";

class User extends Model {}
```

At this point, you can ask the following question;

_"Am I understand correctly? If I create a model like that, will I not have to create controllers?"_

The answer is; **"No, you don't need to create controllers at all"**.

Axe API will handle your HTTP requests. Of course, there are many edge cases. For example, you may not want to create a DELETE route for your model. Also, you may add custom logic for a handler too such as sending confirmation e-mail after user creation. All of these requests are possible with different methods. We are going to talk about it in the next chapters.

## Request Lifecycle

Although we are going to see many details about the HTTP request lifecycle, here we can explain some basic facts.

Whenever Axe API starts to handle an HTTP request, it does its own tasks. These are can be different by the handler type. But there is a constant flow for every handler and that flow would be followed by Axe API.

Also, Axe API checks the analyzed data. For example, in case you defined a Hooks or Events, Axe API is responsible to trigger your functions.

:::tip
**Hooks** and **Events** are very special concepts for the Axe API. Basically, if you want to send an e-mail after user creation, you need some kind of exit point. Because, the user creation process will be handled by Axe API. Hooks and Events are these exit points. Axe API lets you define special functions that can be used as Hooks or Events. So that you can add your special logic to the HTTP Request Lifecycle.
:::

Like we said, for now, we don't need to go deeper. We'll talk about this later a lot.

## What Is Next?

Analyzing and Handling is the unique character of Axe API. This information will help you a lot in the next chapters. I am glad you've read all the architecture concepts!
