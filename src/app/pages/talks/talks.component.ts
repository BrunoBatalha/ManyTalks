import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Faether from 'feather-icons';
import { concatMap, map, of, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserTalkClient } from 'src/app/models/UserTalkClient';
import { UserService } from 'src/app/services/user/user.service';
import { UserPublicService } from 'src/app/services/userPublic/user-public.service';
import { UserTalkService } from 'src/app/services/userTalk/user-talk.service';
import { ERROR, URL } from 'src/app/shared/constants';
import { selectLoadUser, setUser } from 'src/app/store/app.state';
import { setTalkWithUser } from 'src/app/store/chat.state';

@Component({
	selector: 'app-talks',
	templateUrl: './talks.component.html',
	styleUrls: ['./talks.component.css'],
})
export class TalksComponent implements OnInit, DoCheck {
	urlChat: string = URL.CHAT;
	usernameToTalk: string = '';
	currentUser!: User;
	usernameToCreate!: string;
	userTalkClients: UserTalkClient[] = [];
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
	ngDoCheck(): void {
		Faether.replace();
	}

	ngOnInit(): void {
		this.listTalks();
	}

	private loadUser(): void {
		this.userService.getLoggedUser().subscribe((loggedUser) => {
			if (loggedUser?.key != null) {
				this.checkExistsUser(loggedUser);
			}
		});
	}

	private checkExistsUser(loggedUser: User): void {
		if (loggedUser.key == undefined) {
			return;
		}

		this.userPublicService.getUserByKey(loggedUser.key).subscribe((user) => {
			if (user != null) {
				this.setUser(loggedUser);
			}
		});
	}

	createUser(usernameToCreate: string): void {
		this.userService.insertUser({ username: usernameToCreate }).subscribe((user): void => {
			this.userService.saveInStorage(user);
			this.setUser(user);
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
					return this.userTalkService.insertUserTalk(this.currentUser, resultGetUserTalk.userFound);
				})
			)
			.subscribe({
				next: (userTalkKey) => {
					this.store.dispatch(
						setTalkWithUser({
							user: {
								username: this.usernameToTalk,
								key: userTalkKey,
							},
						})
					);
					this.router.navigate([URL.CHAT, userTalkKey]);
				},
				error: (err) => {
					if (err == ERROR.NOT_FOUND_USER) {
						alert('Usuário não encontrado');
					} else {
						console.error('ERRO:');
						console.error(err);
					}
				},
			});
	}

	private setUser(user: User): void {
		this.store.dispatch(setUser({ user }));
	}

	listTalks(): void {
		if (this.currentUser != null) {
			this.userTalkService.filterByUserKey(this.currentUser?.key).subscribe((talkKeys) => {
				this.userTalkClients = talkKeys;
			});
		}
	}

	trackByTalks(index: number): number {
		return index;
	}
}
