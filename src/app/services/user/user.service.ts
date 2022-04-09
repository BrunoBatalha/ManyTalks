import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { StorageService } from 'src/app/services/storage/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { BaseService } from '../base.service';

@Injectable({
	providedIn: 'root',
})
export class UserService extends BaseService<User> {
	constructor(database: AngularFireDatabase, private storageService: StorageService) {
		super(database);
	}

	insertUser(user: User): Observable<User> {
		return new Observable<User>((subscriber): void => {
			const userKey = uuidv4();
			const userPrivate = {
				id: uuidv4(),
				...user,
			};
			const pathsToUpdate = {
				[`users/private/${userKey}`]: userPrivate,
				[`users/public/${userKey}`]: user,
			};

			this.updateMany(pathsToUpdate).then((): void => {
				subscriber.next({ key: userKey, ...userPrivate });
			});
		});
	}

	isLogged(): boolean {
		return !!this.storageService.get('user');
	}

	saveInStorage(user: User): boolean {
		return this.storageService.set('user', user);
	}

	getFromStorage(): User {
		return this.storageService.get('user') as User;
	}
}
