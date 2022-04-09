import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

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

	protected filterBy(
		path: string,
		property: string | undefined,
		value: string
	): Observable<Array<SnapshotAction<unknown>>> {
		return this.database
			.list(`${this.pathRoot}${path}`, (ref) => ref.orderByChild(property || '').equalTo(value))
			.snapshotChanges();
	}
}
