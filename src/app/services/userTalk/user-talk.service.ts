import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Talk } from 'src/app/models/Talk';
import { User } from 'src/app/models/User';
import { UserTalk } from 'src/app/models/UserTalk';
import { UserTalkClient } from 'src/app/models/UserTalkClient';
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

	insertUserTalk(...users: User[]): Observable<string> {
		return new Observable<string>((subscriber): void => {
			const talkKey = uuidv4();
			const pathsUserTalks = this.generatePathsUserTalksToUpdate(users);

			const pathsToUpdate = { [`${this.userTalksPath}/${talkKey}`]: pathsUserTalks };
			this.updateMany(pathsToUpdate).then((): void => {
				subscriber.next(talkKey);
			});
		});
	}

	private generatePathsUserTalksToUpdate(users: User[]): { [k: string]: object } {
		return users.reduce((acc, user) => {
			return { ...acc, ...{ [user.key as string]: this.valueUserTalkId, [`${user.key}_name`]: user.username } };
		}, {});
	}

	filterByUserKey(userKey: string | undefined): Observable<UserTalkClient[]> {
		return this.filterBy(this.userTalksPath, userKey, this.valueUserTalkId).pipe(
			map((snap) => {
				return snap.map((s) => {
					const payload = s.payload.val() as { [k: string]: string };
					const usernameNotCurrentUser = Object.keys(payload).reduce((acc, key) => {
						if (key.includes('_name') && !key.includes(`${userKey}_name`)) {
							return payload[`${key}`];
						} else {
							return acc;
						}
					}, '');
					return {
						key: s.payload.key,
						username: usernameNotCurrentUser,
					} as UserTalkClient;
				});
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
