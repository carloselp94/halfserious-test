import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipListComponent } from './starship-list/starship-list.component';

const routes: Routes = [
  {
    path: '',
    component: StarshipListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class StarshipRoutingModule {}
