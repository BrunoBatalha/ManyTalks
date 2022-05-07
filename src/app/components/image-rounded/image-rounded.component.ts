import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-image-rounded',
	templateUrl: './image-rounded.component.html',
	styleUrls: ['./image-rounded.component.css'],
})
export class ImageRoundedComponent {
	@Input() srcImage!: string;
}
