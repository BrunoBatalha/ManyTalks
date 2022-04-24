import { NgModule } from '@angular/core';
import { FirebaseOptions } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { ImageRoundedComponent } from './components/image-rounded/image-rounded.component';
import { InputMessageComponent } from './components/input-message/input-message.component';
import { MessageBalloonComponent } from './pages/chat/components/message-balloon/message-balloon.component';
import { ChatComponent } from './pages/chat/chat.component';
import { TalkListComponent } from './pages/talks/components/talk-list/talk-list.component';
import { TalkRowComponent } from './pages/talks/components/talk-row/talk-row.component';
import { TalksComponent } from './pages/talks/talks.component';
import { appReducer } from './store/app.state';
import { chatReducer } from './store/chat.state';
import { TalkInputButtonComponent } from './pages/talks/components/talk-input-button/talk-input-button.component';

@NgModule({
	declarations: [
		AppComponent,
		ChatComponent,
		TalksComponent,
		ContainerComponent,
		TalkRowComponent,
		TalkListComponent,
		MessageBalloonComponent,
		InputMessageComponent,
		ImageRoundedComponent,
  TalkInputButtonComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
		AngularFireDatabaseModule,
		StoreModule.forRoot({ app: appReducer, chat: chatReducer }, {}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
