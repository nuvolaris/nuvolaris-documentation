---
title: Install on Minikube
---

# Installing on Minikube

1. start minikube with at least 4gb and 30gb disk

```
minikube start --memory=4g --disk-size=30g
```

2. label the nodes to indicate the nodeport

```
minikube kubectl  -- label nodes minikube nuvolaris.io/apihost=localhost nuvolaris.io/apiport=3233 nuvolaris.io/protocol=http
```

3. install with `apihost=auto`

```
nuv setup --context=minikube --apihost=auto
```
