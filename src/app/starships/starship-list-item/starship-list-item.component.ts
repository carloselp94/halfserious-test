import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Pilot } from "src/app/pilots/pilot.model";
import { Starship } from "../starship-list/starship.model";

@Component({
  selector: 'app-starship-list-item',
  templateUrl: 'starship-list-item.component.html',
  styleUrls: ['./starship-list-item.component.scss']
})
export class StarshipListItemComponent {

  @Input() public starship: Starship;
  
  public showInfo: boolean = false;

  constructor(private _router: Router) {

  }

  public onClick(): void {
    this.showInfo = !this.showInfo;
  }

  public onGoToPilotDetail(pilot: Pilot): void {
    //NEEDS HELPER
    const pilotId = (pilot.url.split('/').join('').replace('https:swapi.devapipeople', ''));
    this._router.navigate(['/pilots/', pilotId])
  }

}