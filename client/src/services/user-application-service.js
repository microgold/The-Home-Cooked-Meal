import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class UserApplicationService {
  constructor(http) {
    this.http = http;
  }

  addCustomer(application) {
    let user = {
    "firstname": application.fullname.split(" ")[0],
    "lastname": application.fullname.split(" ")[1],
    "email": application.email,
    "phone": application.phone,
    "address": application.address,
    "city": application.city,
    "state": application.selectedState.name,
    "zip": application.zip,
    "isLegal": application.isLegal,
    "username": application.email,
    "password": "",
    "dateCreated": Date.now(),
  }

    return this.postSomeJson(user)
  }

  postSomeJson(user) {
      return  this.http.fetch('http://localhost:3000/api/customers', {
          headers: {
                'Content-Type': 'application/json'
                // More options
            },
            method: 'post',
            body: JSON.stringify(user)
        })
    }
}
