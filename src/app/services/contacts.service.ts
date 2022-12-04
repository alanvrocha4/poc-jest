import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { lastValueFrom, Observable } from 'rxjs';
import { IContact } from "../interfaces/contact.interface";

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    constructor(private http: HttpClient ){}
    
    private url = 'http://localhost:3000/contacts';

    public getContacts(): Promise<IContact[]> {
        return lastValueFrom(this.http.get(this.url) as Observable<IContact[]>);
    }

    public getContact(id: number): Promise<IContact> {
        return lastValueFrom(this.http.get(`${this.url}/${id}`) as Observable<IContact>);
    }

    public deleteContacts(id: number): Promise<IContact> {
        return lastValueFrom(this.http.delete(`${this.url}/${id}`) as Observable<IContact>);
    }

    public saveContact(contact: IContact): Promise<IContact> {
        if(contact.id){
            return lastValueFrom(this.http.patch(`${this.url}/${contact.id}`, contact) as Observable<IContact>); 
        } else {
            return lastValueFrom(this.http.post(`${this.url}`, contact) as Observable<IContact>);
        }
    }

}

