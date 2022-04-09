import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	storage: Storage;

	constructor() {
		this.storage = window.localStorage;
	}

	set(key: string, value: unknown): boolean {
		if (this.storage) {
			this.storage.setItem(key, JSON.stringify(value));
			return true;
		}
		return false;
	}

	get(key: string): unknown | null {
		if (this.storage) {
			const item = this.storage.getItem(key);
			if (item != null) {
				return JSON.parse(item) || null;
			}
		}
		return null;
	}

	remove(key: string): boolean {
		if (this.storage) {
			this.storage.removeItem(key);
			return true;
		}
		return false;
	}

	clear(): boolean {
		if (this.storage) {
			this.storage.clear();
			return true;
		}
		return false;
	}
}
