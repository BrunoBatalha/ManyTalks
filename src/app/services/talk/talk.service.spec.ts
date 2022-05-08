import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { TalkService } from './talk.service';

describe('TalkService', () => {
	let service: TalkService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: AngularFireDatabase,
					useValue: jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']),
				},
			],
		});
		service = TestBed.inject(TalkService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
