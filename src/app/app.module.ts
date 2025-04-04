import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MemberFromComponent } from './member-from/member-from.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TemplateComponent } from './template/template.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { ModalEvtComponent } from './modal-evt/modal-evt.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { VisibilityComponent } from './visibility/visibility.component';
import { PubComponent } from './pub/pub.component';
import { EditPubComponent } from './edit-pub/edit-pub.component';
import { firebaseConfig } from './environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { GroupeComponent } from './groupe/groupe.component';




@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberFromComponent,
    ConfirmDialogComponent,
    TemplateComponent,
    DashboardComponent,
    EventComponent,
    ModalEvtComponent,
    VisibilityComponent,
    PubComponent,
    EditPubComponent,
    LoginComponent,
    EtudiantComponent,
    EtudiantFormComponent,
    GroupeComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
