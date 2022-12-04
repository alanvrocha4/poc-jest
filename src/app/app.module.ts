import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContacFormComponent } from './contact-form/contact-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactsService } from './services/contacts.service';

const routes: Routes = [
  {
    path: 'list',
    component: ContactListComponent
  },
  {
    path: 'add-contact',
    component: ContacFormComponent
  },
  {
    path: 'edit-contact/:id',
    component: ContacFormComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContacFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
