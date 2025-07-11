import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfinityPageRoutingModule } from './infinity-routing.module';

import { InfinityPage } from './infinity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfinityPageRoutingModule
  ],
})
export class InfinityPageModule {}
