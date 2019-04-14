import { NavController } from '@ionic/angular';
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

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private crudService: ServicosService) { }

  ngOnInit() {
    this.crudService.read_Students().subscribe(data => {
 
      this.book = data.map(e => {
        return {
          // id: e.payload.doc.id,
          // isEdit: false,
          nome: e.payload.doc.data()['nome'],
          autor: e.payload.doc.data()['autor']
        };
      })
      console.log(this.book);
 
    });
}
btnItem(b) {
  console.log(b);
  this.router.navigate(['/detail/', b])
}
}


