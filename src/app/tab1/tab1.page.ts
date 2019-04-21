import { NavController, LoadingController } from '@ionic/angular';
import { DetailPage } from './../detail/detail.page';
import { Component, OnInit } from '@angular/core';
import { ServicosService } from './../servicos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  book;
  loaderToShow: any;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private crudService: ServicosService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.showLoader();
    this.crudService.read_Students().subscribe(data => {
      this.hideLoader();
 
      this.book = data.map(e => {
        return {
          // id: e.payload.doc.id,
          // isEdit: false,
          nome: e.payload.doc.data()['nome'],
          autor: e.payload.doc.data()['autor'],
          sessao: e.payload.doc.data()['sessao'],
          pratileira: e.payload.doc.data()['pratileira'],
          escola: e.payload.doc.data()['escola'],
          multimeios: e.payload.doc.data()['multimeios'],
          sinopse: e.payload.doc.data()['sinopse'],
        };
      })
      
 
    });
}
btnItem(b) {
  console.log(b);
  this.router.navigate(['/detail/'], {queryParams: b})
}

showLoader() {
  this.loaderToShow = this.loadingController.create({
    message: 'Listando livos, aguarde.'
  }).then((res) => {
    res.present();

    res.onDidDismiss().then((dis) => {
      console.log('Loading finalizado!');
    });
  });
}

hideLoader() {
  // setTimeout(() => {
    this.loadingController.dismiss();
  // }, 4000);
}

}


