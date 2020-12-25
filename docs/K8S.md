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
kubectl label namespace default istio-injection=enabled
kubectl label namespace demo istio-injection=enabled
kubectl get namespace -L istio-injection

kubectl apply -f charts/templates -n demo
```

## And check your results

```bash
kubectl port-forward svc/articles-service -n demo 3000:3000
```

https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/

You can test your services by accessing the istio ingress and virtual services.

```bash
export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].port}')
export TCP_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="tcp")].port}')

curl -s http://$INGRESS_HOST:$INGRESS_PORT/articles | jq
curl -s http://$INGRESS_HOST:$INGRESS_PORT/config | jq
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
