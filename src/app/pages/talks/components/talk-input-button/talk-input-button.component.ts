import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Faether from 'feather-icons';

@Component({
	selector: 'app-talk-input-button[icon][clickButton]',
	templateUrl: './talk-input-button.component.html',
	styleUrls: ['./talk-input-button.component.css'],
})
export class TalkInputButtonComponent implements DoCheck, OnInit {
	@Output() clickButton = new EventEmitter<string>();
	@Input() icon!: string;
	@Input() placeholder!: string;
	ngOnInit(): void {
		Faether.replace();
	}

	ngDoCheck(): void {
		Faether.replace();
	}
}
