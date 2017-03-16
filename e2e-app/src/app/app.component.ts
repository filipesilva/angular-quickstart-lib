import { Component } from '@angular/core';
import { LibService } from 'angular-quickstart-lib';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <my-lib></my-lib>
  `,
})
export class AppComponent {
  name = 'Angular';
  constructor(libService: LibService) {
    console.log(libService.getMeaning());
  }
}
