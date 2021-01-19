import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as cardActions from './home/card/state/card.action';
import { Observable } from 'rxjs';
import { Card } from './home/card/card.model';
import * as fromCard from './home/card/state/card.reducer'
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fe-test';
  showApp = true
  cards$: Observable<Card[]>
  constructor (private store:Store<fromCard.AppState>, private router: Router) {}
  ngOnInit() {
    this.store.dispatch(new cardActions.LoadCards());
    this.cards$ = this.store.pipe(select(fromCard.getCards))
    this.router.events.subscribe((val:any)=> {
      if (val instanceof NavigationEnd) {
        if (val?.url === "/home") {
          this.showApp = false
        }else {
          this.showApp = true
        }

      }

    })
  }
}
