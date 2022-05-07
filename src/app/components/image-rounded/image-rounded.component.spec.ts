import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageRoundedComponent } from './image-rounded.component';

describe('ImageRoundedComponent', () => {
	let component: ImageRoundedComponent;
	let fixture: ComponentFixture<ImageRoundedComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ImageRoundedComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageRoundedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be contain a div', () => {
		const div = fixture.debugElement.query(By.css('div'));
		expect(div).toBeTruthy();
	});

	it('should be contain a div with an image', () => {
		const div = fixture.debugElement.query(By.css('div'));
		const img = div.query(By.css('img'));
		expect(img).toBeTruthy();
	});

	it('should be set source in image tag', () => {
		const srcImage = 'pathImage';
		component.srcImage = srcImage;
		fixture.detectChanges();

		const img = fixture.debugElement.query(By.css('img'));
		expect(img.attributes['src']).toBe(srcImage);
	});
});
