## TL;DR

Quick links to specific guides: [Docker Desktop](Install_Docker_Desktop.md), [AWS EC2 Instance](Install_AWS_EC2.md), [AWS EKS Cluster](Install_AWS_EKS.md), [Generic Ubuntu ](Install_Ubuntu.md), [Generic Kubernetes](Install_Kubernetes.md) and [Troubleshooting](Troubleshooting.md).

If you are in a hurry, in a nutshell the instructions to install Nuvolaris in a generic Kubernetes environment that supports a load balancer and block storage (EKS, AKS, GKE) are:

- Get the name of the `<kube-context>` of the Kubernetes cluster you want to use with `kubectl config get-contexts`
- [Download](https://github.com/nuvolaris/nuvolaris/releases) the Nuvolaris installer and unpack it
- Install it with  `./nuv setup --context=<kube-context> --apihost=auto`
- Use `nuv wsk property get` to show the current values of apihost and auth key
- Use your server from elsewhere configuring access with `nuv wskprops --apihost=<apihost> --auth=<auth>`using the values show in the previous step.
- Read about [Apache OpenWhisk documentation](https://openwhisk.apache.org/documentation.html) to learn development, remembering to use `nuv wsk` when you see `wsk`

If you want to know more and follow detailed instractions for specific environments, read on or go straight to 

# Installation

Currently Nuvolaris it is tested and supports the latest releases of following Docker and Kubernetes environments:

- Docker Desktop 
- Ubuntu MicroK8S
- Amazon EKS
- Azure AKS
- Google GKE

It may work on other Docker/Kubernetes environment but it has not been tested elsewhere yet, so you mileage may vary.

More environments are on the roadmap.

## Detailed Installation Guides

We provide here a few  guides to install nuvolaris on specific vendors, currently Docker Desktop and Amazon AWS. 

If you do not use those cloud providers, you have to learn from them how to create a Kubernetes cluster or launch a virtual machine. Once you get there, you can follow the generic installation instructions below.

### Installation on Docker Desktop

- [Install on Docker Desktop](Install_Docker_Desktop.md).

### Installation on Amazon AWS

- [Install on an AWS EC2 Instance](Install_AWS_EC2.md).
- [Install on an AWS EKS Cluster](Install_AWS_EKS.md).

### Generic Installation

- [Install in an Ubuntu Instance](Install_Ubuntu.md).
- [Install in a Kubernetes Cluster](Install_Kubernetes.md).

## Troubleshooting

- [What to do if something goes wrong](Troubleshooting.md).
