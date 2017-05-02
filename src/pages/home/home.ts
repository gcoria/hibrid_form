import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [EmailComposer, SocialSharing]
})

export class HomePage {
   
  simpleForm: FormGroup;

  email: any;

  constructor(public navCtrl: NavController,
  	          public emailComposer: EmailComposer,
  	          public formBuilder: FormBuilder,
              public socialSharing: SocialSharing) {

  	this.simpleForm = formBuilder.group({
        place: [''],
        date: [ new Date().toISOString().slice(0, 10) ],
        operator: [''],
        buyer: [''],
        term_buyer: [''],
        comision_buyer: [''],
        detail: [''],
        kg: [''],
        amount: [''],
        saler: [''],
        term_saler: [''],
        comision_saler: [''],
        dte: [''],
        res_origin: [''],
        res_destiny: [''],
        autorization: [''],
        flete: [''],
        saler_b:[''],
        raze: [''],
        saler_s: [''],
        destiny: [''],
        faena: ['']
    });
    
  }

  clean() {
  	this.simpleForm = this.formBuilder.group({
        place: [''],
        date: [''],
        operator: [''],
        buyer: [''],
        term_buyer: [''],
        comision_buyer: [''],
        detail: [''],
        kg: [''],
        amount: [''],
        saler: [''],
        term_saler: [''],
        comision_saler: [''],
        dte: [''],
        res_origin: [''],
        res_destiny: [''],
        raze: [''],
        saler_b: [''],
        autorization: [''],
        flete: [''],
        saler_s: [''],
        destiny: [''],
        faena: ['']
    });
  }

  update() {
    let form = this.simpleForm.value;
    this.email = {
      to: 'cargas.saenz@gmail.com',
      cc: '',
      bcc: [],
      subject: "Boleta " + form.operator,
      body:"Lugar: " + form.place + "<br>" +              
          "Fecha: " + this.format_date(form.date) + "<br>" +              
          "Operario/Comisionista: " + form.operator + "<br>" +              
          "Comprador: " + form.buyer + "<br>" +              
          "Plazo del Comprador: " + form.term_buyer + "<br>" +              
          "Comision del Comprador: " + form.comision_buyer +  "%" + " | " + form.saler_b + "<br>" +              
          "Autorizado a la  Compra:" + form.autorization + "<br>" +              
          "Establecimiento Faenador:" + form.faena + "<br>" +              
          "Detalle: " + form.detail + "<br>" +              
          "Raza: " + form.raze + "<br>" +              
          "Kilos: " + form.kg + "<br>" +              
          "Precio: " + form.amount + "<br>" +              
          "Vendedor: " + form.saler + "<br>" +              
          "Plazo del Vendedor: " + form.term_saler + "<br>" +              
          "Comision del Vendedor: " + form.comision_saler +  "%" + " | " + form.saler_s + "<br>" +              
          "Nro DTE: " + form.dte + "<br>" +
          "Flete: " + form.flete + "<br>" +              
          "Renspa Origen: " + form.res_origin + "<br>" +
          "Renspa Destino: " + form.res_destiny,                          
     isHtml: true
    };
  }

  format_date(date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    return day + "/" + month + "/" + year; 
  }

  send_mail(){
  	let form = this.simpleForm.value;
  	this.email = {
      to: 'cargas.saenz@gmail.com',
      cc: '',
      bcc: [],
       subject: "Boleta " + form.operator,
       body:"Lugar: " + form.place + "<br>" +              
            "Fecha: " + this.format_date(form.date) + "<br>" +              
            "Operario/Comisionista: " + form.operator + "<br>" +              
            "Comprador: " + form.buyer + "<br>" +              
            "Plazo del Comprador: " + form.term_buyer + "<br>" +              
            "Comision del Comprador: " + form.comision_buyer +  "%" + " | " + form.saler_b + "<br>" +              
            "Autorizado a la  Compra:" + form.autorization + "<br>" +              
            "Establecimiento Faenador:" + form.faena + "<br>" +              
            "Detalle: " + form.detail + "<br>" +              
            "Raza: " + form.raze + "<br>" +              
            "Kilos: " + form.kg + "<br>" +              
            "Precio: " + form.amount + "<br>" +              
            "Vendedor: " + form.saler + "<br>" +              
            "Plazo del Vendedor: " + form.term_saler + "<br>" +              
            "Comision del Vendedor: " + form.comision_saler +  "%" + " | " + form.saler_s + "<br>" +              
            "Nro DTE: " + form.dte + "<br>" +
            "Flete: " + form.flete + "<br>" +              
            "Renspa Origen: " + form.res_origin + "<br>" +
            "Renspa Destino: " + form.res_destiny,                          
       isHtml: true
      };
    // Share via email
    this.socialSharing.canShareViaEmail().then(() => {
      this.socialSharing.shareViaEmail(this.email.body, this.email.subject, [this.email.to]).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }).catch(() => {
      console.log("Sharing via email is not possible");
    });
    //this.emailComposer.open(this.email);
  }
}
