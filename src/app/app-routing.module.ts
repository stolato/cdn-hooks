import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {HomepageComponent} from './components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full'},
  { path: ':ID', component: HomepageComponent},
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
