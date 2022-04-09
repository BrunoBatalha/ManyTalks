import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { TalksComponent } from './pages/talks/talks.component';
import { URL } from './shared/constants';

const routes: Routes = [
	{
		path: `${URL.CHAT}/:id`,
		component: ChatComponent,
	},
	{
		path: '',
		component: TalksComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
