# Routing

In this chapter, we are going to define our model file.

## Model File

In the `app` directory, we should create the following file;

`app/Models/User.js`

```js
import { Model } from "axe-api";

class User extends Model {
  get fillable() {
    return ["name", "surname"];
  }
}

export default User;
```

As you can see, this is a very simple file. You hardly believe us but the API is almost ready to use. To check it, please navigate your browser the following URL;

`http://localhost:3000/api/users`

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

Wow! What happened here? We didn't write any controller, we didn't write any code to fetch or filter data from the table. What's the hack? Let's explain what happened;

- You executed Axe API with the command; `npm run start:dev`.
- Axe API analyzed which models you have in the `app/Models` folder.
- You have only one Model; `app/Models/User.js`
- Axe API analyzed if the `User.js` has any relations to any other model but it doesn't have any.
- Axe API created the following routes to handle;
  - `POST api/users`
  - `GET api/users`
  - `GET api/users/:id`
  - `PUT api/users/:id`
  - `DELETE api/users/:id`
- When you navigate the `GET api/users` url, Axe API handles the request;
  - It checked that we should work with `app/Models/User.js`
  - It analyzed your HTTP request.
  - It queried the data from `users` table.
  - And it response the result with pagination.

## Inserting

As you may notice that we defined a `fillable` getter in the model file. With that, Axe API is ready to handler insert actions for the model. You can send the following request to the API to test it;

```bash
$ curl \
  -d '{"name": "Karl", "surname":"Popper"}' \
  -H "Content-Type: application/json" \
  -X POST http://localhost:3000/api/users
```

After that, you can see the new record in the pagination;

`http://localhost:3000/api/users`

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
