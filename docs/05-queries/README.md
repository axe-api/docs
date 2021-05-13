# Queries

While you are fetching any data from the API server, you can add more query options to get the best result about what you want.

## Fields

To get only specific fields, you may use a query like the following statement;

```
/api/users?fields:id,name,surname
```

This request is equal on SQL;

```sql
SELECT `id`, `name`, `surname`
```

This request is equal to Lucid Query;

```js
const result = await User.query()
  .select(["id", "name", "surname"])
  .paginate(?, ?);
```

## Sorting

You may sort your results by your selections for multiple columns;

```
/api/users?sort=surname,-name
```

This request is equal on SQL;

```sql
ORDER BY `surname` ASC, `name` DESC
```

This request is equal to Lucid Query;

```js
const result = await User.query()
  .orderBy("surname", "ASC")
  .orderBy("name", "DESC")
  .paginate(?, ?);
```

## Limits

While you are fetching data with pagination, you may send `page` and `per_page` variables like this;

```
/api/users?page=2&per_page=25
```

This request is equal to Lucid Query;

```js
const result = await User.query().paginate(2, 25);
```

## Where Conditions

Axe API has several where conditions to use.

### Simple Query Expression

```
/api/users?q={ "id": 1 }
```

```sql
WHERE `id` = 1
```

This request is equal to Lucid Query;

```js
const result = await User.query()
  .where("id", "=", 1)
  .paginate(?, ?);
```

### Multiple Conditions

```
/api/users?q=[ {"name": "John"}, {"surname": "Locke" } ]
```

```sql
WHERE `name` = 'John' AND `surname` = 'Locke'
```

This request is equal to Lucid Query;

```js
const result = await User.query()
  .where("name", "=", "John")
  .where("surname", "=", "Locke")
  .paginate(?, ?);
```

### OR Expression On Multiple Conditions

```
/api/users?q=[ {"name": "John"}, {"$or.surname": "Locke" } ]
```

```sql
WHERE `name` = 'John' OR `surname` = 'Locke'
```

This request is equal to Lucid Query;

```js
const result = await User.query()
  .where("name", "=", "John")
  .orWhere("surname", "=", "Locke")
  .paginate(?, ?);
```

### Recursive Conditions

```
/api/users?q=[ [{"name": "John"}, {"$or.surname": "Locke" }], [{"$or.age": 18}, {"$or.id": 666 }] ]
```

```sql
WHERE
  (
    `name` = 'John' OR `surname` = 'Locke'
  )
  OR (
    `age` = 18 OR `id` = 666
  )
```

This request is equal to Lucid Query;

```js
const result = await User
  .query()
  .where((query) => {
    query
      .where('name', '=', 'John')
      .orWhere('surname', '=', 'Locke')
  })
  .orWhere((query) => {
    query
      .where('age', '=', 18')
      .orWhere('id', '=', 666)
  })
  .paginate(?, ?)
```

### Operators

You may use the following operators in all of your queries by adding the operator to the end of your field name.

| Operator      | Request `/api/users?q=`       | SQL (MySQL)              |
| ------------- | ----------------------------- | ------------------------ |
| `$not`        | `{"id.$not": 10}`             | `id <> 10`               |
| `$gt`         | `{"id.$gt": 10}`              | `id > 10`                |
| `$gte`        | `{"id.$gte": 10}`             | `id >= 10`               |
| `$lt`         | `{"id.$lt": 10}`              | `id < 10`                |
| `$lte`        | `{"id.$lte": 10}`             | `id <= 10`               |
| `$like`       | `{"name.$like": "Foo*"}`      | `name LIKE 'Foo%'`       |
| `$notLike`    | `{"name.$notLike": "*Foo*"}`  | `name NOT LIKE '%Foo%'`  |
| `$in`         | `{"id.$in": [1,2]}`           | `id IN (1, 2)`           |
| `$notIn`      | `{"id.$notIn": [1,2]}`        | `id NOT IN (1,2 )`       |
| `$between`    | `{"id.$between": [1, 10]}`    | `id BETWEEN (1, 10)`     |
| `$notBetween` | `{"id.$notBetween": [1, 10]}` | `id NOT BETWEEN (1, 10)` |
| `$null`       | `{"id.$null": null}`          | `id IS NULL`             |
| `$notNull`    | `{"id.$notNull": null}`       | `id IS NOT NULL`         |

## Relationships

To get related models in pagination or show methods, you may use the following statements;

### Multiple Relations

```
/api/users?with=posts,tokens
```

```json
{
  "id": 1,
  "username": "my-username",
  "posts": [
    {
      "id": 1,
      "user_id": 1
    }
  ],
  "tokens": [
    {
      "id": 1,
      "user_id": 1
    }
  ]
}
```

### Only Dedicated Fields

```
/api/users?with=posts{id|user_id|title}
```

```json
{
  "id": 1,
  "username": "my-username",
  "posts": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Awesome post title"
    }
  ]
}
```

### Recursive Relationships

```
/api/users?with=posts{id|user_id|title|comments{id|post_id|content}}
```

```json
{
  "id": 1,
  "username": "my-username",
  "posts": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Awesome post title",
      "comments": [
        {
          "id": 1,
          "post_id": 1,
          "content": "Awesome comment on the post"
        }
      ]
    }
  ]
}
```
