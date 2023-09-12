import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly urlAPI = 'http://localhost:5000/contactos';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.urlAPI);
  }


  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.urlAPI, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    const url = `${this.urlAPI}/${contact.id}`;
    return this.http.put<Contact>(url, contact);
  }

  deleteContact(contactId: number): Observable<void> {
    const url = `${this.urlAPI}/${contactId}`;
    return this.http.delete<void>(url);
  }

  
}