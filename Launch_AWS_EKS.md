 # Launch an AWS EKS Cluster

There are many ways to create an EKS cluster. In this guide we recommend using the [`eksctl`](httsp://eksctl.io) tool.

Start [following this guide](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html) to install it.

Once you have it installed, you need to launch an instance with at least one worker node with at least 4GB of memory.

Also the cluster needs to have the EBS block storage plugin enabled.

You can adapt this eksctl configuration file to create a suitable cluster for Nuvolaris:

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

Note it is using:

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

Now proceed following the instructions to [installing Nuvolaris in Kubernetes](Install_Kubernetes.md).
