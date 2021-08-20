# Queries

Queries are a very important part of Axe API. We take it seriously because we believe that queries will give us flexibility for API clients such as web and mobile. Also, queries can answer your question about why you should use Axe API.

While you are fetching any data (For example in PAGINATE handlers for now), you can define what kind of data you want to see. In this section, we are going to explain every detail of querying.

## Fields

To get only specific fields, you may use a query like the following statement;

```
/api/users?fields:id,name,surname
```

This request is equal on SQL;

```sql
SELECT `id`, `name`, `surname`
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

In this request, `-` means `DESC`.

## Limits

While you are fetching data with pagination, you may send `page` and `per_page` variables like this;

```
/api/users?page=2&per_page=25
```

## Where Conditions

You can use almost everything on any database server. Also, it supports recursive conditions.

### Simple Condition

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

### Logical Expressions

```
/api/users?q=[ {"name": "John"}, {"$or.surname": "Locke" } ]
```

```sql
WHERE `name` = 'John' OR `surname` = 'Locke'
```

> Also, you can use the `$and` prefix. If you don't specify any prefix, \$and will be used as default.

### Recursive Conditions

```
/api/users?q=[
   [{"name": "John"}, {"$or.surname": "Locke" }],
   [{"$or.age": 18}, {"$or.id": 666 }]
  ]
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

## Relation Queries

You can fetch the related data for the `PAGINATION` and the `SHOW` handlers.

```
/api/users?with=posts{comments{id|content}}
```

`HTTP Response`

```json
{
  "id": 1,
  "email": "user@mail.com",
  "posts": [
    {
      "id": 1,
      "user_id": 1,
      "title": "The first blog post",
      "comments": [
        {
          "id": 1,
          "post_id": 1,
          "content": "The content of the comment."
        }
      ]
    }
  ]
}
```

You can use relation names recursively like this; `posts{comments{likes}}`.

But also, you can select which columns will be fetched for the relation. You don't have to fetch all columns.

```
/api/users?with=posts{id|title}}
```

> Foreign and Primary Key columns will be returned automatically.

## Operators

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
