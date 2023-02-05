# Versions <Badge type="tip" text="^0.30.0" />

Axe API supports multiple API versions on a database schema at the same time. You can customize your API and your custom logics for each version.

## Folder Structure

Axe API provides `v1` version by default. As a developer, you are able to create more version by adding a new version folder on the `app` folder. The initial structure of an Axe API project looks like this;

```bash
├── app
  ├── v1
    ├── Config
    ├── Events
    ├── Hooks
    ├── Models
    ├── config.ts
    ├── init.ts
  ├── config.ts
├── migrations
```

The `app` folder contains two things;

- General API configuration (`config.ts`)
- API version directories (`v1`, `v2`, `beta`, `alfa`)

:::warning
Every directory name is accepted as a new version of your API.
:::

:::warning
Version folder name must be alphanumeric.
:::

The following example demonstrate that the API has two different version;

```bash
├── app
  ├── v1
    ├── Config
    ├── Events
    ├── Hooks
    ├── Models
    ├── config.ts
    ├── init.ts
  ├── v2
    ├── Config
    ├── Events
    ├── Hooks
    ├── Models
    ├── config.ts
    ├── init.ts
  ├── config.ts
├── migrations
```

## URL Pattern

Axe API uses the following URL pattern;

`/{API_PREFIX}/{VERSION}/{MODEL}`

- `{API_PREFIX}`: The prefix of the API. It can be configured in `app/config.ts` file. Default value is `/api`.
- `{VERSION}`: The version folder name. It should be alphanumeric.
- `{MODEL}`: The plural version of the model name.

:::warning
The URL can be change by the model definition. For example: `/api/v1/users/:id/posts`
:::

## Common database schema

For each API version must use the same database schema. Creating a completely different Axe API project would be a better option if you want to use different database schema.

:::tip
There are only one `migrations` folder in your API project. It means that you can only manage one database schema at the same time.
:::
