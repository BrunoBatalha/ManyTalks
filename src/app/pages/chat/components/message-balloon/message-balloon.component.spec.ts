import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { MessageBalloonComponent } from './message-balloon.component';

describe('MessageBalloonComponent', () => {
	let userServiceSpy: jasmine.SpyObj<UserService>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MessageBalloonComponent],
			providers: [{ provide: UserService, useValue: jasmine.createSpyObj('UserService', ['getLoggedUser']) }],
		}).compileComponents();

		userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
	});

	it('should create', () => {
		userServiceSpy.getLoggedUser.and.returnValue(of(null));
		const { component } = createComponent();

		expect(component).toBeTruthy();
	});

	it('should be #styles.isLoggedUser false', () => {
		userServiceSpy.getLoggedUser.and.returnValue(of(null));
		const { component } = createComponent();

		expect(component.styles.isLoggedUser).toBe(false);
	});

	it('should be #styles.isLoggedUser true', () => {
		userServiceSpy.getLoggedUser.and.returnValue(of({ username: 'name', key: 'key' } as User));

		const { component } = createComponent();
		component.fromUserKey = 'key';
		component.ngOnInit();

		expect(component.styles.isLoggedUser).toBe(true);
	});

	it('should be used class corresponding to #styles.isLoggedUser equal to false', () => {
		userServiceSpy.getLoggedUser.and.returnValue(of(null));
		const { component, fixture } = createComponent();

		component.styles.isLoggedUser = false;
		fixture.detectChanges();

		const div = fixture.debugElement.query(By.css('.message-balloon__wrapper'));

		expect(JSON.stringify(div.classes)).toContain('message-balloon__wrapper--default');
	});

	it('should be used class corresponding to #styles.isLoggedUser equal to true', () => {
		userServiceSpy.getLoggedUser.and.returnValue(of(null));
		const { component, fixture } = createComponent();

		component.styles.isLoggedUser = true;
		fixture.detectChanges();

		const div = fixture.debugElement.query(By.css('.message-balloon__wrapper'));

		expect(JSON.stringify(div.classes)).toContain('message-balloon__wrapper--right');
		expect(JSON.stringify(div.classes)).toContain('message-balloon__wrapper--logged-user');
	});

	it('should be render text', () => {
		userServiceSpy.getLoggedUser.and.returnValue(of(null));
		const { component, fixture } = createComponent();

		component.text = 'text test';
		fixture.detectChanges();

		const div = fixture.debugElement.query(By.css('span'));
		expect(div.nativeElement['innerHTML']).toBe('text test');
	});

	function createComponent(): {
		fixture: ComponentFixture<MessageBalloonComponent>;
		component: MessageBalloonComponent;
	} {
		const fixture = TestBed.createComponent(MessageBalloonComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();

		return { fixture, component };
	}
});
