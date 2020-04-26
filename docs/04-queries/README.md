# Queries

While you are fetching any data from api server, you can add more query options to get best result about what you want.

## Fields

In order to get only specefic fields, you may use a query like following statement;

```
/api/users?fields:id,name,surname
```

This request is equal on SQL;

```sql
SELECT `id`, `name`, `surname`
```

## Sorting

You may sorting your results by your selections for multiple columns;

```
/api/users?sort=surname,-name
```

This request is equal on SQL;

```sql
ORDER BY `surname` ASC, `name` DESC
```

## Limits

While you are fetching data with pagination, you may send `page` and `per_page` variables like this;

```
/api/users?page=2&per_page=25
```

## Where Conditions

AdonisX has several where conditions to use.

### Simple Query Expression

```
/api/users?q={ "id": 1 }
```

```sql
WHERE `id` = 1
```

### Multiple Conditions

```
/api/users?q=[ {"name": "John"}, {"surname": "Locke" } ]
```

```sql
WHERE `name` = 'John' AND `surname` = 'Locke'
```

### OR Expression On Multiple Conditions

```
/api/users?q=[ {"name": "John"}, {"$or.surname": "Locke" } ]
```

```sql
WHERE `name` = 'John' OR `surname` = 'Locke'
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

### Operators

You may use following operators in all of your queries by adding the operator to the end of your field name.

| Operator        | Request `/api/users?q=`        | SQL (MySQL)              |
|-----------------|--------------------------------|--------------------------|
| `$not`          | `{"id.$not": 10}`              | `id <> 10`               |
| `$gt`           | `{"id.$gt": 10}`               | `id > 10`                |
| `$gte`          | `{"id.$gte": 10}`              | `id >= 10`               |
| `$lt`           | `{"id.$lt": 10}`               | `id < 10`                |
| `$lte`          | `{"id.$lte": 10}`              | `id <= 10`               |
| `$like`         | `{"name.$like": "Foo*"}`       | `name LIKE 'Foo%'`       |
| `$notLike`      | `{"name.$notLike": "*Foo*"}`   | `name NOT LIKE '%Foo%'`  |
| `$in`           | `{"id.$in": [1,2]}`            | `id IN (1, 2)`           |
| `$notIn`        | `{"id.$notIn": [1,2]}`         | `id NOT IN (1,2 )`       |
| `$between`      | `{"id.$between": [1, 10]}`     | `id BETWEEN (1, 10)`     |
| `$notBetween`   | `{"id.$notBetween": [1, 10]}`  | `id NOT BETWEEN (1, 10)` |
| `$null`         | `{"id.$null": null}`           | `id IS NULL`             |
| `$notNull`      | `{"id.$notNull": null}`        | `id IS NOT NULL`         |

## Relationships

In order to get related models in pagination or show methods, you may use following statements;

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