# Documentation

After the auto-creation process, probably you want to see created routes as a developer. That's why we added documentation support for auto-created routes. You can visit the following route after the application has been executed;

<a href="http://localhost:3000/docs" target="_blank" rel="noreferrer">localhost:3000/docs</a>

```json
{
  "routes": [
    {
      "model": "User",
      "table": "users",
      "method": "POST",
      "url": "/api/v1/users",
      "fillable": ["email", "name"],
      "validations": { "email": "required|email", "name": "required" }
    },
    {
      "model": "User",
      "table": "users",
      "method": "GET",
      "url": "/api/v1/users"
    },
    {
      "model": "Post",
      "table": "posts",
      "method": "POST",
      "url": "/api/v1/users/:userId/my-posts",
      "fillable": ["title", "content"],
      "validations": { "title": "required|max:100" }
    }
  ],
  "modelTree": [
    {
      "name": "User",
      "instance": {
        "relations": [
          {
            "name": "myPosts",
            "resource": "my-posts",
            "type": "HAS_MANY",
            "model": "Post",
            "primaryKey": "id",
            "foreignKey": "user_id"
          },
          {
            "name": "otherPosts",
            "resource": "other-posts",
            "type": "HAS_MANY",
            "model": "Post",
            "primaryKey": "id",
            "foreignKey": "user_id"
          }
        ]
      },
      "hooks": {},
      "events": {},
      "children": [
        {
          "name": "Post",
          "instance": {
            "relations": [
              {
                "name": "user",
                "resource": "user",
                "type": "HAS_ONE",
                "model": "User",
                "primaryKey": "id",
                "foreignKey": "user_id"
              }
            ]
          },
          "hooks": {},
          "events": {},
          "children": []
        }
      ]
    }
  ]
}
```

With this response, you may review what kind of routes have been created automatically. But also, you can see fillable fields and form validations in POST and PUT requests. Additionally, we added `modelTree` variable that we keep model relations between each. This response demonstrates how Axe API resolved your models.

But again, if you want simpler results for your auto-created routes, you should use the following request.

<a href="http://localhost:3000/routes" target="_blank" rel="noreferrer">localhost:3000/routes</a>

```json
[
  "POST /api/v1/users",
  "GET /api/v1/users",
  "GET /api/v1/users/:id",
  "PUT /api/v1/users/:id",
  "DELETE /api/v1/users/:id",
  "POST /api/v1/users/:userId/posts",
  "GET /api/v1/users/:userId/posts",
  "GET /api/v1/users/:userId/posts/:id",
  "PUT /api/v1/users/:userId/posts/:id",
  "DELETE /api/v1/users/:userId/posts/:id"
]
```

This request returns simpler results for your auto-created routes.
