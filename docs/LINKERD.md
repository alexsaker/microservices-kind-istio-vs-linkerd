# LINKERD

## Pre requisites

A cluster Kind...

```bash
# a cluster with 3 control-plane nodes and 3 workers
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:

- role: control-plane
- role: control-plane
- role: control-plane
- role: worker
- role: worker
- role: worker
```

https://linkerd.io/2/getting-started/
https://linkerd.io/2/reference/architecture/#control-plane

```bash
curl -sL https://run.linkerd.io/install | sh
export PATH=$PATH:$HOME/.linkerd2/bin
# checking kubernetes cluster
linkerd check --pre
# install linkerd
linkerd install | kubectl apply -f -
linkerd check
kubectl -n linkerd get deploy

```

## Deploy Nginx ingresss

### Prerequisistes

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx ingress-nginx/ingress-nginx


```

## Apply deployments and inject sidecars

```bash
kubectl create ns demo
kubectl apply -f charts/linkerd-solution/templates -n demo
kubectl get deploy -n demo -o yaml | linkerd inject - | kubectl apply -f -
```

## And check your results

```bash
kubectl port-forward svc/nginx-ingress-nginx-controller -n demo 31320:80
curl -s http://localhost:31320/api/config | jq
curl -s http://localhost:31320/api/articles | jq
```

## Visualize your deployment using Linkerd dashboard

```bash
linkerd dashboard &
```
