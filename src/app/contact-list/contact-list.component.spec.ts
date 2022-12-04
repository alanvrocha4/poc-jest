import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ContactListComponent } from './contact-list.component';
import { ContactsService } from '../services/contacts.service';
import { IContact } from '../interfaces/contact.interface';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactsService: ContactsService;

  const mockContact: IContact = {
    id: 1,
    name: 'José',
    email: 'jose@email.com',
    phone: '123456789'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [ContactsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    contactsService = TestBed.inject(ContactsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getContacts onInit', () => {
    const spy = jest.spyOn(component, 'getContacts');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  })

  it('should to set contacList with values on succes', () => {
    jest.spyOn(contactsService, 'getContacts').mockResolvedValue([mockContact]);

    component.getContacts();

    expect(component.contactList.length == 1);
  })

  it('should to show alert on error to get contacts', () => {
    jest.spyOn(contactsService, 'getContacts').mockImplementation(() => { throw new Error("") });
    
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    component.getContacts();

    expect(spy).toHaveBeenCalled();

  })

  it('should set contactList with 0 items on delete success', () => {
    jest.spyOn(contactsService, 'getContacts').mockResolvedValue([]);
    const deleteSpy = jest.spyOn(contactsService, 'deleteContacts').mockResolvedValue({} as IContact);

    component.contactList = [mockContact];
    fixture.detectChanges();

    component.deleteContact(mockContact.id);

    expect(deleteSpy).toHaveBeenCalledWith(mockContact.id);
    expect(component.contactList.length == 0);
  })

  it('should to show alert on error to delete contact', () => {
    const deleteSpy = jest.spyOn(contactsService, 'deleteContacts').mockImplementation(() => { throw new Error("") });
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    component.deleteContact(mockContact.id);

    expect(deleteSpy).toHaveBeenCalledWith(mockContact.id);
    expect(spy).toHaveBeenCalled();

  })
});
