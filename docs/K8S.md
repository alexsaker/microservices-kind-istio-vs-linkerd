# K8S

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

You will have to install istio sources @ https://istio.io/latest/docs/setup/getting-started/#download

```bash
istioctl install --set profile=demo -y
```

## Apply

```bash
kubectl create ns demo
kubectl apply -f charts/templates -n demo
```

## And check your results

```bash
kubectl port-forward svc/articles-service -n demo 3000:3000
```

## Visualize your cluster with Kiali

You will first need to have side cars applied to your pods and deplyments using the following annotation:
sidecar.istio.io/inject: 'true'

```bash
helm install \
--namespace istio-system \
--set auth.strategy="anonymous" \
--repo https://kiali.org/helm-charts \
kiali-server \
kiali-server

istioctl dashboard kiali
```
