# boilerplate-ts

## Test local
Run:
- npm install
- npm run build
- npm run test

## Docker initial usage for PRD
- docker build . --file ./docker/Dockerfile -t boilerplate/prd
- docker run --rm -d -p 3000:3000 --name boilerplate_prd boilerplate/prd

## Docker initial usage for DEV
- docker build . --file ./docker/Dockerfile-dev -t boilerplate/dev
- docker run --rm -d -p 3000:3000 -p 7001:7001 -v ${PWD}:/usr/src-app -v /usr/src-app/node_modules --name boilerplate_dev boilerplate/dev:latest

### Set debug on VSCode
This is the config to set debug:
```javascript
{
    "name": "Docker: Attach to Node",
    "type": "node",
    "request": "attach",
    "port": 7001,
    "address": "localhost",
    "localRoot": "${workspaceFolder}",
    "remoteRoot": "/usr/src-app",
    "protocol": "inspector"
}
```
