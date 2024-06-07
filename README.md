* 1. Windows install Docker Desktop
* 2. vscode install plugin - Dev Containers
\\fs01\SWRelease\release\HPC\infortrend@@@hpc-plugin###v1.0.tar.gz
.devcontainer.json
<pre>
// For format details, see https://aka.ms/devcontainer.json. For config options, see the
// README at: https://github.com/devcontainers/templates/tree/main/src/go
{
	"name": "hpc-plugin", 					//NOTE container 名稱
	"image": "hpc-plugin:v1.0", 	//NOTE docker image
	"runArgs": ["--name", "hpc-plugin",         "-p=8005:8005",         "-p=9527:9527",         "-p=4500:4500"
	],	//NOTE container 名稱
	"remoteUser": "root",
	// Features to add to the dev container. More info: https://containers.dev/features.
	// "features": {},

    "mounts": [
        "source=d:\\K8S\\ui-plugin-examples,target=/workspaces/ui-plugin-examples,type=bind,consistency=cached",
        "source=d:\\K8S\\hpc-rancher-extension,target=/workspaces/hpc-rancher-extension,type=bind,consistency=cached",
        // "source=d:\\K8S\\jelly-demo,target=/workspaces/jelly-demo,type=bind,consistency=cached",
        "source=d:\\K8S\\dashboard,target=/workspaces/dashboard,type=bind,consistency=cached"
    ],
}
</pre>
* 3. git clone project
http://swcodeserver.infortrend.com/k8sproject/hpc-rancher-extension/-/tree/hpc-ui
* 4. edit package.json
https://docs.google.com/spreadsheets/d/1Y2XNmpGutOCpVVQU8WgIG2hv1CEM--74VraZvXA2lqM/edit#gid=567859775
<pre>
"scripts": {
  "dev": "API=https://172.27.120.61 NODE_ENV=dev ./node_modules/.bin/vue-cli-service serve --port 9527",
   "dev2": "API=https://rancher.hpccluster NODE_ENV=dev ./node_modules/.bin/vue-cli-service serve --port 9527",
  "dev3": "API=https://172.27.118.111 NODE_ENV=dev ./node_modules/.bin/vue-cli-service serve --port 9527",
}
</pre>
* 5. login docker container hpc-plugin
<pre>
docker exec -it hpc-plugin /bin/bash
cd /workspaces/hpc-rancher-extension
yarn dev
</pre>

----------------------

** EonKube - Rancher code base
https://github.com/rancher/dashboard/tree/v2.7.7
https://rancher.github.io/storybook
<pre>
shell/components
</pre>