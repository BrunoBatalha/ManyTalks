import { BaseService } from './base.service';

describe('BaseService', () => {
	let service: BaseService<any>;

	beforeEach(() => {
		service = new BaseService(jasmine.createSpyObj('AngularFirebaseDatabase', ['list', 'object']));
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
