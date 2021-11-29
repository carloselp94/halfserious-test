import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadComponent } from "./components/load-component/load-component.component";
import { LoadComponentService } from "./services/load-component.service";

@NgModule({
  declarations: [LoadComponent],
  providers: [LoadComponentService],
  imports: [CommonModule],
  exports: [LoadComponent]
})
export class SharedModule {

}