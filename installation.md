---
title: Installation
---

# Installation

[Nuvolaris](https://www.nuvolaris.io) is an easy to use and portable serverless environment. 

You can install it in the following supported environments:

- [Install on Docker Desktop](installation/how-to-install-on-docker-desktop.md).
- [Install on a single instance on AWS EC2 Instance](installation/how-to-install-on-aws-ec2.md).
- [Install on a single instance on Hetzner Cloud](installation/how-to-install-on-hetzner-cloud.md).
- [Install on an AWS EKS Cluster](installation/how-to-install-on-aws-eks.md).
- [Install on a generic Ubuntu Instance](installation/how-to-install-on-ubuntu.md), tested on AWS and Hetzner
- [Install on a Kubernetes Cluster](installation/how-to-install-on-kubernetes.md), tested on EKS, AKS and GKE

It may work on other Docker/Kubernetes environment but it has not been tested elsewhere yet, so you mileage may vary. 

More environments are on the roadmap.

If something goes wrong, here is [what to do to report problems](installation/troubleshooting.md).


## TL;DR

If you are in a hurry, in a nutshell the instructions to install Nuvolaris in a generic Kubernetes environment that supports a load balancer and block storage (EKS, AKS, GKE) are:

- Get the name of the `<kube-context>` of the Kubernetes cluster you want to use with `kubectl config get-contexts`
- [Download](https://github.com/nuvolaris/nuvolaris/releases) the Nuvolaris installer and unpack it
- Install it with  `./nuv setup --context=<kube-context> --apihost=auto`
- Use `nuv wsk property get` to show the current values of apihost and auth key
- Use your server from elsewhere configuring access with `nuv wskprops --apihost=<apihost> --auth=<auth>`using the values show in the previous step.
- Read about [Apache OpenWhisk documentation](https://openwhisk.apache.org/documentation.html) to learn development, remembering to use `nuv wsk` when you see `wsk`

# Contributions

Some contributed documentation:

- [Set a NUV variable on Window](sinstallation/set-on-window.md)
