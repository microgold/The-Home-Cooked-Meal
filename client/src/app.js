import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {tokenIsExpired} from './utils/tokenUtils';
import {EventAggregator} from 'aurelia-event-aggregator';
// import {AuthService} from './services/auth-service';

@inject(HttpClient, Router, EventAggregator)  ////,  AuthService)
export class App {
  message = 'Auth0 - Aurelia';

  lock = new Auth0Lock('KhXgPLnB696iGhJY7VXSJgdDnMtJaA2i', 'microgold.auth0.com');
  isAuthenticated = false;



  constructor(http, router,  eventAggregator) {
    this.http = http;
    this.router = router;
    this.eventAggregator = eventAggregator;
  //  this.authService = authService;
    var self = this;

      this.listenForLoginLock();

    this.lock.on("authenticated", (authResult) => {
      self.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        self.isAuthenticated = true;
        self.lock.hide();
        this.router.navigate("application");
      });
        });


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

  }

    // add authservice here
    listenForLoginLock() {
      this.eventAggregator.subscribe('lockScreenEvent', payload => {
          this.launchLoginDialog();
      });
    }

    launchLoginDialog() {
             this.lock.show();
    }



  }
