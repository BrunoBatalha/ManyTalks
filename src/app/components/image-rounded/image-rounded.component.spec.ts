import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
