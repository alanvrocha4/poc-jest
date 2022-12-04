import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContacFormComponent } from './contac-form.component';
import { ContactsService } from '../services/contacts.service';
import { IContact } from '../interfaces/contact.interface';
import { Router } from '@angular/router';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { of } from 'rxjs';

describe('ContacFormComponent', () => {
  let component: ContacFormComponent;
  let fixture: ComponentFixture<ContacFormComponent>;
  let service: ContactsService;
  let router: Router;

  const mockContact: IContact = {
    id: 1,
    name: 'José',
    email: 'jose@email.com',
    phone: '123456789'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContacFormComponent],
      imports: [RouterTestingModule.withRoutes([{
        'path': 'list',
        component: ContactListComponent
      }]), ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [ContactsService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContacFormComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(ContactsService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generate form withou get contact data', () => {
    const spy = jest.spyOn(component, 'generateForm')
    const spyContact = jest.spyOn(component, 'getUser')

    component.ngOnInit();

    expect(spyContact).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(component.form).toBeDefined()
  })

  it('should get user data before initiate form', async () => {
    const spy = jest.spyOn(component, 'generateForm');
    const spyContact = jest.spyOn(component, 'getUser');
    jest.spyOn(service, 'getContact').mockResolvedValue(mockContact);
    const spyWindow = jest.spyOn(window, 'alert').mockImplementation(() => { });
    component['activeRoute'].snapshot.params = { id: 1 }
    fixture.detectChanges();

    await component.ngOnInit();

    expect(spyWindow).not.toHaveBeenCalled();
    expect(spyContact).toHaveBeenCalled();
    expect(component.contact).toBe(mockContact);
    expect(spy).toHaveBeenCalled();
    expect(component.form.get('id').value).toBe(mockContact.id);
  })

  it('should call alert when error to get contact data', async () => {
    const spyContact = jest.spyOn(component, 'getUser');
    jest.spyOn(service, 'getContact').mockImplementation(() => { throw new Error("") });
    const spyWindow = jest.spyOn(window, 'alert').mockImplementation(() => { });
    component['activeRoute'].snapshot.params = { id: 1 }
    fixture.detectChanges();

    await component.ngOnInit();

    expect(spyContact).toHaveBeenCalled();
    expect(spyWindow).toHaveBeenCalled();
  })

  it('should redirect to list when succes save a contact', async() => {
    const spyService = jest.spyOn(service, 'saveContact').mockResolvedValue(mockContact);
    const form = {
      valid: true,
      value: mockContact
    }

    await component.submit(form as FormGroup);

    expect(spyService).toHaveBeenCalledWith(form.value);

  })

  it('should call alert when error to salve contact data', async() => {
    const spyService = jest.spyOn(service, 'saveContact').mockResolvedValue(mockContact);
    const spyWindow = jest.spyOn(window, 'alert').mockImplementation(() => { });
    const form = {
      valid: true,
      value: mockContact
    }

    await component.submit(form as FormGroup);

    expect(spyWindow).toHaveBeenCalled();

  })
});
