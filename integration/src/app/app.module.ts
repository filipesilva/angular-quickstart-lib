import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LibModule, LibService } from 'angular-quickstart-lib';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, LibModule],
  declarations: [ AppComponent ],
  providers:    [ LibService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
