# CRUD Actions

Usually, everybody starts to explain how the framework works by creating a new record. But we will use a different way and we'll start to show fetching data from API. This will help more to understand what Axe API does.

## Read

In the `app` directory, we should create the following file;

`app/v1/Models/User.ts`

```ts
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

As you can see, this is a very simple file. You hardly believe us but the API is ready to use. To check it, please navigate your browser the following URL;

`http://localhost:3000/api/v1/users`

```json
{
  "data": [],
  "pagination": {
    "total": 0,
    "lastPage": 0,
    "perPage": 10,
    "currentPage": 1,
    "from": 0,
    "to": 0
  }
}
```

Wow! What happened here? We didn't write any controller, we didn't write any code to fetch or filter data from the table. What's the hack?

Let's explain what happened;

- You execute Axe API with the command; `npm run start:dev`.
- Axe API analyzes which models you have in the `app/v1/Models` folder.
- Axe API analyzes the `User.ts` model for many features.
- Axe API creates the following routes to handle;
  - `POST api/v1/users`
  - `GET api/v1/users`
  - `GET api/v1/users/:id`
  - `PUT api/v1/users/:id`
  - `DELETE api/v1/users/:id`
- When you navigate the `GET api/v1/users` url, Axe API handles the request;
  - It checkes that we should work with `app/v1/Models/User.ts`
  - It analyzes your HTTP request.
  - It queries the data from the `users` table.
  - It completes more magic under the hood (We'll talk about it later).
  - And it responses the result with pagination.

You literally created only a model file, and you got a working API!

## Create

To add creating new record feature to your resource, you have to add the following getter to the model class.

```ts
import { Model } from "axe-api";

class User extends Model {
  get fillable(): string {
    return ["name", "surname"];
  }
}

export default User;
```

After that definition, your API is ready to handle creating new records. You can send the following request to the API to test it;

```bash
$ curl \
  -d '{"name": "Karl", "surname":"Popper"}' \
  -H "Content-Type: application/json" \
  -X POST http://localhost:3000/api/v1/users
```

After that, you can see the new record with the following request;

`http://localhost:3000/api/v1/users`

```json
{
  "data": [
    {
      "id": 1,
      "name": "Karl",
      "surname": "Popper"
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

That's all! You created an API just by creating a simple model file.

## Update & Delete

After all, don't think you only have the create and the read handlers. With that model definition, all crud actions will be ready to use.

- `POST api/v1/users`
- `GET api/v1/users`
- `GET api/v1/users/:id`
- `PUT api/v1/users/:id`
- `DELETE api/v1/users/:id`

::: tip
We'll explain all routing features in the next chapters. For now, you are ready to fly!
:::
