import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Talk } from 'src/app/models/Talk';
import { UserTalk } from 'src/app/models/UserTalk';
import { v4 as uuidv4 } from 'uuid';
import { BaseService } from '../base.service';

@Injectable({
	providedIn: 'root',
})
export class UserTalkService extends BaseService<Talk> {
	private userTalksPath = 'userTalks';
	private valueUserTalkId = '_userKey_';

	constructor(database: AngularFireDatabase) {
		super(database);
	}

	insertUserTalk(...userKeys: Array<string | undefined | null>): Observable<string> {
		return new Observable<string>((subscriber): void => {
			const talkKey = uuidv4();
			const pathsUserTalks = this.generatePathsUserTalksToUpdate(userKeys);

			const pathsToUpdate = { [`${this.userTalksPath}/${talkKey}`]: pathsUserTalks };
			this.updateMany(pathsToUpdate).then((): void => {
				subscriber.next(talkKey);
			});
		});
	}

	private generatePathsUserTalksToUpdate(userKeys: Array<string | null | undefined>): { [k: string]: object } {
		return userKeys.reduce((acc, userKey) => {
			const userTalk = { [userKey as string]: this.valueUserTalkId };
			return { ...acc, ...userTalk };
		}, {});
	}

	filterByUserKey(userKey: string | undefined): Observable<string[]> {
		return this.filterBy(this.userTalksPath, userKey, this.valueUserTalkId).pipe(
			map((snap) => {
				return snap.map((s) => s.key as string);
			})
		);
	}

	getKeyByUserKeys(userKey: string | undefined, userKey2: string | undefined): Observable<string | null> {
		return this.filterBy(this.userTalksPath, userKey, this.valueUserTalkId).pipe(
			map((snap) => {
				if (snap.length > 0) {
					const userTalk = snap.find((s) => {
						return (s.payload.val() as UserTalk)[userKey2 as string] === this.valueUserTalkId;
					});
					if (userTalk) {
						return userTalk?.payload.key;
					}
				}
				return null;
			})
		);
	}
}
