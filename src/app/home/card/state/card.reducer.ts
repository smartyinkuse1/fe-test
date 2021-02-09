import * as CardActions from './card.action';
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromRoot from "../../../state/app-state";
import { Card } from '../card.model';

export interface CardState extends EntityState<Card> {
  selectedCardId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}
export interface AppState extends fromRoot.AppState {
  Cards: CardState;
}
export const cardAdapter: EntityAdapter<Card> = createEntityAdapter<
  Card
>();

export const defaultCard: CardState = {
  ids: [],
  entities: {},
  selectedCardId: null,
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = cardAdapter.getInitialState(defaultCard);

export function cardReducer(
  state = initialState,
  action: CardActions.Actions
): CardState {
  switch (action.type) {
    case CardActions.CardActionTypes.CREATE_CARD_SUCCESS: {
      alert("Card Added Successfully")
      return cardAdapter.addOne(action.payload, state);
    }
    case CardActions.CardActionTypes.CREATE_CARD_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }


    default: {
      return state;
    }
  }
}

const getCardFeatureState = createFeatureSelector<CardState>(
  "cards"
);

export const getCards = createSelector(
  getCardFeatureState,
  cardAdapter.getSelectors().selectAll
);

export const getCardsLoading = createSelector(
  getCardFeatureState,
  (state: CardState) => state.loading
);

export const getCardsLoaded = createSelector(
  getCardFeatureState,
  (state: CardState) => state.loaded
);

export const getError = createSelector(
  getCardFeatureState,
  (state: CardState) => state.error
);

export const getCurrentCardId = createSelector(
  getCardFeatureState,
  (state: CardState) => state.selectedCardId
);
export const getCurrentCard = createSelector(
  getCardFeatureState,
  getCurrentCardId,
  state => state.entities[state.selectedCardId]
);
