import { Component, OnInit } from '@angular/core';
import { StarshipService } from 'src/app/starships/starship-list/starship.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _starshipService: StarshipService) {}

  public ngOnInit(): void {
    this._starshipService.getAllStarships();
  }

}
