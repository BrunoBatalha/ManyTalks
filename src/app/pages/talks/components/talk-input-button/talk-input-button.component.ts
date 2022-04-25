import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { FaetherIcon } from 'src/app/shared/utils';

@Component({
	selector: 'app-talk-input-button[icon][clickButton]',
	templateUrl: './talk-input-button.component.html',
	styleUrls: ['./talk-input-button.component.css'],
})
export class TalkInputButtonComponent implements DoCheck {
	@Output() clickButton = new EventEmitter<string>();
	@Input() icon!: string;
	@Input() placeholder!: string;

	ngDoCheck(): void {
		FaetherIcon().replace();
	}
}
