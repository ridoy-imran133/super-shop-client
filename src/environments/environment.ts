/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseURL: 'http://localhost:4200/lo/&&projectId=P026',
  //baseURL: 'http://192.168.222.16:8086/lo/&&projectId=P026',
  baseAPIURL: 'https://localhost:44367/',
  //baseAPIURL: 'http://192.168.222.16/PBMSAPI/',
  securityURL: 'http://192.168.222.16/SingleSignInAPI/api',
  singleSigninURL: 'http://192.168.222.16/EasyApps/mod_sec/SEC_Login.aspx',
  //securityURL: 'http://localhost:65310/api',
  //testSecurityURL: 'http://192.168.222.16/api/values',
};
