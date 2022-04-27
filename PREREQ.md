# Prerequisites

In this document collect instructions how to prepare a suitable development environment for installing Nuvolaris

## Desktop

If you have a windows or mac desktop, download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

Then you can [install](SETUP.md#docker-installation) Nuvolaris with `nuv setup --devcluster`

## Single Server with Ubuntu and MicroK8S

You can install Nuvolaris on a single Linux server using Ubuntu and MicroK8s. If you have a single linux server, you need at least 4GB of ram and 2 VCPU.

You can provision a single server in multiple environments. It is possible to create a VM with Ubuntu with a fixed IP basically in every cloud provider. Check the documentation of your cloud provider.

Note that if you have only the IP, and you do not have a DNS name, you can use the [nip.io](https://nip.io/) service as a DNS name, even in internal networks.

For example if your IP is `1.2.3.4`, your DNS name is `1-2-3-4.nip.io`.

Some hints to create a suitable VM.

- On AWS, launch an Ubuntu 20 instance, a `t3.medium` with 30GB if disk space. It is also recommended you allocate a static IP and associate it with a fixed DNS name. You also need to open the ports 16443, 443 and 80.
- You can also use [multipass](https://multipass.run/) to create a vm with `multipass launch -c2 -d30G -m4G -n nuvolaris` and use the IP assigned that you can see with `multipass list`

### Installing Nuvolaris with MicroK8s

If you have a single server, install [MicroK8S](https://microk8s.io/) and enable ingress and storage:

```
sudo snap install microk8s --classic
sudo microk8s enable storage ingress
sudo usermod -a -G microk8s ubuntu
sudo snap install kubectl --classic
```

Then you have to logout and login again to pick changes in the group.

You can then generate a kubectl configuration and check it works with: 

```
mkdir ~/.kube
microk8s config >~/.kube/config
kubectl get nodes
```

Then you can then [donwload `nuv`](https://github.com/nuvolaris/nuvolaris/releases) and [install](SETUP.md#kubernetes-installation) Nuvolaris from the server itself with `nuv setup --context=<context>`.

### Install Nuvolaris remotely 

If you want to access to the server remotely, you need to add the DNS name of the server (either the real one or the .nip.io) and  generate a proper configuration with:

```
DNS='<your-dns-name>'
sudo microk8s stop
sed -i "/DNS.5/a DNS.6 = $DNS" /var/snap/microk8s/current/certs/csr.conf.template
sudo microk8s start
microk8s config | sed -e "s/server: .*/server: https:\/\/$DNS:16443/" >kubeconfig
```

You can then download the kubeconfig file and copy in your ~/.kube/config to access the remote Kubernetes cluster.

Then you can then [donwload `nuv`](https://github.com/nuvolaris/nuvolaris/releases) and [install](SETUP.md#kubernetes-installation) Nuvolaris from the server itself with `nuv setup --context=<context>`.



