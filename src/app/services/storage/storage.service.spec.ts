import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
	let service: StorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StorageService);
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should be set value and return true', () => {
		const response = service.set('key', 'value');
		expect(response).toBeTruthy();
	});

	it('should be get value after set value', () => {
		service.set('key', 'test');
		const value = localStorage.getItem('key');
		expect(value).toBe('"test"');
	});

	it('should be remove value after setted', () => {
		service.set('key', 'test');
		service.remove('key');
		const value = localStorage.getItem('key');
		expect(value).toBeNull();
	});

	it('should be clear values', () => {
		service.set('key', 'test');
		service.clear();
		const value = localStorage.getItem('key');
		expect(value).toBeNull();
	});

	it('should be return user setted', () => {
		service.set('key', 'test');
		const user = service.get('key');
		expect(user).not.toBeNull();
	});

	it('should be return null when key not setted', () => {
		const user = service.get('key');
		expect(user).toBeNull();
	});
});
