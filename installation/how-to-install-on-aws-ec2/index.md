---
title: Install on AWS EC2
---

# Install on an AWS EC2 Instance

You can install Nuvolaris on a single EC2 Instance.

You need at least 4GB, 30GB disk space and 2 VCPU.

As a prerequisite, you need to get access to the AWS Console by registering to Amazon Web Services.

Once you got access to the console, use the following instructions to lauch a suitable virtual machine:

## Launch the EC2 Virtual Machine

![](install_aws_ec2.png)

1. Click on the Services icon.
2. Type `EC2` to find the EC2 service and click on the EC2 link.
3. Find the `Launch Instance` pull down, open it and click on `Launch Instances`. Then fill the form that shows up as follows.
4. Specify the name of the instance.
5. Select Ubuntu as the Image type to launch.
6. Select Ubuntu Server, at least 22.x or 20.x. We recommend you pick AMD64 as an architecture, for now.
7. Select an instance with at least 4GB of memory and 2VCPU. Suggested choice is `t2.medium`. Larger VM types are ok, smaller are not.
8. Specify the key pair you want to use. This step is required to be able to access the instance. If you do not have one, click on `Create new key pair` and follow instructions to create a new key pair and download the key file.
9. Here you need to allow traffic for SSH, HTTP and HTTPS.
10. Here you need  at least 30Gb of disk space.
11. If you filled all the previous fields, you are ready and you can click here to Launch the instance.


Once the instance is up and running, the following screen will pop up:

![](install_aws_ec2_getip.png)

Follow the link, open the instance details, find out the `<public-dns-name>, and copy it.

Now you can access the instance using an SSH client. You need to use the `<key-file>` corresponding to the selected Key Pair name in step 8.

You can access the virtual machine with:

```
ssh -i <key-file> ubuntu@<public-ipv4-dns>
```

## Install Nuvolaris

Once you are connected to the virtual machine with ssh, you can install Nuvolaris executing:

```
curl -s https://www.nuvolaris.io/scripts/ubuntu-ec2.sh | sudo bash
```

The script will take a while to install Kubernetes and Nuvolaris.

If something goes wrong, please check the [troubleshooting](../troubleshooting/index.md) page.

At the end it will show  a command like this:

```
nuv wskprops --apihost=<apihost> --auth=<auth>
```

where `<apihost>` is the DNS name of your virtual machine and `<auth>` is the authorization key.

Take note of this command. You will need it to configure access to your serverless environemnt from anywhere using this command.

You can then install the `nuv` command in your favorite client machine, [downloading](https://github.com/nuvolaris/nuvolaris/releases) the correct version and use the command before to connect to your instance.

Once the installation is completed, proceed reading [Apache OpenWhisk documentation](https://openwhisk.apache.org/documentation.html), remembering to use `nuv wsk` when you see `wsk`.

Set Nuvolaris Environment Variable in Windows

- Extract the Nuvolaris archive, to the directory you wish to install the `nuv` command.
- Open the directory `command`:
- To set the `nuv` command as a user environment variable double click `user.cmd`.
- To set the `nuv` command as a system environment variable double click `system.cmd`.
- Note: if you change the location of your Nuvolaris root folder you need to run the scripts again.
