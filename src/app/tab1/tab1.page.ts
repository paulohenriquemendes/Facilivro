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
  bookFilter = null;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private crudService: ServicosService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.bookFilter)
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
  this.router.navigate(['/detail/'], {queryParams: b})
}
desfoco(){
  console.log("desfocou");
  this.bookFilter = null;
}

buscarLivros(ev: any) {
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.book.map((e) => {
      if(e.nome == val){
        this.bookFilter = e;
        // console.log(this.bookFilter);
       
      }
      
    }
      )
      
    
  } 
  // else {
  //   this.livros = [];
  // }
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


