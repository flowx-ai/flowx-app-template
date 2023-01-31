// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://public.training.flowxai.dev',
  staticAssetsPath: 'https://d2l8u5oe5161s.cloudfront.net/training',

  processApiPath: '/onboarding',
  scanTimeout: 50000,

  keycloak: {
    // Url of the Identity Provider
    issuer: 'https://auth.training.flowxai.dev/auth/realms/flowxai',

    // URL of the SPA to redirect the user to after login
    redirectUri: 'http://localhost:4300/',

    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'flowxai',

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email offline_access',
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: true,
    // at_hash is not present in JWT token
    showDebugInformation: true,
    disableAtHashCheck: false,
  }
};
