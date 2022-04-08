import { Component, OnInit } from '@angular/core';
import { Talks } from 'src/app/models/Talks';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: []
})
export class TalksComponent {
  teste: string = "";
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

  createTalk() {
    alert("teste");
  }

  trackByTalks(index: number) {
    return index;
  }
}
