import { Component, OnInit} from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddEditContactComponent } from '../add-edit-contact/add-edit-contact.component';


@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})



export class ContactViewComponent implements OnInit {
  
  constructor( 
    private contactsService: ContactsService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  dataSource: Contact[] = [];
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'phone', 'extraPhone' , 'actions'];



  ngOnInit(): void {
    this.getContacts();

  }

  getContacts(): void {
    this.contactsService.getContacts().subscribe(contacts => this.dataSource = contacts);
  }

  addContactView(): void {
    const model = this.dialog.open(AddEditContactComponent, { disableClose: true });
    model.afterClosed().subscribe(() => {
      this.getContacts();
    });
  }

  updateContact(contact: Contact): void {
    const model = this.dialog.open(AddEditContactComponent, { data: contact, disableClose: true });
    model.componentInstance.contactSelected = contact;
    model.afterClosed().subscribe(() => {
      this.getContacts();
    });
  }

  deleteContact(id: number): void {
    this.contactsService.deleteContact(id).subscribe(() => {
      this.snackBar.open('Contacto Eliminado!', 'Cerrar', {duration: 3000}); 
      this.getContacts();
    });
  }


}
