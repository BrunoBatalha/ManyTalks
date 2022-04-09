import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { BaseService } from '../base.service';

@Injectable({
	providedIn: 'root',
})
export class UserPublicService extends BaseService<User> {
	private usersPublicPath = 'users/public';

	constructor(database: AngularFireDatabase) {
		super(database);
	}

	getUserByKey(key: string): Observable<User | null> {
		return this.filterByKey(this.usersPublicPath, key).pipe(
			map((users) => {
				if (users.length > 0) {
					return users[0];
				} else {
					return null;
				}
			})
		);
	}

	filterByUsername(username: string): Observable<User | null> {
		return new Observable<User | null>((subscriber) => {
			this.filterBy(this.usersPublicPath, 'username', username).subscribe((observer) => {
				if (observer.length > 0) {
					const user = observer[0].payload.val() as User;
					subscriber.next({ key: observer[0].key, ...user } as User);
				} else {
					subscriber.next(null);
				}
			});
		});
	}
}
