import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Talk } from 'src/app/models/Talk';
import { v4 as uuidv4 } from 'uuid';
import { BaseService } from '../base.service';

@Injectable({
	providedIn: 'root',
})
export class UserTalkService extends BaseService<Talk> {
	constructor(database: AngularFireDatabase) {
		super(database);
	}

	insertUserTalk(...userKeys: Array<string | undefined | null>): Observable<string> {
		return new Observable<string>((subscriber): void => {
			const talkKey = uuidv4();
			const pathsUserTalks = userKeys.reduce((acc, userKey) => {
				const userTalk = { [userKey as string]: '_userKey_' };
				return { ...acc, ...userTalk };
			}, {});

			const pathsToUpdate = { [`userTalks/${talkKey}`]: pathsUserTalks };
			this.updateMany(pathsToUpdate).then((): void => {
				subscriber.next(talkKey);
			});
		});
	}

	filterByUserKey(userKey: string | undefined): Observable<string[]> {
		return this.filterBy('userTalks', userKey, '_userKey_').pipe(
			map((snap) => {
				return snap.map((s) => s.key as string);
			})
		);
	}

	getKeyByUserKeys(userKey: string | undefined, userKey2: string | undefined): Observable<string | null> {
		return new Observable((subscriber): void => {
			this.filterBy('userTalks', userKey, '_userKey_').subscribe((snap): void => {
				if (snap.length > 0) {
					const userTalk = snap.find(
						(s) => (s.payload.val() as { [g: string]: string })[userKey2 as string] === '_userKey_'
					);
					subscriber.next(userTalk?.payload.key);
				} else {
					subscriber.next(null);
				}
			});
		});
	}
	// listUserTalks(userKey: string, userKey2: string): Observable<string | null> {
	// 	return new Observable((subscriber): void => {
	// 		this.filterBy('/userTalks', userKey, '_userKey_').subscribe((snap): void => {
	// 			if (snap.length > 0) {
	// 				const userTalk = snap.find((s) => (s.payload.val() as { [g: string]: string })[userKey2] === '_userKey_');
	// 				subscriber.next(userTalk?.payload.key);
	// 			}
	// 		});
	// 	});
	// }
}
