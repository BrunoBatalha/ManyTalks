import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-image-rounded',
	templateUrl: './image-rounded.component.html',
	styleUrls: ['./image-rounded.component.css'],
})
export class ImageRoundedComponent implements OnInit {
	@Input() srcImage!: string;
	constructor() {}

	ngOnInit(): void {}
}
