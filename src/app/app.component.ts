import { Component } from '@angular/core';
import { Talks } from './models/Talks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  teste = 'manyTalks';
  talks: Talks[] = [
    {
      toPerson: "Bruno",
      id: "1"
    },
    {
      toPerson: "Batalha",
      id: "2"
    }
  ];

  createTalk(){
    alert(this.teste);
  }

  trackByTalks(index:number){
    return index;
  }
}
