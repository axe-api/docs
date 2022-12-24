# Handlers

A handler represents an HTTP request behavior something like inserting data, listing records or etc. Axe API has common HTTP request behaviors as default but the developer is able to decide what kind of handler is enabled. In this section, we are going to look closer at the handlers.

In your models, you can set which handlers should be enabled;

```ts
import { Model, HandlerTypes } from "axe-api";
const { INSERT, SHOW, UPDATE, DELETE, PAGINATE, PATCH, ALL } = HandlerTypes;

class User extends Model {
  get handlers(): HandlerTypes[] {
    return [INSERT, SHOW, UPDATE, DELETE, PAGINATE, PATCH, ALL];
  }
}

export default User;
```

Axe API has the following handlers;

- INSERT
- PAGINATE
- SHOW
- UPDATE
- DELETE
- PATCH
- ALL

## Default Handlers

Axe API uses the following handlers as default handlers for all models;

- INSERT
- PAGINATE
- SHOW
- UPDATE
- PATCH
- DELETE

But you can extend a models' default handlers like the following example;

```ts
import { Model, DEFAULT_HANDLERS, HandlerTypes } from "axe-api";

class User extends Model {
  get handlers(): HandlerTypes[] {
    return [...DEFAULT_HANDLERS, HANDLERS.ALL];
  }
}

export default User;
```

In this example, User Model will have all default handlers but plus `ALL` handler.

## `INSERT`

:::tip
By default, it is **enabled**.
:::

This handler means that clients can send a POST request for the model to create a new record on the table. By default, this handler is enabled. If you want to disable it, you should change your model configuration.

You can see an example request for the model definition;

```ts
import { Model } from "axe-api";

class User extends Model {
  get fillable(): string[] {
    return ["name", "surname"];
  }
}

export default User;
```

:::tip
If you don't provide the `handlers()` getter, INSERT handler will be enabled by default.
:::

```bash
$ curl \
  -d '{"name": "Karl", "surname":"Popper"}' \
  -H "Content-Type: application/json" \
  -X POST http://localhost:3000/api/users
```

:::warning
As a developer, you should provide at least one fillable field name in the model file. Otherwise, clients can't create a new record.
:::

## `PAGINATE`

:::tip
By default, it is **enabled**.
:::

If the **PAGINATE** handler is enabled, clients can paginate all the model data with dynamic query features such as [Where Conditions](/basics/queries/index.html#where-conditions), [Relation Queries](/basics/queries/index.html#related-data), etc.

This is a simple definition of the PAGINATE handlers;

```ts
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

Clients can use the following query to fetch data;

```bash
$ curl \
  -H "Content-Type: application/json" \
  -X GET http://localhost:3000/api/users
```

This is an example result of a pagination request;

```json
{
  "data": [
    {
      "id": 1,
      "name": "Karl Popper",
      "created_at": "2021-10-16T19:18:47.000Z",
      "updated_at": "2021-10-16T19:18:47.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "lastPage": 1,
    "perPage": 10,
    "currentPage": 1,
    "from": 0,
    "to": 10
  }
}
```

:::tip
By default, Axe API doesn't return all records in one request because of performance issues. Clients should use [pagination parameters](/basics/queries/#limits).
:::

## `SHOW`

:::tip
By default, it is **enabled**.
:::

`SHOW` handler returns the selected it by primary key selection.

```ts
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

Clients can use the following query to fetch data;

```bash
$ curl \
  -H "Content-Type: application/json" \
  -X GET http://localhost:3000/api/users/1
```

This is an example result of a pagination request;

```json
{
  "id": 1,
  "name": "Karl Popper",
  "created_at": "2021-10-16T19:18:47.000Z",
  "updated_at": "2021-10-16T19:18:47.000Z"
}
```

:::tip
Clients are free to use [query options](/basics/queries/) except pagination.
:::

## UPDATE

:::tip
By default, it is **enabled**.
:::

`UPDATE` handlers let the clients update the selected record by primary key.

```ts
import { Model } from "axe-api";

class User extends Model {
  get fillable(): string[] {
    return ["name", "surname"];
  }
}

export default User;
```

Clients can use the following query to fetch data;

```bash
$ curl \
  -H "Content-Type: application/json" \
  -d '{"name": "Karl", "surname":"Popper"}' \
  -X PUT http://localhost:3000/api/users/1
```

## DELETE

:::tip
By default, it is **enabled**.
:::

`DELETE` handlers let the clients delete the selected record by primary key.

```ts
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

Clients can use the following query to fetch data;

```bash
$ curl \
  -H "Content-Type: application/json" \
  -X DELETE http://localhost:3000/api/users/1
```

:::tip
If the selected record could be deleted properly, Axe API will return **HTTP 200**.
:::

## PATCH

:::tip
By default, it is **enabled**.
:::

`PATCH` lets the clients update the record by only one field. By default, it is **disabled** but it can be set as **enabled** like the following example;

```ts
import { Model, HandlerTypes } from "axe-api";
const { INSERT, SHOW, UPDATE, DELETE, PAGINATE, PATCH } = HandlerTypes;

class User extends Model {
  get handlers(): HandlerTypes[] {
    return [INSERT, SHOW, UPDATE, DELETE, PAGINATE, PATCH];
  }

  get fillable(): string[] {
    return ["name", "surname"];
  }
}

export default User;
```

:::warning
The field that will be updated should be defined in the `fillable()` getter.
:::

In this following request, only the record's `name` field will be updated. `surname` field will stay as it is.

```bash
$ curl \
  -H "Content-Type: application/json" \
  -d '{"name": "Karl"}' \
  -X PATCH http://localhost:3000/api/users/1
```

:::tip
For validation will be executed after merging the record's fields and the new data field.
:::

## `ALL`

:::warning
By default, it is **disabled**.
:::

If the **ALL** handler is enabled, clients can fetch all records as an array with dynamic query features such as [Where Conditions](/basics/queries/#where-conditions), [Relation Queries](/basics/queries/#relation-queries), etc.

:::danger
If your table has millions of records, the API would return all of them. That's why you should be careful while using this handler.
:::

This is a simple definition of the ALL handlers;

```ts
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

Clients can use the following query to fetch data;

```bash
$ curl \
  -H "Content-Type: application/json" \
  -X GET http://localhost:3000/api/users/all
```

This is an example result of a pagination request;

```json
[
  {
    "id": 1,
    "name": "Karl Popper",
    "created_at": "2021-10-16T19:18:47.000Z",
    "updated_at": "2021-10-16T19:18:47.000Z"
  }
]
```
