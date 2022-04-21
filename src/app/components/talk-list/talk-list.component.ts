import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { UserTalkClient } from 'src/app/models/UserTalkClient';
import { UserTalkService } from 'src/app/services/userTalk/user-talk.service';
import { selectLoadUser } from 'src/app/store/app.state';

@Component({
	selector: 'app-talk-list',
	templateUrl: './talk-list.component.html',
	styleUrls: ['./talk-list.component.css'],
})
export class TalkListComponent implements OnInit {
	userTalkClients: UserTalkClient[] = [];
	user$ = this.store.select(selectLoadUser);

	constructor(private store: Store, private userTalkService: UserTalkService) {}

	ngOnInit(): void {
		this.user$.subscribe((user) => {
			if (user) {
				this.listTalks(user);
			}
		});
	}

	listTalks(user: User): void {
		if (user != null) {
			this.userTalkService.filterByUserKey(user.key).subscribe((talkKeys) => {
				this.userTalkClients = talkKeys;
			});
		}
	}

	trackByTalks(index: number): number {
		return index;
	}
}
