---
title: Projects
---

# Static frontend

The `web` folder in the root of a project is used to deploy static frontends. A static front-end is a collection of static asset under a given folder that will be published in a web server under a path.

The path that will serve the a static asset is determined by:
- Hostname
- Location of the asset

## Hostname

In general, for each namespace there will be a `https://<namespace>.<domain>` website where to publish the resources. For the local deployment there will be a website `http://127.0.0.1:8080` where the resources are published, with the namespace and the domain ignored.

## Path detection

The path where the assets are published depends on the path in the `web` hierarchy.

The sub-folder `web` is published as "/".

Any subfolder `web` under `packages/<package>/web` is published under `/<packages>/`.

Any subfolder `web` under `packages/default/<action>\web` is published as `/<action>`.

Any subfolder `web` under `packages/<package>/<action>/web` is published as `/<package>/<action>`

What is published (files collected) and how it is built is defined by the next paragraph.

## Building and Collecting

In every folder `web` it will check if there is a `nuvolaris.json`

If there is not a `nuvolaris.json` and not a `package.json` it will assume this base `nuvolaris.json`:

```
{
  "collect": ".",
  "install": "echo nothing to install",
  "build": "echo nothing to build"
}
```

If instead there is `packages.json`, it will assume this base `nuvolaris.json`:

```
{
  "collect": "public",
  "install": "npm install",
  "build": "npm run build"
}
```

The it will read the `nuvolaris.json` replacing the keys in it with the default ones.

The generated taskfile will execute at deployment step:

- the command defined by `install` only if there is not a `node_modules`
- the command defined by `build` always
- then it will collect for publishing (creating a crd instance) the files in the folder defined by `collect`

It is recommended that `nuv scan` does not execute directy the command but instead it delegates to another command like `nuv build` and in turn the creation of `crd` to another `nuv crd` subcommand, after changing to the corresponding sudfolder. All those commands should work by default in current folder. 


# The Complete Mapping

To summarize, the mapping for packages is:

| Folder Name | Nuvolaris Package | Type |
| --- | --- | --- |
| Root directory |  |  |
| packages |  |  |
| packages/&lt;package_name&gt; | &lt;package_name&gt; | Nuvolaris Package |
| &lt;file_name&gt; | default | Single File Action |
| packages/&lt;package_name&gt;/&lt;file_name&gt; | &lt;package_name&gt; | Single File Action |
| packages/&lt;package_name&gt;/&lt;subfolder_name&gt; | &lt;package_name&gt; | Multi File Action |

And the mapping for web folders is:

| Folder Name | Endpoint |
| --- | --- | 
| Root directory |  |  
| web | `/` | 
| packages/&lt;package_name&gt;/web | `/<package_name>/` |
| packages/&lt;default&gt;/&lt;action_name&gt;/web | `packages/default/<action_name>\web` |
| packages/&lt;package_name&gt;/&lt;action_name&gt;web | `/<package>/<action>` |