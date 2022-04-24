import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TalkInputButtonComponent } from './talk-input-button.component';


describe('TalkInputButtonComponent', () => {
	let component: TalkInputButtonComponent;
	let fixture: ComponentFixture<TalkInputButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TalkInputButtonComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TalkInputButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
