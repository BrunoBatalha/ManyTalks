import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export class BaseService<TEntity> {
	private pathRoot: string = 'database';

	constructor(private database: AngularFireDatabase) {}

	protected insert(entity: TEntity): Observable<TEntity> {
		return new Observable<TEntity>((subscriber): void => {
			this.database
				.list(this.pathRoot)
				.push(entity)
				.then((result: firebase.database.Reference): void => {
					subscriber.next({ id: result.key, ...entity });
				});
		});
	}

	protected updateMany(pathsToUpdate: { [x: string]: unknown }): Promise<void> {
		return this.database.object(this.pathRoot).update(pathsToUpdate);
	}

	protected updateMany$(pathsToUpdate: { [x: string]: unknown }): Observable<void> {
		return new Observable((subscriber) => {
			this.database
				.object(this.pathRoot)
				.update(pathsToUpdate)
				.then(() => {
					subscriber.next();
				});
		});
	}

	protected filterBy(
		path: string,
		property: string | undefined,
		value: string
	): Observable<Array<SnapshotAction<unknown>>> {
		return this.database
			.list(`${this.pathRoot}/${path}`, (ref) => ref.orderByChild(property || '').equalTo(value))
			.snapshotChanges();
	}

	protected filterByKey(path: string, key: string): Observable<TEntity[]> {
		return new Observable((subscriber) => {
			this.database
				.list(`${this.pathRoot}/${path}`, (ref) => ref.orderByKey().equalTo(key))
				.valueChanges()
				.pipe(
					map((snap) => {
						return snap as TEntity[];
					})
				)
				.subscribe({
					next: (snaps) => {
						subscriber.next(snaps);
						subscriber.complete();
					},
				});
		});
	}

	protected filterByPathAndOrderBy(path: string, orderBy: string): Observable<TEntity[]> {
		return this.database
			.list(`${this.pathRoot}/${path}`, (ref) => ref.orderByChild(orderBy))
			.valueChanges()
			.pipe(map((snap) => snap as TEntity[]));
	}
}
