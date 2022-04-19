import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Faether from 'feather-icons';
import { Message } from 'src/app/models/Message';
import { TalkService } from 'src/app/services/talk/talk.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewInit {
	@ViewChild('listMessages') refListMessages: ElementRef | null = null;
	@ViewChild('containerListMessages') refContainerListMessages: ElementRef | null = null;
	private scrollPositionYToAutomaticDown: number = 1200;
	private alreadyScrollFirstTime = false;
	messages: Message[] = [];
	text: string = '';
	talkKey: string = '';

	constructor(
		private talkService: TalkService,
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private location: Location
	) {}

	ngAfterViewInit(): void {
		Faether.replace();

		this.configureScrollAutomatic();
	}

	private configureScrollAutomatic(): void {
		const resizeObserver = new ResizeObserver(() => {
			if (this.refContainerListMessages != null && this.refListMessages != null) {
				const scrollHeightListMessages = this.refListMessages?.nativeElement.scrollHeight;
				const scrollPositionYContainerListMessages = this.refContainerListMessages.nativeElement.scrollTop;

				if (!this.alreadyScrollFirstTime && scrollHeightListMessages != 0) {
					this.alreadyScrollFirstTime = true;
					this.scrollDown();
				} else if (
					scrollHeightListMessages - scrollPositionYContainerListMessages <
					this.scrollPositionYToAutomaticDown
				) {
					this.scrollDown();
				}
			}
		});

		resizeObserver.observe(this.refListMessages?.nativeElement);
	}

	private scrollDown(): void {
		if (this.refContainerListMessages != null) {
			this.refContainerListMessages.nativeElement.scroll({
				top: this.refListMessages?.nativeElement.scrollHeight,
				left: 0,
				behavior: 'smooth',
			});
		}
	}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.talkKey = params['id'];
			this.talkService.listMessages(this.talkKey).subscribe((messages) => {
				this.messages = messages.reverse();
			});
		});
	}

	backPage(): void {
		this.location.back();
	}

	resizeListMessages(event: any) {
		console.log('teste');
	}

	onInputMessage(value: string): void {
		this.text = value;
	}

	sendMessage(): void {
		this.talkService.sendMessage(this.talkKey, this.text, this.userService.getFromStorage()?.key as string).subscribe();
	}

	trackByMessages(_: number, message: Message): string {
		return message.key;
	}
}
