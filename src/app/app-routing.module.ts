import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFromComponent } from './member-from/member-from.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import { PubComponent } from './pub/pub.component';
import { LoginComponent } from './login/login.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { GroupeComponent } from './groupe/groupe.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'member', component: MemberComponent },
  { path: 'etudiant', component: EtudiantComponent },
  { path: 'articles', component: PubComponent },
  { path: 'events', component: EventComponent },
  {
    path:'',
    pathMatch:'full',
    component:LoginComponent
  },
  {
    path:'etudiant',
    pathMatch:'full',
    component:EtudiantComponent
  },
  {
    path:'create',
    pathMatch:'full',
    component:MemberFromComponent
  }, {
    path:'create-etudiant',
    pathMatch:'full',
    component:EtudiantFormComponent
  },
  {
    path:'edit/:id',
    pathMatch:'full',
    component:MemberFromComponent
  },
  { path: 'create-etudiant', component: EtudiantFormComponent },
  { path: 'edit-etudiant/:id', component: EtudiantFormComponent },
  { path: 'groupes', component: GroupeComponent },
  // { path: 'create-groupe', component: GroupeFormComponent },
  // { path: 'edit-groupe/:id', component: GroupeFormComponent }
  {
    path:'**',// nimporte quel path
    component:MemberComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
