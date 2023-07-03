# File uploading

<p class="description">
Axe API doesn't provide file-uploading helpers. But we will create documentation here to describe how it is easy to add file uploading support to your API.
</p>

<ul class="intro">
  <li>You will learn</li>
  <li>How to upload files?</li>
  <li>How to handle files?</li>
  <li>How to send a file upload request to the server?</li>
</ul>

## Getting started

File uploading is an important part of APIs. You can use many different techniques and methods. Since Axe API is actually an **Express.js** framework under the hood, we are going to use the internal parts of Express.js.

## Installing dependencies

First of all, let's install the dependencies. We are going to use the `multer` library.

```bash
$ npm install --save multer
```

## Adding multer

We should add the `multer` library as a middleware to Express.js. To be able to do that, we should apply the following changes;

::: code-group

```ts {6,7,8} [app/v1/init.ts]
import { Express } from "express";
import bodyParser from "body-parser";
import multer from "multer";

const onBeforeInit = async (app: Express) => {
  const forms = multer();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(forms.array("file"));
};

const onAfterInit = async (app: Express) => {};

export { onBeforeInit, onAfterInit };
```

:::

## Handling files

After the `multer` middleware, we are ready to handle files. Let's assume that we have a `User` model and we are going to upload files in the creating new user.

We should create the following hook file;

::: code-group

```ts [app/v1/Hooks/User/onBeforeInsert.ts]
import { IHookParameter, ApiError } from "axe-api";

export default async ({ formData, req }: IHookParameter) => {
  const file = ((req.files || []) as any[]).find(
    (item) => item.fieldname === "file"
  );

  if (!file) {
    throw new ApiError("The file parameter is required!");
  }

  // TODO: upload file in anywhere like AWS S3, etc.

  // set the path to the original formData
  formData.path_name = "s3://filename.jpg";
};
```

:::

In this file, we are able to access the uploaded file data via `req.files` variable thanks to `multer` library.

After that, you can upload the file wherever you want. Also, you can set the user's model data to be saved for the file location.

## Sending request

The only change is the request type.

You should send the file to the Axe API server like the following example;

```bash {2}
$ curl --location 'localhost:3000/api/v1/users' \
  --form 'file=@"/Users/my-user/Download/axe-api.png"' \
  --form 'name="John"' \
  --form 'surname="Locke"'
```

## Next steps

In this section, we simply demonstrate a file-uploading example. You can use many different methods like you are using a simple Express application.

In the next section, we are going to discuss about Authentication.
