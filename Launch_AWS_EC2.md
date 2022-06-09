# Launch an AWS EC2 Instance

You can  install Nuvolaris on a single EC2 Instance.

You need to get access to the AWS Console by registering 
to it.

Once you got access to the console, use the following instructions to lauch a suitable virtual machine:

![](Launch_AWS_EC2.png)

1. click on the Services icon
2. Type `EC2` to find the EC2 service and click on the EC2 link
3. Find the `Launch Instance` pull down, open it and click on `Launch Instances`. Then fill the form that shows up.
4. Specify the name of the instance
5. Select Ubuntu as the Image type to launch
6. Select Ubuntu Server 22.x or 20.x. You can use Architecture ADM64 or ARM64
7. Select an instance with at least 4GB of memory and 2VCPU. Suggested choice is `t2.medium`. Larger are ok, smaller are not.
8. Specify the key pair you want to use. This is required to access the instance. If you do not have one., click on `Create new key pair` and follow instructions to create a new key pair and download the key file.
9. Here you need to allow traffic for SSH, HTTP and HTTPS.
10. Require at least 30Gb of disk space.
11. You are ready. Launch the instance.

Once the instance was started, the following screen will pop up:

![](Launch_AWS_EC2_getip.png)

Follow the link, go to the instance details and find out the `<public-DNS-name>, and copy it.

Now access the instance. You need to use the `<key-file>` corresponding to the selected Key Pair name in step 8.

You can now access the virtual machine with:

```
ssh -i <key-file> ubuntu@<public-ipv4-dns>
```

Now proceed following the instructions to [installing Nuvolaris in Ubuntu](Install_Ubuntu.md).
