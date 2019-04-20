import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { ServicosService } from './../servicos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
   
  validations_form: FormGroup;
  errorMessage: string = '';
  book: FormGroup;

  logado = 0;
 
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private serviceFirebase : ServicosService
 
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

    this.book = this.formBuilder.group({
      escola: new FormControl('EEM WLADIMIR RORIZ',Validators.compose([
        // Validators.required
      ])),
      multimeios: new FormControl('NILTON CESAR BATISTA DA SILVA', Validators.compose([
        // Validators.required
      ])),
      pratileira: new FormControl('01', Validators.compose([
        // Validators.required
      ])),
      sessao: new FormControl('01', Validators.compose([
        // Validators.required
      ])),
      nome: new FormControl('', Validators.compose([
        Validators.required
      ])),
      autor: new FormControl('', Validators.compose([
        Validators.required
      ])),
      sinopse: new FormControl('', Validators.compose([
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
 
  seedBook(v){
    console.log(v.value);

    this.serviceFirebase.create_NewStudent(v.value)
    .then(resp => {
      // this.studentName = "";
      // this.studentAge = undefined;
      // this.studentAddress = "";
      console.log(resp);
    })
    .catch(error => {
        console.log(error);
    });
  }
 
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

