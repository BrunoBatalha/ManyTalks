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
	private usersPrivatePath = 'users/private';
	private usersPublicPath = 'users/public';
	private userStorage = 'user';

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
				[`${this.usersPrivatePath}/${userKey}`]: userPrivate,
				[`${this.usersPublicPath}/${userKey}`]: user,
			};

			this.updateMany(pathsToUpdate).then((): void => {
				subscriber.next({ key: userKey, ...userPrivate });
			});
		});
	}

	isLogged(): boolean {
		return !!this.storageService.get(this.userStorage);
	}

	saveInStorage(user: User): boolean {
		return this.storageService.set(this.userStorage, user);
	}

	getFromStorage(): User | null {
		const user = this.storageService.get(this.userStorage);
		if (user == null) {
			return null;
		}
		return user as User;
	}
}
