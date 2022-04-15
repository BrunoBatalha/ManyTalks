import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concatMap, map, of, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { UserPublicService } from 'src/app/services/userPublic/user-public.service';
import { UserTalkService } from 'src/app/services/userTalk/user-talk.service';
import { ERROR, URL } from 'src/app/shared/constants';
import { selectLoadUser, setUser } from 'src/app/store/app.state';

@Component({
	selector: 'app-talks',
	templateUrl: './talks.component.html',
	styleUrls: [],
})
export class TalksComponent implements OnInit {
	urlChat: string = URL.CHAT;
	usernameToTalk: string = '';
	currentUser: User | null = null;
	talkKeys: string[] = [];
	user$ = this.store.select(selectLoadUser);

	constructor(
		private userService: UserService,
		private userPublicService: UserPublicService,
		private userTalkService: UserTalkService,
		private router: Router,
		private store: Store
	) {
		this.loadUser();

		this.user$.subscribe((user) => {
			if (user) {
				this.userService.saveInStorage(user);
				this.currentUser = user;
				this.listTalks();
			}
		});
	}

	ngOnInit(): void {
		this.listTalks();
	}

	loadUser(): void {
		this.userService.getLoggedUser().subscribe((loggedUser) => {
			if (loggedUser?.key == null) {
				this.createUser();
			} else {
				this.checkExistsUser(loggedUser);
			}
		});
	}

	checkExistsUser(loggedUser: User): void {
		if (loggedUser.key == undefined) {
			return;
		}

		this.userPublicService.getUserByKey(loggedUser.key).subscribe((user) => {
			if (user != null) {
				this.setUser(loggedUser);
			} else {
				this.createUser();
			}
		});
	}

	private createUser(): void {
		fetch('https://random-word-api.herokuapp.com/word').then(async (response) => {
			const user: User = {
				username: (await response.json())[0],
			};
			this.userService.insertUser(user).subscribe((user): void => {
				this.userService.saveInStorage(user);
				this.setUser(user);
			});
		});
	}

	createTalk(): void {
		this.userPublicService
			.filterByUsername(this.usernameToTalk)
			.pipe(
				concatMap((userFound: User | null) => {
					if (userFound === null) {
						return throwError(() => ERROR.NOT_FOUND_USER);
					}

					return this.userTalkService.getKeyByUserKeys(this.currentUser?.key, userFound.key).pipe(
						map((userTalkKey) => ({
							userTalkKey: userTalkKey,
							userFound: userFound,
						}))
					);
				}),
				concatMap((resultGetUserTalk) => {
					if (resultGetUserTalk?.userTalkKey !== null) {
						return of(resultGetUserTalk.userTalkKey);
					}
					return this.userTalkService.insertUserTalk(this.currentUser?.key, resultGetUserTalk.userFound.key);
				})
			)
			.subscribe({
				next: (userTalkKey) => {
					this.router.navigate([URL.CHAT, userTalkKey]);
				},
				error: (err) => {
					if (err == ERROR.NOT_FOUND_USER) {
						alert('Usuário não encontrado');
					} else {
						alert('error desconhecido: ' + err);
					}
				},
			});
	}

	setUser(user: User): void {
		this.store.dispatch(setUser({ user }));
	}

	listTalks(): void {
		if (this.currentUser != null) {
			this.userTalkService.filterByUserKey(this.currentUser?.key).subscribe((talkKeys) => {
				this.talkKeys = talkKeys;
			});
		}
	}

	trackByTalks(index: number): number {
		return index;
	}
}
