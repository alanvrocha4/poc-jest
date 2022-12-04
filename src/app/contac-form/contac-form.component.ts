import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from '../interfaces/contact.interface';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contac-form',
  templateUrl: './contac-form.component.html',
  styleUrls: ['./contac-form.component.css']
})
export class ContacFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router) { }

  public id: number;
  public contact: IContact;
  public form: FormGroup;

  async ngOnInit(): Promise<void> {
    this.id = this.activeRoute.snapshot.params['id'];

    if (this.id) {
      await this.getUser();
    } else {
      this.generateForm();
    }
  }

  async getUser() {
    try {
      this.contact = await this.contactService.getContact(this.id);
      this.generateForm();
    } catch (error) {
      alert('Erro ao buscar dados de contato');
    }
  }

  generateForm() {
    this.form = this.fb.group({
      id: [this.id || null],
      name: [this.contact?.name || null, [Validators.required]],
      email: [this.contact?.email || null, [Validators.required]],
      phone: [this.contact?.phone || null, [Validators.required]],
    })
  }

  async submit(form: FormGroup) {
    if (form.valid) {
      try {
        await this.contactService.saveContact(form.value as IContact);
      } catch (error) {
        alert('Erro ao salvar dados de contato');
      }
    }
  }

}
