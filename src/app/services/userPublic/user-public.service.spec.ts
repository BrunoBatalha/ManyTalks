import { TestBed } from '@angular/core/testing';
import { UserPublicService } from './user-public.service';

describe('UserPublicService', (): void => {
	let service: UserPublicService;

	beforeEach((): void => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserPublicService);
	});

	it('should be created', (): void => {
		expect(service).toBeTruthy();
	});
});
