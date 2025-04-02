import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFromComponent } from './member-from/member-from.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import { PubComponent } from './pub/pub.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'member', component: MemberComponent },
  //{ path: 'tools', component: ToolsComponent },
  { path: 'articles', component: PubComponent },
  { path: 'events', component: EventComponent },
  {
    path:'',
    pathMatch:'full',
    component:LoginComponent
  },
  {
    path:'members',
    pathMatch:'full',
    component:MemberComponent
  },
  {
    path:'create',
    pathMatch:'full',
    component:MemberFromComponent
  },
  {
    path:'edit/:id',
    pathMatch:'full',
    component:MemberFromComponent
  },
  
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
