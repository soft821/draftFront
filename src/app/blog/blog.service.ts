import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class BlogService {
  itemsList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  
  getItems() {
    this.itemsList = this.firebase.list('items');
    return this.itemsList;
  }

  getItemyId(key) {
    let value;
    return this.firebase.database.ref('items').child(key)
      .once('value')
      .then(function(snapshot) {
        return snapshot.val()
    });
  }
  
  insertItem(item)
  {
     this.itemsList.push({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phone: item.phone,
      department: item.department,
      amount: item.amount,
      date: item.date.getTime()
    }); 
  }
 
  updateItem(item){
    this.itemsList.update(item.$key,
      {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
        department: item.department,
        amount: item.amount,
        date: item.date
      });
  }
 
  deleteItem($key: string){
    this.itemsList.remove($key);
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
