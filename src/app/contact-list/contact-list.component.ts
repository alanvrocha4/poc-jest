import { Component, OnInit } from '@angular/core';
import { IContact } from '../interfaces/contact.interface';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(private contactsService: ContactsService) { }

  public contactList: IContact[] = [];

  ngOnInit(): void {
    this.getContacts();
  }

  async getContacts() {
    try {
      this.contactList = await this.contactsService.getContacts();
    } catch (error) {
      alert('Erro ao buscar contatos');
    }
  }

  async deleteContact(id: number) {
    try {
      await this.contactsService.deleteContacts(id);
      this.getContacts();
    } catch (error) {
      alert('Erro ao deletar contato');
    }
  }
}
