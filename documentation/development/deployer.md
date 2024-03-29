---
title: The Deployer
---

# The Deployer

You can use `nuv` to scan a folder and build a manifest file to deploy the project contained within, using `nuv -scan`.
It will scan the current folder (or the given path) looking for the folders named `packages` and `web`. 

## The packages folder

If the `packages` folder is found, `nuv` will proceed to build a manifest file where each sub-folder of `packages` is translated to a package creation command (1 package for each subfolder) and each files in this level is considered
to create a Single File Action under the `default` package which is pre-created in every Nuvolaris deployment.

In every sub-folder, if it finds files it will generate a command to create [single file actions](#single-file-actions)
in the package corresponding to the sub-folder's name. If it finds sub-folders, it will generate commands to create [multi file actions](#multi-file-actions). There can be the special `web` sub-folder which will be used to deploy a static frontend under the relative package name, so in this case it is not a MFA.

### Single File Actions

`nuv` generates an `action create` command for each single file actions, with the flag `--kind nodejs:default`, `--kind python:default`, `--kind go:default` and `--kind java:default` depending on the relative runtime.

The possible runtimes are described by `runtime.json` that can be downloaded from the configured api host.

If the extension is in format: `.<version>.<extension>`, the command will have `--kind <language>:<version>`.

### Multi File Actions

`nuv` implements some heuristics to decide the correct type of the file to build.

Currently:

- if there is a `package.json`  or any `js` field in the folder then it is  `.js` and it builds with `npm install ; npm build`
- if there is a `requirements.txt` or any `.py` file then it is python and it builds creating a virtual env as described in the python runtime documentation
- if there is `pom.xml` then it builds using `mvn install`
- if there is a `go.mod` then it builds using `go build`

The command that `nuv` will generate consists of i) zip the folder ii) create the action with the zip archive and the correct type of the runtime.
