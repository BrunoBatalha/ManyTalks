import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { User } from 'src/app/models/User';
import { StorageService } from '../storage/storage.service';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;
	let storageServiceSpy: jasmine.SpyObj<StorageService>;
	let angularFireDatabaseSpy: jasmine.SpyObj<AngularFireDatabase>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: AngularFireDatabase, useValue: jasmine.createSpyObj('AngularFireDatabase', ['object']) },
				{ provide: StorageService, useValue: jasmine.createSpyObj('StorageService', ['get']) },
				{ provide: Store, useValue: jasmine.createSpyObj('Store', ['select']) },
			],
		});

		storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
		angularFireDatabaseSpy = TestBed.inject(AngularFireDatabase) as jasmine.SpyObj<AngularFireDatabase>;

		service = TestBed.inject(UserService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('#isLogged should return false', () => {
		const isLogged = service.isLogged();

		expect(isLogged).toBeFalse();
	});

	it('#isLogged should return true', () => {
		storageServiceSpy.get.and.returnValue(true);

		const isLogged = service.isLogged();

		expect(isLogged).toBeTruthy();
	});

	it('#insertUser should inserted user', (done: DoneFn) => {
		angularFireDatabaseSpy.object.and.returnValue({
			update: (_) =>
				new Promise((resolve) => {
					resolve();
				}),
		} as AngularFireObject<unknown>);

		const user: User = {
			username: 'username test',
			id: '#id Test',
			key: '#key test',
		};

		service.insertUser(user).subscribe({
			next: (userCreated) => {
				expect(userCreated.key).not.toEqual('#key test');
				done();
			},
			error: done.fail,
		});
	});

	it('#getLoggedUser should return null', (done: DoneFn) => {
		service['storeUser$'] = of(null);

		service.getLoggedUser().subscribe({
			next: (user) => {
				expect(user).toBeNull();
				done();
			},
			error: done.fail,
		});
	});

	it('#getLogged should return user logged', (done: DoneFn) => {
		service['storeUser$'] = of({ username: 'username Test' } as User);

		service.getLoggedUser().subscribe({
			next: (user) => {
				expect(user).not.toBeNull();
				done();
			},
			error: done.fail,
		});
	});
});
