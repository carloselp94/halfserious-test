import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StarshipListItemComponent } from "./starship-list-item/starship-list-item.component";
import { StarshipListComponent } from "./starship-list/starship-list.component";
import { StarshipRoutingModule } from "./starships-routing.module";

@NgModule({
  declarations: [
    StarshipListComponent,
    StarshipListItemComponent
  ],
  imports: [
    CommonModule,
    StarshipRoutingModule
  ],
  exports: []
})
export class StarshipModule {

}