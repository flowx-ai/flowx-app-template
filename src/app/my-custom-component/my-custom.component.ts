import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'my-custom-component',
  templateUrl: './my-custom.component.html',
  styleUrls: ['./my-custom.component.scss']
})
export class MyCustomComponent implements OnInit {
  @Input() data$: Observable<any> | null = null;

  name: string = '';

  actions: { saveData: (params?: any) => Observable<any>} | null = null;

  ngOnInit(): void {
    this.data$?.subscribe((data) => {
      console.log('received data in custom component', data);
      this.actions = data.actionsFn;
    });
  }

  saveData(): void {
    console.log('save data', this.name);
    this.actions?.saveData({appData: {name: this.name}}).subscribe();
  }
}
