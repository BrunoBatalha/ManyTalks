import { TestBed } from '@angular/core/testing';
import { UserTalkService } from './user-talk.service';

describe('TalkService', () => {
	let service: UserTalkService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserTalkService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
