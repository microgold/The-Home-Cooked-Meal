import {computedFrom} from 'aurelia-framework';

export class Signup{
    heading = 'Share your Cooking Skills for Profit!';
    lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);



    attached() {
       this.login();
  }
  
    login() {
        this.lock.show();   
    }
}