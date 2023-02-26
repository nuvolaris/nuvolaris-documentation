---
title: Install on Kubernetes
---

# Installing Nuvolaris on a Kubernetes cluster

You can install Nuvolaris on any Kubernetes that provides at least:

- 4GB of memory and 30GB of disk space
- a block storeage class, configured as default
- either an ingress or a load balancer

If you do not have a Load Balancer (like in self-provisioned Kubernetes clusters in a single instance) you also need to know the `<public-dns-name>` where the Kubernetes cluster is listening.

## Download `nuv`

Now you are ready to install Nuvolaris.

Copy the `<url-address>` of the latest version of the installer [from this page](/download).

Then download and unpack it (replace `<url-address>` with the actual URL address):

```
curl -sL <url-addrress> | tar xzvf -
./nuv -v
```

If the download went ok, you should see the version number of the installer and you can proceed installing Nuvolaris

## Retrieve the Kubernetes context name

If you want to install Nuvolaris in the current Kubernetes context, use `./nuv setup` and it will tell the name of the current context and you can use it as `<kubernetes-context>` in the next step.

In general you can have access to multiple Kubernetes at the same time. Each Kubernetes has a different context name. You can see the available contexts with the command `kubectl config get-contexts`.

Pick the name of the `<kubernetes-context>` corresponding to the cluster you want to install Nuvolaris as you need to install Nuvolaris in that cluster.

### Installing Nuvolaris with a Load Balancer

If you are using a Kubernetes provided by a cloud provider, like AWS, Azure or Gcloud, you have a load balancer and you do not have to provide a DNS name as it is automatically allocated.

You can then use the following command to install Nuvolaris:

```
./nuv setup --context=<kubernetes-context> --apihost=auto
```

The installation can take a few minutes to complete, mostly because a number of large Docker images must be downloaded. If you are curious, you can check what is happening on the Kubernetes cluster running (in another terminal) the command `watch kubectl get po,svc`.

If something goes wrong, please check the [troubleshooting](troubleshooting) page.

### Installing Nuvolaris with an Ingress

If your Kubernetes does not have a load balancer, for example when you installed a Kubernetes cluster in a single VM instance, you need to provide the `<public-dns-name>` of the instance. It is generally the same name you used to access the instance itself.

If you only know the IP address, for example `1.2.3.4` of your virtual machine, you can get a DNS name with the suffix `.nip.io`: `1.2.3.4.nip.io`.

Once you know your `<public-dns-name>` install with:

```
./nuv setup --context=<kubernetes-context> --apihost=<public-dns-name>
```

The installation can take a few minutes to complete, mostly because a number of large Docker images must be downloaded.

If you are curious to know what is happening on the Kubernetes cluster, you can execute (in another terminal connected to the same host) the command `watch kubectl get po,svc`.

If something goes wrong, please check the [troubleshooting](troubleshooting) page.

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

Now you can [download](/download) the `nuv` tool elsewhere, and connect to your serverless environment with:

```
nuv wskprops --apihost=<apihost> --auth=<auth>
```

Once the installation is completed, proceed reading [Apache OpenWhisk documentation](https://openwhisk.apache.org/documentation.html), remembering to use `nuv wsk` when you see `wsk`.
