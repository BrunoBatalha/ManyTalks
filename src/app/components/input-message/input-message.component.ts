import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-input-message',
	templateUrl: './input-message.component.html',
	styleUrls: ['./input-message.component.css'],
})
export class InputMessageComponent implements OnInit {
	@ViewChild('editable') refEditable: ElementRef | null = null;
	@Output() inputMessage = new EventEmitter<string>();
	@Input() clearInput$: Observable<void> | null = null;

	ngOnInit(): void {
		this.clearInput$?.subscribe(() => {
			this.clearInput();
		});
	}

	onInputMessage($event: any): void {
		this.inputMessage.emit($event.target.textContent);
	}

	clearInput(): void {
		if (this.refEditable != null) {
			this.refEditable.nativeElement.innerHTML = '';
		}
	}
}
