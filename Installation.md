# Installation

## TL;DR

If you are super lazy, in a nutshell the installation instructions are:

- Get access to a Kubernetes cluster
- Check the name of the `<kube-context>` with `kubectl config get-contexts`
- [Download]https://github.com/nuvolaris/nuvolaris/releases the Nuvolaris installer and unpack it
- `./nuv setup --context=<kube-context> --apihost=auto`

If you want to know more read on.

## Supported environments

Currently are supported the following Kubernetes environments:

- Docker Desktop 
- Ubuntu MicroK8S
- Amazon EKS
- Azure AKS
- Google GKS

more environments are on the roadmap.

We provide instructions how to setup the required environments on specific vendors, currently Docker Desktop and Amazon AWS. 

If you do not use those cloud providers, you have to learn from them how to create a Kubernetes cluster or launch a virtual machine, then you can read the generic installation instructions.

# Installation on Docker Desktop

- [Install on Docker Desktop](Install_Docker_Desktop.md)

# Installation on Amazon AWS

- [Launch an AWS EC2 Instance](Launch_AWS_EC2.md)
- [Launch an AWS EKS Cluster](Launch_AWS_EKS.md)

# Generic Installation

- [Install in an Ubuntu Instance](Install_Ubuntu.md)
- [Install in a Kubernetes Cluster](Install_Kubernetes.md)

