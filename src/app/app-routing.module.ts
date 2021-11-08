import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './services/can-activate-guard.service';

import { HomeComponent } from './views/home/home.component';
import { CandidateEditComponent } from './views/home/pages/candidate-edit/candidate-edit.component';
import { CandidateListComponent } from './views/home/pages/candidate-list/candidate-list.component';
import { ManageFormsComponent } from './views/home/pages/manage-forms/manage-forms.component';
import { CreateFormComponent } from './views/home/pages/manage-forms/pages/create-form/create-form.component';
import { ManageFormsTableComponent } from './views/home/pages/manage-forms/pages/manage-forms-table/manage-forms-table.component';
import { RegisterComponent } from './views/register/register.component';
import { SignInComponent } from './views/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'candidate-list', component: CandidateListComponent,
        canActivate: [CanActivateGuard],
      },
      {
        path: 'candidate-edit/:id', component: CandidateEditComponent,
        canActivate: [CanActivateGuard]
      },
      {
        path: 'manage-forms', component: ManageFormsComponent, canActivate: [CanActivateGuard],
        children: [
          {
            path: '', component: ManageFormsTableComponent
          },
          {
            path: 'create-form', component: CreateFormComponent
          }
        ]
      }
    ]
  },
  {
    path: '**', redirectTo: 'home/candidate-list', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
