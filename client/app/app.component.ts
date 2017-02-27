import { Component } from '@angular/core';
import { Todoservice } from './services/tasks.services';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [Todoservice],
})
export class AppComponent { }