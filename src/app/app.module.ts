import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RegisterComponent } from './views/register/register.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { CandidateListComponent } from './views/home/pages/candidate-list/candidate-list.component';
import { DialogComponent } from './views/home/components/dialog/dialog.component'
import { NavBarComponent } from './views/home/components/nav-bar/nav-bar.component';
import { SideBarComponent } from './views/home/components/side-bar/side-bar.component';
import { CandidateEditComponent } from './views/home/pages/candidate-edit/candidate-edit.component';
import { HomeComponent } from './views/home/home.component';
import { ManageFormsComponent } from './views/home/pages/manage-forms/manage-forms.component';
import { ManageFormsTableComponent } from './views/home/pages/manage-forms/pages/manage-forms-table/manage-forms-table.component';
import { CreateFormComponent } from './views/home/pages/manage-forms/pages/create-form/create-form.component';

// ------------PRIMENG MODULES
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
// import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SignInComponent,
    HomeComponent,
    CandidateListComponent,
    DialogComponent,
    NavBarComponent,
    SideBarComponent,
    CandidateEditComponent,
    ManageFormsComponent,
    ManageFormsTableComponent,
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DialogModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
