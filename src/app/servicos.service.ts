import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewStudent(b) {
    return this.firestore.collection('Books').add(b);
  }

  read_Students() {
    return this.firestore.collection('Books').snapshotChanges();
  }

  update_Student(bookId,b){
    this.firestore.doc('Books/' + bookId).update(b);
  }

  delete_Student(bookId) {
    this.firestore.doc('Books/' + bookId).delete();
  }
}