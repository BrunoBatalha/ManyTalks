import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { InputMessageComponent } from './input-message.component';

describe('InputMessageComponent', () => {
	let component: InputMessageComponent;
	let fixture: ComponentFixture<InputMessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InputMessageComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InputMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be structure html div > div > pre', () => {
		const pre = fixture.debugElement.query(By.css('div > div > pre'));

		expect(pre).toBeTruthy();
	});

	it('should be clear input', () => {
		const subject = new Subject<void>();
		component.clearInput$ = subject.asObservable();
		component.ngOnInit();

		let pre: HTMLElement = fixture.debugElement.query(By.css('div > div > pre')).nativeElement;
		pre.innerHTML = 'new content';

		expect(pre.innerHTML).withContext('after fill input').toBe('new content');

		subject.next();

		pre = fixture.debugElement.query(By.css('div > div > pre')).nativeElement;
		expect(pre.innerHTML).withContext('after clear input').toBe('');
	});

	it('should be call #onInputMessage', () => {
		const pre: HTMLElement = fixture.debugElement.query(By.css('pre')).nativeElement;
		spyOn(component, 'onInputMessage').and.callThrough();

		pre.dispatchEvent(new Event('input'));

		expect(component.onInputMessage).toHaveBeenCalledTimes(1);
	});
});
