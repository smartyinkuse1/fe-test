import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { Card } from './card.model';
import * as fromCard from "./state/card.reducer";
import * as  CardActions from './state/card.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  form: FormGroup
  submit: boolean = false;
  completeAdd: boolean = false
  cards$: Observable<Card[]>
  constructor(
    private store: Store<fromCard.AppState>
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      number: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      holder: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      expiry: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required,  Validators.maxLength(4), Validators.pattern("[1-9][0-9]{3}")]
      }),
      cvv: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.minLength(3), Validators.maxLength(3)]
      }),
      amount: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)]
      })
    })
  }
  onSubmit() {
    this.submit = true
    let currentDate = new Date().getFullYear()
    if (!this.form.valid) {
      return
    }
    if (this.form.value.expiry<currentDate) {
      alert("Enter a Future year");
      return
    }

    const cardValue: Card = {
      number: this.form.value.number,
      holder: this.form.value.holder,
      cvv: this.form.value.cvv,
      amount: this.form.value.amount,
      expiry: new Date(this.form.value.expiry, 0)
    }
    this.store.dispatch(new CardActions.CreateCard(cardValue));
    this.form.reset()
    this.submit = false
    this.completeAdd = true
  }

}
