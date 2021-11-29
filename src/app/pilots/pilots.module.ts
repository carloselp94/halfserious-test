import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PilotDetailComponent } from "./pilot-detail/pilot-detail.component";
import { PilotsRoutingModule } from "./pilots-routing.module";

@NgModule({
  declarations: [PilotDetailComponent],
  imports: [
    CommonModule,
    PilotsRoutingModule
  ],
  exports: [
    
  ]
})
export class PilotsModule {

}