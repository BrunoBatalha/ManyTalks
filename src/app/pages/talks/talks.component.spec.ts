import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { UserPublicService } from 'src/app/services/userPublic/user-public.service';
import { UserTalkService } from 'src/app/services/userTalk/user-talk.service';
import { TalksComponent } from './talks.component';

describe('TalksComponent', () => {
	let userServiceSpyObj: jasmine.SpyObj<UserService>;
	let userPublicServiceSpyObj: jasmine.SpyObj<UserPublicService>;
	let userTalkServiceSpyObj: jasmine.SpyObj<UserTalkService>;
	let storeSpyObj: jasmine.SpyObj<Store>;
	let component: TalksComponent;
	let fixture: ComponentFixture<TalksComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TalksComponent],
			providers: [
				{
					provide: UserService,
					useValue: jasmine.createSpyObj('UserService', ['saveInStorage', 'insertUser', 'getLoggedUser']),
				},
				{
					provide: UserPublicService,
					useValue: jasmine.createSpyObj('UserPublicService', ['getUserByKey', 'filterByUsername']),
				},
				{
					provide: UserTalkService,
					useValue: jasmine.createSpyObj('UserTalkService', ['getKeyByUserKeys', 'insertUserTalk', 'filterByUserKey']),
				},
				{ provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
				{ provide: Store, useValue: jasmine.createSpyObj('Store', ['select']) },
			],
		}).compileComponents();

		userServiceSpyObj = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
		userPublicServiceSpyObj = TestBed.inject(UserPublicService) as jasmine.SpyObj<UserPublicService>;
		userTalkServiceSpyObj = TestBed.inject(UserTalkService) as jasmine.SpyObj<UserTalkService>;
		storeSpyObj = TestBed.inject(Store) as jasmine.SpyObj<Store>;

		storeSpyObj.select.and.returnValue(of(null));

		userServiceSpyObj.insertUser.and.returnValue(of({ username: 'name' } as User));
		userServiceSpyObj.getLoggedUser.and.returnValue(of(null));

		userPublicServiceSpyObj.getUserByKey.and.returnValue(of(null));
		userPublicServiceSpyObj.filterByUsername.and.returnValue(of(null));

		userTalkServiceSpyObj.getKeyByUserKeys.and.returnValue(of(null));
		userTalkServiceSpyObj.insertUserTalk.and.returnValue(of(''));
		userTalkServiceSpyObj.filterByUserKey.and.returnValue(of([]));

		fixture = TestBed.createComponent(TalksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
