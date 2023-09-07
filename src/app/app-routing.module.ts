import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  { path: '', redirectTo: '/panel', pathMatch: 'full'},
  { path:'inicio',  component: InicioComponent, loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule)},
  { path: 'panel', component: PanelComponent, loadChildren: () => import('./components/panel/panel.module').then(m => m.PanelModule)},
  { path: '**', redirectTo: '/panel'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
