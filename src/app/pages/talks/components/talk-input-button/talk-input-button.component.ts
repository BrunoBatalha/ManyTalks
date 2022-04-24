import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FaetherIcon } from 'src/app/shared/utils';

@Component({
	selector: 'app-talk-input-button[icon][clickButton]',
	templateUrl: './talk-input-button.component.html',
	styleUrls: ['./talk-input-button.component.css'],
})
export class TalkInputButtonComponent implements OnInit {
	@Output() clickButton = new EventEmitter<string>();
	@Input() icon!: string;

	ngOnInit(): void {
		FaetherIcon().replace();
	}
}
