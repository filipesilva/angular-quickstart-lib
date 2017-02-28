import { NgModule } from '@angular/core';

import { LibComponent } from './lib.component';
import { LibService } from './lib.service';

@NgModule({
  declarations: [LibComponent],
  providers: [LibService],
  exports: [LibComponent]
})
export class LibModule { }
