import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { UserPublicService } from 'src/app/services/userPublic/user-public.service';
import { UserTalkService } from 'src/app/services/userTalk/user-talk.service';
import { URL } from 'src/app/shared/constants';

@Component({
	selector: 'app-talks',
	templateUrl: './talks.component.html',
	styleUrls: [],
})
export class TalksComponent implements OnInit {
	urlChat: string = URL.CHAT;
	usernameToTalk: string = '';
	currentUser: User | null = null;
	talks: string[] = [];

	constructor(
		private userService: UserService,
		private userPublicService: UserPublicService,
		private userTalkService: UserTalkService,
		private router: Router
	) {
		this.loadUser();
	}

	ngOnInit(): void {
		this.listTalks();
	}

	loadUser(): void {
		if (this.userService.isLogged()) {
			this.currentUser = this.userService.getFromStorage();
		} else {
			const user: User = {
				username: 'Batalha',
				// username: new Date().getTime().toString(),
			};
			this.userService.insertUser(user).subscribe((user): void => {
				const isSaved = this.userService.saveInStorage(user);
				if (isSaved) {
					this.currentUser = user;
				}
			});
		}
	}

	createTalk(): void {
		this.userPublicService.filterByUsername(this.usernameToTalk).subscribe((userFound: User | null) => {
			if (userFound != null) {
				this.userTalkService.getUserTalk(this.currentUser?.key, userFound.key).subscribe((_) => {
					console.log(_);
					if (_ === null) {
						this.userTalkService.insertUserTalk(this.currentUser?.key, userFound.key).subscribe((z) => {
							console.log(z);
						});
					}
				});

				// this.router.navigate(['chat']);
			} else {
				alert('Não encontrado');
			}
		});
	}

	listTalks(): void {
		this.userTalkService.filterUserTalksByKey(this.currentUser?.key).subscribe((o) => {
			this.talks = o;
		});
	}

	trackByTalks(index: number): number {
		return index;
	}
}
