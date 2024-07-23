import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [CommonModule, AboutUsRoutingModule, ButtonModule],
  exports: [],
  providers: [],
})
export class AboutUsModule {}
