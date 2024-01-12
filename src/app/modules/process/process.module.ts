import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessComponent} from './process.component';
import {RouterModule, Routes} from '@angular/router';
import {FlxProcessModule} from '@flowx/ui-sdk';
import {LocalDataStoreService} from '../../services/local-data-store';
import {MyCustomComponent} from "../../components/my-custom-component/my-custom.component";

const routes: Routes = [
  {
    path: '',
    component: ProcessComponent,
  },
];

@NgModule({
  declarations: [ProcessComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlxProcessModule.forRoot({
      components: {
        SimpleCustomComponent: MyCustomComponent,
      },
      services: {
        LocalDataStoreService
      },
      themePaths: {
        components: 'assets/theme/theme_components.json',
        tokens: 'assets/theme/theme_tokens.json',
      },
    }),
  ]
})
export class ProcessModule {
}
