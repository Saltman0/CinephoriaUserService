docker_build('saltman0/nodejs-user:dev', '.')

k8s_resource(
    workload='user-nodejs-deployment',
    labels=["backend"]
)