import { Injectable } from '@angular/core';

import { Actions, Effect, ofType} from '@ngrx/effects'
import { Action } from '@ngrx/store';

import { Observable, of}  from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { PaymentService } from '../../../services/payment.service'
import * as cardActions from './card.action';
import { Card } from '../card.model'

@Injectable()
export class CardEffect {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService
  ) {}
  @Effect()
  loadCards$:Observable<Action> = this.actions$.pipe(
    ofType<cardActions.LoadCards>(cardActions.CardActionTypes.LOAD_CARDS),
    mergeMap((actions: cardActions.LoadCards)=>
      this.paymentService.getCards().pipe(
        map(
          (cards: Card[])=>
          new cardActions.LoadCardsSuccess(cards)
        ),
        catchError(err=> of(new cardActions.LoadCardsFail(err)))
      )
    )
  )
  @Effect()
  createCard$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.CreateCard>(
      cardActions.CardActionTypes.CREATE_CARD
    ),
    map((action: cardActions.CreateCard) => action.payload),
    mergeMap((card: Card) =>
      this.paymentService.createCard(card).pipe(
        map(
          (newCard: Card) =>
            new cardActions.CreateCardSuccess(newCard)
        ),
        catchError(err => of(new cardActions.CreateCardFail(err)))
      )
    )
  );
}
