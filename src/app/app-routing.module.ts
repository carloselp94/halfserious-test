import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/starships'
  },
  {
    path: 'pilots',
    loadChildren: () =>
      import('./pilots/pilots.module').then((m) => m.PilotsModule)
  },
  {
    path: 'starships',
    loadChildren: () =>
      import('./starships/starships.module').then((m) => m.StarshipModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  { 
    path: '**', 
    redirectTo: '/not-found' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
