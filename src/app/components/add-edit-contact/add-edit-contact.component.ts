import { Component } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactsService } from 'src/app/services/contacts.service';
import { FormBuilder, Validators, FormControl  } from '@angular/forms';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css']
})
export class AddEditContactComponent implements OnInit {

  public contactSelected: Contact = null as any;

  public actionFunction: string = "";
  public actionButton: string = "";

  public hide: boolean = true;

  public ContactForm = this.formBuilder.group({
    firstName: ['' , Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]*")])],
    lastName: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]*")])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/), Validators.minLength(12)])],
    extraPhone: ['', Validators.compose([Validators.pattern(/^\d{3}-\d{3}-\d{4}$/), Validators.minLength(12)])],
  });

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public contactsService: ContactsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.contactSelected != null) {
      this.ContactForm.patchValue(this.contactSelected);
      this.actionButton = "Editar";
      console.log(this.contactSelected);
    }
    else {
      this.actionButton = "Agregar";
    }



  }



public actionForm(): void {
  if (this.contactSelected != null) {
    this.editContact();
  }
  else {
    this.addContact();
  }
}

public addContact(): void {
  const contact: Contact = this.ContactForm.value as Contact;
  this.contactsService.addContact(contact).subscribe(
    (contact: Contact) => {
      this.dialog.closeAll();
      this.snackBar.open('Contacto Añadido!', 'Cerrar', {duration: 3000}); 
    }
  );
}

public editContact(): void {
  let contact: Contact = this.ContactForm.value as Contact;
  contact.id = this.contactSelected.id;
  this.contactsService.updateContact(contact).subscribe(
    (contact: Contact) => {
      this.dialog.closeAll();
      this.snackBar.open('Contacto Actualizado!', 'Cerrar', {duration: 3000}); 
    }
  );
}



get FirstName(): FormControl{
  return this.ContactForm.get('firstName') as FormControl;
}

get LastName(): FormControl{ 
  return this.ContactForm.get('lastName') as FormControl;
}

get Email(): FormControl{
  return this.ContactForm.get('email') as FormControl;
}


get Phone(): FormControl{
  return this.ContactForm.get('phone') as FormControl;
}


get ExtraPhone(): FormControl{
  return this.ContactForm.get('extraPhone') as FormControl;
}


}
