import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Card } from '../home/card/card.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  //No real Database to Add new Cards, So there's isn't a fully persistent Storage
  private id = 2
  private cards = new BehaviorSubject<Card[]>([
    {
      id: 1,
      number: '12345',
      holder: 'Test Card',
      expiry: new Date(),
      cvv: 'string',
      amount: 100
    }
  ])
  constructor() { }
  getCards() {
    return this.cards.asObservable()
  }
  createCard(card) {
    // Simulate Http request Obseverbles
    const newCard = {...card, id: this.id}
    console.log(newCard);
    this.id++
   return of(newCard)
  }
}
