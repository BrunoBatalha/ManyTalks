import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
	selector: 'app-message-balloon',
	templateUrl: './message-balloon.component.html',
	styleUrls: ['./message-balloon.component.css'],
})
export class MessageBalloonComponent implements OnInit {
	@Input() text: string = '';
	@Input() fromUserKey: string = '';

	styles: { isLoggedUser: boolean } = {
		isLoggedUser: false,
	};

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.userService.getLoggedUser().subscribe((user) => {
			this.styles.isLoggedUser = !!(user && user.key === this.fromUserKey);
		});
	}
}
