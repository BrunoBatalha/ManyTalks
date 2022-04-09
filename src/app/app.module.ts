import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './pages/chat/chat.component';
import { TalksComponent } from './pages/talks/talks.component';

@NgModule({
	declarations: [AppComponent, ChatComponent, TalksComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
