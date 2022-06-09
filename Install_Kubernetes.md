# Installing Nuvolaris on a Kubernetes cluster 

You can install Nuvolaris on any Kubernetes that provides at least:

- 4GB of memory and 30GB of disk space
- a block storeage class, configured as default
- either an ingress or a load balancer

If you have an ingress you also need to know the `<public-DNS-name>`.

## Download `nuv`

Now you are ready to install Nuvolaris.

Copy the `<url-address>` of the latest version of the installer [from this page](/download).

Then download and unpack it (replace `<url-address>` with the actual URL address):

```
curl -sL <url-addrress> | tar xzvf -
install nuv /usr/local/bin/nuv
nuv -v
```

If the download went ok, you should see the version number of the installer.

## Installing Nuvolaris 

Now you can install Nuvolaris. 

### Public DNS Name 

If your Kubernetes does not have a load balancer, like when you installed a Kubernetes cluster in a single VM instance,  you need to provide the `<public-DNS-name>` of the instance. It is generally the same you used to access the instance itself. 

If you are using a Kubernetes provided by a cloud provider, like AWS, Azure or Gcloud, you have a load balancer and you do not have to provide a DNS name as it is automatically allocated.

### Kubernetes context

If you installed Kubernetes following the instructions of your cloud provider, it will be accessible with the `kubectl` tool. 

You can generally have more contexts to access multiple Kubernetes at the same time. Each Kubernetes is a different context. You can see the available contexts with the command `kubectl config get-contexts`.


Pick the name of the kubernetes context corresponding to the cluster you want to install Nuvolaris.

### Installing Nuvolaris

Once you collected the informations you need, if you want to install on a Kubernetes with a load balancer (mostly, a Kubernetes hosted in cloud providers) use:

```
nuv setup --context=<kubernetes-context> --apihost=<public-dns-name>
```

If instead it is a Kubernetes cluster without a Load Balancer (like a MicroK8S cluster) you need to know the `<public-DNS-name>` to access it. 


```
nuv setup --context=<kubernetes-context> --apihost=<public-DNS-name>
```

### Watching the installation

The installation can take a few minutes to complete, mostly because a number of large Docker images must be downloaded. If you ware curious, you can check what is happening on the Kubernetes cluster running (in another terminal) the command `watch kubectl get po,svc`.

