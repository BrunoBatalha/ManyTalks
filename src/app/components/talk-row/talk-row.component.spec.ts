import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TalkRowComponent } from './contact-row.component';


describe('ContactRowComponent', () => {
	let component: TalkRowComponent;
	let fixture: ComponentFixture<TalkRowComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TalkRowComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TalkRowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
