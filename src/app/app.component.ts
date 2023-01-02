import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { User } from './user.model';
import { UserRepository } from './user.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'elf-store-problem';

  users$: Observable<User[]> | undefined;
  activeUser$: Observable<User | undefined> | undefined;

  selectedUserId = 1;

  constructor(private userRepository: UserRepository) {}

  ngOnInit() {
    this.users$ = this.userRepository.users$;
    this.activeUser$ = this.userRepository
      .getActiveUser()
      .pipe(tap((_) => console.log('active user changed')));
    this.userRepository.updateUsers(this.randomUserList);
  }

  setActive() {
    this.userRepository.setActiveUser(this.selectedUserId.toString());
  }

  reloadData() {
    this.userRepository.updateUsers(this.randomUserList);
  }

  randomUserList: User[] = [
    {
      id: '1',
      name: 'User1',
    },
    {
      id: '2',
      name: 'User2',
    },
    {
      id: '3',
      name: 'User3',
    },
  ];
}
