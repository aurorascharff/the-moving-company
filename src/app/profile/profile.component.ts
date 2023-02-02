import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../store/selectors/data.selectors';
import { UserActions } from '../store/actions/data.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(UserActions.loadUserData());
  }
}
