import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessComponent} from './process.component';
import {RouterModule, Routes} from '@angular/router';
import {LocalDataStoreService} from '../../services/local-data-store';
import {FlxProcessModule} from 'flowx-process-renderer';
import {MyCustomComponent} from '../../components/my-custom-component/my-custom.component';

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
      }
    }),
  ]
})
export class ProcessModule {
}
