import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
   
  validations_form: FormGroup;
  errorMessage: string = '';

  logado = 0;
 
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private storage: Storage
 
  ) { }
 
  ngOnInit() {

    this.storage.get('email')
      .then((val) => {
        if(val != null){
          this.logado = 1;
        }
        
      })
      .catch((e) => {
        this.logado = 0;
      });

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email é obrigatório.' },
      { type: 'pattern', message: 'Digite um e-mail válido.' }
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'Senha fraca, informe uma senha com mais de 5 caracteres.' }
    ]
  };
 
 
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      this.storage.set('email', value.email);
      this.logado = 1;
      this.storage.get('email').then((val) => {
        console.log(this.logado);
        console.log('Your age is', val);
      });
      // this.errorMessage = "";
      // this.navCtrl.navigateForward('/dashboard');
    }, err => {
      this.errorMessage = err.message;
    })
  }
  
//  logado(){
//   this.storage.get('email')
//   .then((val) => {
//     return true
//   })
//   .catch((e) => {
//     return false
//   });
//  }
  // goToRegisterPage(){
  //   this.navCtrl.navigateForward('/register');
  // }
 
}

