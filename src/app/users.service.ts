import { Baby } from './entities/baby';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { } 

  getUsers() {
    return this.http.get('http://angular2api2.azurewebsites.net/api/internships');
  }

  createBaby(baby: Baby) {
    baby.customerId = 'Seb';
    baby.rating = [];
    console.log(baby);
    return this.http.post('http://angular2api2.azurewebsites.net/api/internships', baby);
  }
  
  updateBaby(baby: Baby) {
    return this.http.put(`http://angular2api2.azurewebsites.net/api/internships/${baby._id}`, baby, {responseType: 'text'});
  }
  
  deleteBaby(baby: Baby) {
    return this.http.delete(`http://angular2api2.azurewebsites.net/api/internships/${baby._id}`,{responseType: 'text'});
  }

  addRating(payload) {
    console.log(payload);
  }

}
