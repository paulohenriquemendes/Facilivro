import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  getBook = null;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getBook = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("Entrou", this.getBook);
  }

}
