# dev-kit 🪓

In this section, we will provide all the information about how you can set up your development environment.

## Fork the repository

You must fork the [axe-api](https://github.com/axe-api/axe-api) repository to your GitHub account first.

:::tip
You can use the [Fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo) docs of GitHub.
:::

## Setup using script

The quickest way to set up your development environment is by using the [setup script](https://github.com/axe-api/dev-kit/blob/master/scripts/install-dev-kit.sh).

You can execute the following script in your terminal.

:::tip
You should create `axe-api-project` folder in your file system, and execute the following code inside of it.
:::

```bash
$ curl -s https://raw.githubusercontent.com/axe-api/dev-kit/master/scripts/install-dev-kit.sh | sh
```

:::warning
You must have `curl` in your terminal to be able to execute this script.
:::

The script will ask you for the forked repository URL. Once you enter the URL, the script will pull the forked and the `dev-kit` repositories, and install all the dependencies.

## Setup manually

You can set up your development environment manually if you want. You might execute the following command after you forked the [axe-api](https://github.com/axe-api/axe-api) repository.

```bash
$ mkdir axe-api-project
$ cd axe-api-project
$ git clone git@github.com:axe-api/dev-kit.git
$ git clone {YOUR_FORKED_REPOSITORY}
$ cd axe-api && npm install
$ cd ../dev-kit && npm install
```
