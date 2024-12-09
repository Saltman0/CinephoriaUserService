docker_build('saltman0/nodejs-user:1.0.0', '.', entrypoint=".")

k8s_resource(
    workload='user-nodejs-deployment',
    labels=["backend"]
)