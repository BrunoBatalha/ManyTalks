import * as Faether from 'feather-icons';
import { v4 as uuidv4 } from 'uuid';

export function GenerateGuid(): string {
	return uuidv4();
}

export function FaetherIcon(): typeof Faether {
	return Faether;
}
