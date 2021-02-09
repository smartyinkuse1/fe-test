import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Card } from '../home/card/card.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  //No real Database to Add new Cards, So there's isn't a fully persistent Storage
  private id = 1
  constructor() { }

  createCard(card) {
    // Simulate Http Post request Obseverbles
    const newCard = {...card, id: this.id}
    this.id++
    //Simulate successful HttpRequest
   return of(newCard)
  }
}
