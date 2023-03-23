---
title: Install on Docker Desktop
---

# Install on Docker Desktop

If you have already installed [Docker Desktop](https://www.docker.com/products/docker-desktop/), installing a local Nuvolaris development cluster is very easy.

## Memory prerequisites

You need a machine with at least 12 GB of memory. *8GB are not enough*. 

On Mac, you need also to reserve al least 6GB of memory to Docker Desktop, since the default is not enough. This is a required step for Mac, but not on Windows and Mac.

![](how-to-install-on-docker-desktop/install_docker_desktop.png)

On Mac you should:
- click on the Docker Desktop icon
- select Preferences
- click on Resources 
- *increase the memory up to 6GB* 
- click on `Apply & Restart`

## Download `nuv` on Mac and Linux

Copy the `<url-address>` of the latest version of the installer [from this page](https://github.com/nuvolaris/nuvolaris/releases) for your platform (Darwin (Mac), or Linux) and architecture (Intel (AMD64) or ARM (ARM64)).

Download and unpack it (replace `<url-address>` with the actual URL address):

```
curl -sL <url-address> | tar xzvf -
install nuv /usr/local/bin/nuv
nuv -v
```

If the download went ok, you should see the version number of the installer.

## Download `nuv` on Windows


Copy in the clipboard the `<url-address>` of the latest version of the installer [from this page](https://github.com/nuvolaris/nuvolaris/releases) for Windows.

Open as *administrative* PowerShell: search for "powershell" on search bar, left click on it and select "Run As Administator". 
Then execute:

```
Invoke-WebRequest -Uri <url-address> -out nuv.zip
Expand-Archive *.zip
Copy nuv.exe C:\Windows\
```

*NOTE*: if you do not want to run as an administator, do not copy it in `C:\Windows\`  but invoke it as `nuv\nuv`.


## Installing Nuvolaris 

Now you can install Nuvolaris on Docker Desktop either  with: 

```
nuv setup --devcluster
```

The installation can take a few minutes to complete, mostly because a number of large Docker images must be downloaded. 

If something goes wrong, please check the [troubleshooting](troubleshooting.md) page.

Once the installation is completed, proceed reading [Apache OpenWhisk documentation](https://openwhisk.apache.org/documentation.html), remembering to use `nuv wsk` when you see `wsk`.



