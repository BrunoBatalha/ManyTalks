import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { GenerateGuid } from 'src/app/shared/utils';
import { BaseService } from '../base.service';

@Injectable({
	providedIn: 'root',
})
export class TalkService extends BaseService<Message> {
	private talksPath = 'talks';

	constructor(database: AngularFireDatabase) {
		super(database);
	}

	sendMessage(talkKey: string, text: string, userKey: string): Observable<void> {
		const message: Message = {
			key: GenerateGuid(),
			fromUser: userKey,
			text: text,
			timestamp: -new Date().getTime(),
		};

		const path = { [`${this.talksPath}/${talkKey}/${message.key}`]: message };
		return this.updateMany$(path);
	}

	listMessages(talkKey: string): Observable<Message[]> {
		return this.filterByPathAndOrderBy(`${this.talksPath}/${talkKey}`, 'timestamp').pipe(
			map((talk) => {
				if (talk.length) {
					return talk;
				}
				return [];
			})
		);
	}
}
