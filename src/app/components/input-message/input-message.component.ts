import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-input-message',
	templateUrl: './input-message.component.html',
	styleUrls: ['./input-message.component.css'],
})
export class InputMessageComponent {
	@Output() inputMessage = new EventEmitter<string>();

	onInputMessage($event: any): void {
		this.inputMessage.emit($event.target.textContent);
	}
}
