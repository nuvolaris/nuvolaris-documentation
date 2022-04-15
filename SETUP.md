# Installing Nuvolaris


## Prerequisites 

To install Nuvolars you need either Docker running locally, with at least 4GB of memory available, or a Kubernetes Cluster with at least one worker node with 4GB of memory.

## Download

Download the latest release of the `nuv` CLI from [here](https://github.com/nuvolaris/nuvolaris/releases), and unpack it in a folder in your path.

## Overview of the setup

the `nuv` cli is very rich and has a lot of subcommands. The sub command to install is `nuv setup`.

If you type `nuv setup` alone it will show a list of options and a list of available Kubernetes contexts, if any.

The main installation options are:

- [`--configure`](#configuration) to configure the installation
- [`--devcluster`](#docker-installation) to install  Nuvolaris in a local development cluster in Docker
- [`--context=<context>`](#kubernetes-installation) to install on a production Kubernetes cluster already available
- [`--uninstall=<context>`](#uninstall) to uninstall Nuvolaris from a development context

# Configuration

The configuration step is optional. You can omit it, and if you do not configure the system will generate suitable defaults.

If you type `nuv setup --configure` the system will generate a `~/.nuvolaris/config.yaml` configuration file and will tell you: `please edit the confuguration file you need to change parameters`.

Please check the file and read comments for the meanining of the various parameters.

Most important remeber to configure the  size of the volumes.

# Docker Installation

If you run:

`nuv setup --devcluster`

it will create a development cluster using Kind (Kubernetes-IN-Docker) and then will install Nuvolaris in it.

It will use the parameters you configured with `--configure`

Note the installation in Docker is for development only and is not perfistent: if you restart Docker or the container all the data in it are lost.

### Managing the devcluster

Note that you can actually create the devcluster by yourself:

`nuv devcluster create`
 
 and destroy it with:

 `nuv devcluster destroy`

 If you create the cluster by yourself it will be accessible with a context `kind-nuvolaris` so can install nuvolaris with `nuv setup --context=kind-nuvolaris`

# Kubernetes Installation

Nuvolaris can be installed in any Kubernetes cluster accessible with `kubectl`. 

Every Kubernetes installation provides a different way to create a cluster and access it with `kubectl`, and will setup a context to access it. Please type `nuv setup` to list the available contexts and then install it with `nuv setup --context=<context-name>`.

The installation will use the values provided by `nuv setup --configure`. It will also create a volume to persist data.

# Uninstall

If you want to delete the installation remove it with `nuv setup --uninstall=<context>`.

You can list the available context with `nuv setup`. Note that the uninstall will not remove the data volumes, you will have to remove them manually. 

Furthermore a new installation without removing the volumes will reuse them, so if you want to reset entirely your installatio, will have to remove manually the volumes. 
