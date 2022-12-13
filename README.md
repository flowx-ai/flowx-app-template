# Angular Starter FlowX Container App

Starter template for Angular app with FlowX Renderer SDK.

### Prerequisites

* node v.16.14.0
* npm v.8.3.1

## Getting Started

```
npm install -g @angular/cli
npm install
ng serve
```

### Theming
Component theming is done through the ppf-theme mixin that accepts as an argument a list of colors grouped under primary,
status and background

```
@use 'ppf-theme';

@include ppf-theme.ppf-theme((
  'primary': (
    'color1': vars.$primary,
    'color2': vars.$secondary,
    'color3': vars.$text-color,
  ),
  'status': (
    'success': vars.$success,
    'warning': vars.$warning,
    'error': vars.$error,
  ),
  'background': (
    'background1': vars.$background1,
    'background2': vars.$background2,
    'background3': vars.$background3,
  ),
));
```

NOTE: Every request from the FlowX renderer SDK will be made using the HttpClientModule of the client app, which means
those requests will go through every interceptor you define here. This is most important to know when building the auth
method as it will be the job of the client app to intercept and decorate the requests with the necessary auth info (eg.
Authorziation: Bearer ...). NOTE: It's the responsibility of the client app to implement the authorization flow (using
the OpenID Connect standard). The renderer SDK will expect to find the JWT saved in the browser localStorage object at
the key named access_token.

```
# example
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FlxProcessModule} from 'flowx-process-renderer';
import { IconModule } from 'paperflow-web-components';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // will be used by the renderer SDK to make requests
    HttpClientModule,
    // needed by the renderer SDK
    IconModule.forRoot(),
    FlxProcessModule.forRoot({})
  ],
  // this interceptor with decorate the requests with the Authorization header
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

```

The forRoot() call is required in the application module where process will be rendered. The forRoot() method accepts a
config argument where you can pass extra config info, register a custom component, service, or custom validators. Custom
components will be referenced by name when creating the template config for a user task. Custom validators will be
referenced by name (currentOrLastYear) in the template config panel in the validators section of each generated form
field.

```
# example
// example
FlxProcessModule.forRoot({
  components: {
    YourCustomComponentIdenfier: CustomComponentInstance,
  },
  services: {
    NomenclatorService,
    LocalDataStoreService,
  },
  validators: {currentOrLastYear },
})

  // example of a custom validator that restricts data selection to 
  // the current or the previous year 
   
  currentOrLastYear: function currentOrLastYear(AC: AbstractControl): { [key: string]: any } {
    if (!AC) {
      return null;
    }

    const yearDate = moment(AC.value, YEAR_FORMAT, true);
    const currentDateYear = moment(new Date()).startOf('year');
    const lastYear = moment(new Date()).subtract(1, 'year').startOf('year');

    if (!yearDate.isSame(currentDateYear) && !yearDate.isSame(lastYear)) {
      return { currentOrLastYear: true };
    }

    return null;
  }
```

Note: the error that the validator returns should match the validator name. The component is the main container of the
UI, which will build and render the components configured via the FlowX Designer. It accepts the following inputs:

```
# example
<flx-process-renderer
  [apiUrl]="baseApiUrl"
  [staticAssetsPath]="staticAssetsPath"
  [processApiPath]="processApiPath"
  [processName]="processName"
  [processStartData]="processStartData"
  [debugLogs]="debugLogs"
  [keepState]="keepState"
  [language]="language"
></flx-process-renderer>

```


### Parameters:

| Name              |                                                                               Description                                                                                |             Type                  |             Mandatory                    |             Default value                    |             example
| -------           |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------:| :-------------------------------: | :-------------------------------:   | :-------------------------------:   | :-------------------------------:           
| baseApiUrl        |                                                                              Your base url                                                                               |                                                                                  string                                                                                  | true                              | -                              |  https://yourDomain.dev
| staticAssetsPath  |                                                                      Your media library assets  url                                                                      | string                            | true                              | -                              |  https://yourAssetsDomain
| processApiPath    |                                                                             process subpath                                                                              | string                            | string                              | -                              |  onboarding
| processName       |                                                                           Identifies a process                                                                           | string                            | string                              | -                              |  client_identification
| processStartData  |                                                                    Data requierd to start the process                                                                    | json                              | string                                | -                                |  { "firstName": "John", "lastName": "Smith"}
| debugLogs         |                                                       When set to true this will print WS messages in the console                                                        | boolean                           | false                             | false                            |-
| language          |                                                                Language used to localize the application.                                                                | string                            | false                              | ro-Ro                            |-
| keepState         | By default all process data is reset when the process renderer component gets destroyed. Setting this to true will keep process data even if the viewport gets destroyed | boolean                           | false                             | false                           |-
| isDraft           |                                                            When true allows starting a process in draft state                                                            | boolean                           | false                              | false                           |-

### Data and actions

Custom components will be hydrated with data through the $data input observable which must be defined in the custom
component class

```

@Component({
  selector: 'my-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.scss'],
})
export class CustomComponentComponent  {
  @Input() data$: Observable<any>;
  }
```

Component actions are always found under data -> actionsFn key. Action names are configurable via process editor.

```
# data object example
data: {
   actionsFn: {
      action_one: () => void;
      action_two: () => void; }
   }
  
```

### Task management component
The flx-task-managagement component is found in the FlxTaskManagementModule. In order to have access to it, import the module where needed:
```bash
import {FlxTaskManagementModule} from 'flowx-process-renderer';
@NgModule({
  declarations: [
    ...,
  ],
  imports: [
    ...,
    FlxTaskManagementModule
  ],
  
})
export class MyModule {
}
```

```bash
<flx-task-management [baseUrl]="baseUrl" [title]="'Tasks'">
</flx-task-management>
```
| Name              |      Description                        |             Type                  |             Mandatory                    |             Default value                    |             example
| -------           | :--------------------:                  | :-------------------------------: | :-------------------------------:   | :-------------------------------:   | :-------------------------------:           
| apiUrl           | Endpoint where the tasks are available  | string                            | true                              | -                                     |  https://yourDomain.dev/tasks
| title             | Table header value                      | string                            | false                              | Activities                              |  Tasks
| pollingInterval    | Interval for polling task updates                  | number                            | false                              | 5000ms                                  |  10000

