import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from './card/card.component';
import { StoreModule } from '@ngrx/store';
import { cardReducer } from './card/state/card.reducer';
import { CardEffect } from './card/state/card.effects'

import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature("cards", cardReducer),
    EffectsModule.forFeature([CardEffect])

  ]
})
export class HomeModule { }
