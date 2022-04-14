import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserTalkService } from 'src/app/services/userTalk/user-talk.service';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-talk-list',
  templateUrl: './talk-list.component.html',
  styleUrls: ['./talk-list.component.css'],
})
export class TalkListComponent implements OnInit {
  talkKeys: string[] = [];

  constructor(private store: Store<{ app: IAppState }>, private userTalkService: UserTalkService) { }

  ngOnInit(): void {
    this.store.select('app').pipe(map(s => s.user)).subscribe(user => {
      if (user) {
        this.listTalks(user);
      }
    });

  }

  listTalks(user: User): void {
    if (user != null) {
      this.userTalkService.filterByUserKey(user.key).subscribe((talkKeys) => {
        this.talkKeys = talkKeys;
      });
    }
  }

  trackByTalks(index: number): number {
		return index;
	}
}
