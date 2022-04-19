import { NgModule } from '@angular/core';
import { FirebaseOptions } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { InputMessageComponent } from './components/input-message/input-message.component';
import { MessageBalloonComponent } from './components/message-balloon/message-balloon.component';
import { TalkListComponent } from './components/talk-list/talk-list.component';
import { TalkRowComponent } from './components/talk-row/talk-row.component';
import { ChatComponent } from './pages/chat/chat.component';
import { TalksComponent } from './pages/talks/talks.component';
import { appReducer } from './store/app.state';

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
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
		AngularFireDatabaseModule,
		StoreModule.forRoot({ app: appReducer }, {}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
