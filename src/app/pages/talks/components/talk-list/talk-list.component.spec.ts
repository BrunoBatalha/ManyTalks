import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserTalkClient } from 'src/app/models/UserTalkClient';
import { UserTalkService } from 'src/app/services/userTalk/user-talk.service';
import { TalkListComponent } from './talk-list.component';

describe('TalkListComponent', () => {
	let store: jasmine.SpyObj<Store>;
	let userTalkService: jasmine.SpyObj<UserTalkService>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TalkListComponent],
			providers: [
				{ provide: Store, useValue: jasmine.createSpyObj('Store', ['select']) },
				{ provide: UserTalkService, useValue: jasmine.createSpyObj('UserTalkService', ['filterByUserKey']) },
			],
		}).compileComponents();

		store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
		userTalkService = TestBed.inject(UserTalkService) as jasmine.SpyObj<UserTalkService>;
	});

	it('should be create', () => {
		store.select.and.returnValue(of(null));
		const { component } = createComponent();

		expect(component).toBeTruthy();
	});

	it('should be not list talks when user not logged', () => {
		store.select.and.returnValue(of(null));
		const { component } = createComponent();
		spyOn(component, 'listTalks');

		expect(component.listTalks).not.toHaveBeenCalled();
		expect(component.userTalkClients).toHaveSize(0);
	});

	it('should be list talks and set userTalks', () => {
		const loggedUser: User = { key: 'key test', username: 'user' };
		const userTalks = [{ username: 'name 1' }, { username: 'name 2' }] as UserTalkClient[];
		store.select.and.returnValue(of(loggedUser));
		userTalkService.filterByUserKey.and.returnValue(of(userTalks));

		const { component } = createComponent();
		spyOn(component, 'listTalks');

		component.ngOnInit();

		expect(component.listTalks).toHaveBeenCalledOnceWith(loggedUser);
		expect(component.userTalkClients).toHaveSize(userTalks.length);
	});

	it('should be render 2 talk lines with corresponding properties', () => {
		const loggedUser: User = { key: 'key test', username: 'user' };
		const userTalks = [
			{ username: 'name 1', key: 'key 1' },
			{ username: 'name 2', key: 'key 2' },
		] as UserTalkClient[];
		store.select.and.returnValue(of(loggedUser));
		userTalkService.filterByUserKey.and.returnValue(of(userTalks));

		const { fixture } = createComponent();

		const rows = fixture.debugElement.queryAll(By.css('app-talk-row'));
		expect(rows).toHaveSize(2);
		expect(rows[0].properties['name']).toBe('name 1');
		expect(rows[0].properties['key']).toBe('key 1');
		expect(rows[1].properties['name']).toBe('name 2');
		expect(rows[1].properties['key']).toBe('key 2');
	});

	function createComponent(): { fixture: ComponentFixture<TalkListComponent>; component: TalkListComponent } {
		const fixture = TestBed.createComponent(TalkListComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();

		return { fixture, component };
	}
});
