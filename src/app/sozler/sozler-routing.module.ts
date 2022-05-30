import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SozlerComponent } from './sozler.component';

const routes: Routes = [
  { path: '', component: SozlerComponent },
  { path: ':words-count', component: SozlerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SozlerRoutingModule {}
