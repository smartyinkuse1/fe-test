import { Action } from '@ngrx/store';
import { Card } from '../card.model';

export enum CardActionTypes {
  LOAD_CARDS = '[Card] Load Cards',
  LOAD_CARDS_SUCCESS = '[Card] Load Cards Success',
  LOAD_CARDS_FAIL = '[Card] Load Cards Fail',
  CREATE_CARD = "[Card] Create Card",
  CREATE_CARD_SUCCESS = "[Card] Create Card Success",
  CREATE_CARD_FAIL = "[Card] Create Card Fail",
}
export class LoadCards implements Action {
  readonly type = CardActionTypes.LOAD_CARDS
}
export class LoadCardsSuccess implements Action {
  readonly type = CardActionTypes.LOAD_CARDS_SUCCESS
  constructor(public payload:Card[]) {}
}
export class LoadCardsFail implements Action {
  readonly type = CardActionTypes.LOAD_CARDS_FAIL
  constructor(public payload: string) {}
}
export class CreateCard implements Action {
  readonly type = CardActionTypes.CREATE_CARD;

  constructor(public payload: Card) {}
}

export class CreateCardSuccess implements Action {
  readonly type = CardActionTypes.CREATE_CARD_SUCCESS;

  constructor(public payload: Card) {}
}

export class CreateCardFail implements Action {
  readonly type = CardActionTypes.CREATE_CARD_FAIL;

  constructor(public payload: string) {}
}

export type Actions = LoadCards | LoadCardsSuccess | LoadCardsFail | CreateCard | CreateCardSuccess | CreateCardFail
