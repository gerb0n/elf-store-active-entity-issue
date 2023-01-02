import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
    selectActiveEntity,
    selectAllEntities,
    selectEntitiesCount,
    setActiveId,
    upsertEntities,
    withActiveId,
    withEntities,
} from '@ngneat/elf-entities';

import { User } from './user.model';

const userStore = createStore(
  { name: 'users' },
  withEntities<User>(),
  withActiveId()
);

@Injectable({ providedIn: 'root' })
export class UserRepository {
  count$ = userStore.pipe(selectEntitiesCount());
  users$ = userStore.pipe(selectAllEntities());

  updateUsers(users: User[]) {
    if (users) {
      //This will also trigger the activeId whilst i'm not updating the activeId using setActiveId and I think this is a issue
      userStore.update(upsertEntities(users));
    }
  }

  setActiveUser(userId: string) {
    userStore.update(setActiveId(userId));
  }

  getActiveUser() {
    return userStore.pipe(selectActiveEntity());
  }
}
