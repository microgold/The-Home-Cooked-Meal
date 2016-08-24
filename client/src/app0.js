import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {tokenIsExpired} from './utils/tokenUtils';
import {AuthService} from './services/auth-service';

@inject(HttpClient, Router, AuthService)
export class App {
  message = 'Auth0 - Aurelia';



  constructor(http, router, authService) {
    this.http = http;
    this.router = router;
    this.authService = authService;
    var self = this;


    this.router.configure(config => {
      config.map([
        // header
        { route: ['','welcome'],  moduleId: './welcome/welcome',  settings: { isTop: "true" },     nav: true,   title:'Welcome' },
        { route: 'diners',  moduleId: './diners/diners',    settings: { isTop: "true" },  nav: true,       title:'Diners' },
        { route: 'chefs',  moduleId: './chefs/chefs',    settings: { isTop: "true" },  nav: true,       title:'Chefs' },
         { route: 'signup',  moduleId: './signup/signup',    settings: { isTop: "true" },   nav: true,       title:'Sign Up' },
        // footer has no isTop setting
        { route: 'application',  moduleId: './application/application',  settings: { isTop: "true" },     nav: true,   title:'Apply' },
        { route: 'profile',  moduleId: 'profile',  settings: { isTop: "true" },     nav: true,   title:'Profile' },
       { route: 'contact-us',  moduleId: './contact-us/contact-us',       nav: true,       title:'Contact Us' },

      ])
    });
    this.http.configure(config => {
      config.withDefaults({
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        }
      });
    });

    // add authservice here




  }







}
