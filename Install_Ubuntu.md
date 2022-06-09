# Installing Nuvolaris on an Ubuntu instance

As a prerequisite you need:

- an Ubuntu Instance, at least version 20 (with snap pre-installed)
- at least 4GB of memory, 30 gb of disk space
- ssh and sudo access to the instance
- firewall opened for port 80 and 443
- the `<public-DNS-name>` of the instance

Use ssh to log into the instance, according the instructions of your cloud provider.

## Install MicroK8s

First, let's install `microk8s` with `snap`: 

```
sudo snap install microk8s --classic
sudo microk8s enable storage ingress dns
```

Now let's give access to `microk8s`

```
sudo usermod -a -G microk8s ubuntu
newgrp microk8s
```

Finally get  kubectl access:

```
mkdir ~/.kube
microk8s config >~/.kube/config
kubectl get nodes
```

You should get an output like this (versions and names can be different):

```
NAME               STATUS   ROLES    AGE   VERSION
ip-172-31-21-189   Ready    <none>   70m   v1.24.0-2+59bbb3530b6769
```

## Installing Nuvolaris

Now you are ready to install Nuvolaris.

Copy the `<url-address>` of the latest version of the installer [from this page](/download).

Then download and unpack it (replace `<url-address>` with the actual URL address):

```
curl -sL <url-addrress> | tar xzvf -
install nuv /usr/local/bin/nuv
nuv -v
```

If the download went ok, you should see the version number of the installer.

Now you can install Nuvolaris. 

For Microk8s instances you do not have generally a load balancer configured so you need to provide the `<public-DNS-name>` of the instance. It is generally the same you used to access the instance itself.

Also you need the name of the `<kubernetes-context>` to use. 

You can generally have more contexts to access multiple Kubernetes at the same time.

With Microk8s there should be only one and it is named `microk8s`. You can see the available contexts with the command `kubectl config get-contexts`.

Once you collected the informations you need you can install it with:

```
nuv setup --context=<kubernetes-context> --apihost=<public-dns-name>
```

The installation can take a few minutes to complete, mostly because a number of large Docker images must be downloaded. If you ware curious, you can check what is happening on the Kubernetes cluster running (in another terminal) the command `watch kubectl get po,svc`.



