import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TalkRowComponent } from './talk-row.component';

describe('ContactRowComponent', () => {
	let component: TalkRowComponent;
	let fixture: ComponentFixture<TalkRowComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TalkRowComponent],
			providers: [
				{ provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
				{ provide: Store, useValue: jasmine.createSpyObj('Store', ['dispatch']) },
			],
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

	it('should be dispatch click', () => {
		const div: HTMLElement = fixture.debugElement.query(By.css('div')).nativeElement;
		spyOn(component, 'openTalk').and.callThrough();

		div.dispatchEvent(new Event('click'));

		expect(component.openTalk).toHaveBeenCalledTimes(1);
	});

	it('should be render name', () => {
		component.name = 'name';
		fixture.detectChanges();

		const span: HTMLElement = fixture.debugElement.query(By.css('span')).nativeElement;
		expect(span.innerHTML).toBe('name');
	});

	it('should be render tag app-image-rounded', () => {
		component.name = 'name';
		fixture.detectChanges();

		const tag = fixture.debugElement.query(By.css('app-image-rounded'));
		expect(tag).toBeTruthy();
	});
});
