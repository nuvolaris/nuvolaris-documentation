---
title: Overview
---

# A Nuvolaris Project

A project represents a logical unit of functionality whose boundaries are up to you. Your app can contain one or more projects. The folder structure of a project determines how the deployer finds and labels packages and actions, how it deploys static web content, and what it ignores.

You can detect and load entire projects into Nuvolaris with a single command using the `nuv` CLI tool.

# Project Detection

A project has a root folder, within which there can be 2 folders with special names:

- A `packages` folder: containes sub-folders which are treated as packages and are assumed to contain actions in the form of either files or folders, which we refer to as Single File Actions (SFA) and Multi File Actions (MFA).
- A `web` folder: contains folders and files with static web content.

Anything else is ignored. This lets you store things in the root folder that are not meant to be deployed on Nuvolaris (such as build folders and project documentation).

### Single File Actions

A single file actions is simply a file with an extension (the supported ones: `.js`  `.py` `.go` `.java`)

### Multi File Actions

A multi file action is a folder containing a `main` file and dependencies. The folder is bundled into a zip file and deployed as an action.


![img](nuv-projects.png)
