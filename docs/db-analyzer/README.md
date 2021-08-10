# DB Analyzer

## Preface

**Axe API** comes with a strong feature which you can not find in common frameworks; **Database Analyzer (DB Analyzer)**. _DB Analyzer_ is an internal feature which analyzes your database schema deeply, and compare it with your model and query definitions. It helps you to develop an API easy and reduces critical mistakes, specially on the refactoring time.

## Example

For example; let's assume that you have a model definition like the following image;

<div style="text-align:center;">

![Database Schema](/images/db-analyze-model.png)

</div>

If you create a model file like the following one, even though you have a table in your database like that, you would got an error from DB Analyzer.

```js
import { Model } from "axe-api";

class User extends Model {
  get table() {
    return "my_user";
  }
}

export default User;
```

If you define the table name as `my_user`, DB Analyzer wouldn't find the table in your database schema. In this case, you would get the following error;

> Error: The "my_users" table doesn't have any column. Are you sure about the table name?

This is the power of DB Analyzer.

## Protected Definitions

In the following list, you may see that which definitions are working with DB Analyzer together.

- [Table name](/models/#table-name)
- [Primary Key](/models/#primary-key)
- [Fillable Fields](/models/#fillable-fields)
- [Form Validations](/models/#validations)
- [Hidden Fields](/models/#hidden-fields)
- [Timestamps](/models/#timestamps)
- [INSERT, UPDATE actions](/routes/#handlers)
- [Related Routes](/routes/#related-routes)
- [Query Fields](/queries/#fields)
- [Query Sorting](/queries/#sorting)
- [Query Where Conditions](/queries/#where-conditions)
- [Query Relations](/queries/#relation-queries)

## Supported Database

- [x] MySQL
- [ ] PostgreSQL ([#26](https://github.com/axe-api/axe-api/issues/26))
- [ ] MSSQL ([#27](https://github.com/axe-api/axe-api/issues/27))
- [x] SQLite
- [ ] Oracle ([#29](https://github.com/axe-api/axe-api/issues/29))
- [ ] Amazon Redshift ([#30](https://github.com/axe-api/axe-api/issues/30))
