import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { TalkService } from 'src/app/services/talk/talk.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: [],
})
export class ChatComponent implements OnInit {
	messages: Message[] = [];
	text: string = '';
	talkKey: string = '';

	constructor(
		private talkService: TalkService,
		private userService: UserService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.talkKey = params['id'];
			this.talkService.listMessages(this.talkKey).subscribe((messages) => {
				this.messages = messages.reverse();
			});
		});
	}

	onInputMessage($event: any): void {
		this.text = $event.target.textContent;
	}

	sendMessage(): void {
		this.talkService.sendMessage(this.talkKey, this.text, this.userService.getFromStorage()?.key as string).subscribe();
	}

	trackByMessages(_: number, message: Message): string {
		return message.key;
	}
}
