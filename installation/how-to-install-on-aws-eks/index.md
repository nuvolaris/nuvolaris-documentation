---
title: Install on AWS EKS
---

 # Install in an AWS EKS Cluster

Before starting this guide you need an account in AWS and [configure CLI access](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

## Create an AWS EKS cluster 

If you do not have already an EKS cluster for installing Nuvolaris, you need to create one. There are many ways to create an EKS cluster. In this guide we recommend using the [`eksctl`](httsp://eksctl.io) tool.

Start [following this guide](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html) to install it.

Once you have it installed, you need to launch an instance with at least one worker node with at least 4GB of memory.

Also the cluster needs to have the EBS block storage plugin enabled.

You can adapt this `eksctl` configuration file to create a suitable cluster for Nuvolaris:

```
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: nuvolaris-cluster
  region: eu-central-1

iam:
  withOIDC: true

nodeGroups:
  - name: ng-1 
    instanceType: m5.large  
    desiredCapacity: 1
    volumeSize: 80
    ssh:
      publicKeyPath: id_rsa.pub
    iam:
      withAddonPolicies:
        ebs: true
addons:
  - name: aws-ebs-csi-driver
```

Note it is using here (and you should adapt to your needs):

- the region `eu-central-1`, you can pick one closer to you
- instances of type `m5.large`, you can pick a different type
- the `desideredCapacity` is of only 1 worker node, you can add more
- the `volumeSize` is of 80 GB, pick your size

Copy and edit the configuration file as `eks-cluster.yaml`.

Then you launch the actual cluster creation with:

```
eksctl create cluster -f eks-cluster.yml 
```

It will take a while. Once the cluster is created you can retrieve the configuration to access it and check if the access works with:

```
eksctl utils write-kubeconfig --cluster=nuvolaris-cluster
kubectl get nodes
```

You should see something like this:

```
NAME                                              STATUS   ROLES    AGE   VERSION
ip-192-168-42-140.eu-central-1.compute.internal   Ready    <none>   34d   v1.22.6-eks-7d68063
```

## Retrieve your Kubernetes context

If you installed Kubernetes following the instructions of your cloud provider, it will be accessible with the `kubectl` tool. 

You can generally have more contexts to access multiple Kubernetes at the same time. Each Kubernetes is a different context. You can see the available contexts with the command `kubectl config get-contexts`.

Pick the name of the `<kubernetes-context>` corresponding to the cluster you want to install Nuvolaris.

## Installing Nuvolaris with `nuv`

Now you are ready to install Nuvolaris.

Copy the `<url-address>` of the latest version of the installer [from this page](https://github.com/nuvolaris/nuvolaris/releases).

Then download and unpack it (replace `<url-address>` with the actual URL address):

```
curl -sL <url-address> | tar xzvf -
install nuv /usr/local/bin/nuv
nuv -v
```

If the download went ok, you should see the version number of the installer.


```
nuv setup --context=<kubernetes-context> --apihost=auto
```

The installation can take a few minutes to complete, mostly because a number of large Docker images must be downloaded. If you are curious, you can check what is happening on the Kubernetes cluster running (in another terminal) the command `watch kubectl get po,svc`.

### Accessing the serverless environment remotely

Now that your serverless environemnt is ready you can access it from anywhere, using the configured `apihost` and `auth` key.

Type `nuv wsk property get`. It will show something like this:

```
whisk API host		<apihost>
whisk auth		    <auth>
whisk namespace		nuvolaris
whisk API version	v1
whisk CLI version	v0.2.0-trinity.22061015
whisk API build		2021-12-29T12:28:02+0000
whisk API build number	67b3e50
```

Take note of the values `<apihost>` and `<auth>` as you wil need it to access your serverless environment remotely.

Now you can [download](https://github.com/nuvolaris/nuvolaris/releases) the `nuv` tool elsewhere, and connect to your serverless environment with:

```
nuv wskprops --apihost=<apihost> --auth=<auth>
```

Once the installation is completed, proceed reading [Apache OpenWhisk documentation](https://openwhisk.apache.org/documentation.html), remembering to use `nuv wsk` when you see `wsk`.
