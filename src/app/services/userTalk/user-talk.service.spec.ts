import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserTalkService } from './user-talk.service';

describe('UserTalkService', () => {
	let service: UserTalkService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: AngularFireDatabase,
					useValue: jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']),
				},
			],
		});
		service = TestBed.inject(UserTalkService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
