import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { URL } from 'src/app/shared/constants';

@Component({
	selector: 'app-talk-row',
	templateUrl: './talk-row.component.html',
	styleUrls: ['./talk-row.component.css'],
})
export class TalkRowComponent {
	@Input()
	name: string = '';

	@Input()
	key: string = '';

	constructor(private router: Router) {}

	openTalk(): void {
		this.router.navigate([URL.CHAT, this.key]);
	}
}
