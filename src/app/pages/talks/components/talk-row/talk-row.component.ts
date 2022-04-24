import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { URL } from 'src/app/shared/constants';
import { setTalkWithUser } from 'src/app/store/chat.state';

@Component({
	selector: 'app-talk-row',
	templateUrl: './talk-row.component.html',
	styleUrls: ['./talk-row.component.css'],
})
export class TalkRowComponent {
	@Input() name: string = '';
	@Input() key: string = '';

	constructor(private router: Router, private store: Store) {}

	openTalk(): void {
		this.store.dispatch(
			setTalkWithUser({
				user: {
					username: this.name,
					key: this.key,
				},
			})
		);
		this.router.navigate([URL.CHAT, this.key]);
	}
}
