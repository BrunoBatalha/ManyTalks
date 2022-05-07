import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { of } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserPublicService } from './user-public.service';

describe('UserPublicService', (): void => {
	let service: UserPublicService;
	let angularFireDatabaseSpy: jasmine.SpyObj<AngularFireDatabase>;

	beforeEach((): void => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: AngularFireDatabase, useValue: jasmine.createSpyObj('AngularFirebaseDatabase', ['list']) },
			],
		});

		angularFireDatabaseSpy = TestBed.inject(AngularFireDatabase) as jasmine.SpyObj<AngularFireDatabase>;
		service = TestBed.inject(UserPublicService);
	});

	it('#getUserByKey should return an user from list users', (done: DoneFn): void => {
		const users: User[] = [{ username: 'test 1' }, { username: 'test 2' }];

		angularFireDatabaseSpy.list.and.returnValue({
			valueChanges: () => of(users),
		} as AngularFireList<unknown>);

		service.getUserByKey('keyTest').subscribe({
			next: (user) => {
				expect(user?.username).toBe('test 1');
				done();
			},

			error: done.fail,
		});
	});

	it('#getUserByKey should return null from list users empty', (done: DoneFn): void => {
		angularFireDatabaseSpy.list.and.returnValue({
			valueChanges: () => of([] as any),
		} as AngularFireList<unknown>);

		service.getUserByKey('keyTest').subscribe({
			next: (user) => {
				expect(user).toBeNull();
				done();
			},

			error: done.fail,
		});
	});

	it('#filterByUsername should return an user from list users filtered by username', (done: DoneFn) => {
		angularFireDatabaseSpy.list.and.returnValue({
			snapshotChanges: () =>
				of([
					{
						key: 'test key',
						payload: {
							val: () => ({} as User),
						},
					},
				] as Array<SnapshotAction<unknown>>),
		} as AngularFireList<unknown>);

		service.filterByUsername('username test').subscribe({
			next: (user) => {
				expect(user).not.toBeNull();
				done();
			},
			error: done.fail,
		});
	});

	it('#filterByUsername should return null when list empty filtered by username', (done: DoneFn) => {
		angularFireDatabaseSpy.list.and.returnValue({
			snapshotChanges: () => of([] as Array<SnapshotAction<unknown>>),
		} as AngularFireList<unknown>);

		service.filterByUsername('username test').subscribe({
			next: (user) => {
				expect(user).toBeNull();
				done();
			},
			error: done.fail,
		});
	});
});
