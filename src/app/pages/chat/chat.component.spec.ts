import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TalkService } from 'src/app/services/talk/talk.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
	let component: ChatComponent;
	let fixture: ComponentFixture<ChatComponent>;
	let talkServiceSpyObj: jasmine.SpyObj<TalkService>;
	let activatedRouteSpyObj: jasmine.SpyObj<ActivatedRoute>;
	let storeSpyObj: jasmine.SpyObj<Store>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChatComponent],
			providers: [
				{ provide: TalkService, useValue: jasmine.createSpyObj('TalkService', ['listMessages']) },
				{ provide: UserService, useValue: jasmine.createSpyObj('UserService', ['getFromStorage']) },
				{ provide: ActivatedRoute, useValue: jasmine.createSpyObj('ActivatedRoute', ['params']) },
				{ provide: Location, useValue: jasmine.createSpyObj('Location', ['back']) },
				{ provide: Store, useValue: jasmine.createSpyObj('Store', ['select']) },
			],
		}).compileComponents();

		talkServiceSpyObj = TestBed.inject(TalkService) as jasmine.SpyObj<TalkService>;
		activatedRouteSpyObj = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
		storeSpyObj = TestBed.inject(Store) as jasmine.SpyObj<Store>;

		talkServiceSpyObj.listMessages.and.returnValue(of([]));
		storeSpyObj.select.and.returnValue(of(null));
		activatedRouteSpyObj.params = of({} as Params);

		fixture = TestBed.createComponent(ChatComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
