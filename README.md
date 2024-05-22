# Angular Starter FlowX Container App

Starter template for Angular app with FlowX Renderer SDK.

## Prerequisites

* Node.js min version 18 - [Download Node.js](https://nodejs.org/en/blog/release/v18.12.0)

* Angular CLI version 16. Install Angular CLI globally using the following command:
```
npm install -g @angular/cli
```

This will allow you to run `ng` related commands from the terminal.

## Getting Started

* Get npm registry auth details from FlowX (.npmrc)

Create a `.npmrc` file and update the placeholder tokens with the ones provided by FlowX.
```
//<AUTH_REPO>:_auth="<AUTH_TOKEN>"
email=<AUTH_EMAIL>
registry=https://<AUTH_REPO>
always-auth=true
strict-ssl=true
```

* Add environment endpoints

In `src/environments/environment.ts` file, update the `flowx` object with the values provided by FlowX.
```ts
export const environment = {
  ...
  baseUrl: '<BASE_URL>',
  staticAssetsPath: '<STATIC_ASSETS_PATH>',
  ...
  keycloak: {
    issuer: '<KEYCLOACK_URL>',
    ...
    clientId: '<KEYCLOACK_CLIENT>',
  }
};

```

* Install dependencies
```
npm install
```

* Run the app
```
ng serve
```

* Change the name of the running process

In `src/app/components/main/main.page.html` file, update the `startProcess` method parameter with the name of the process to be run.
```html
<button (click)="startProcess('<PROCESS_NAME>')">Start Process</button>
``` 

### Prerequisites & Documentation

[Using the Angular Renderer](https://docs.flowx.ai/docs/platform-deep-dive/core-components/renderer-sdks/angular-renderer)
