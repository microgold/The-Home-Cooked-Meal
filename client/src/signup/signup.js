import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
//import {AuthService} from '../services/auth-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Signup{
    heading = 'Share your Cooking Skills for Profit!';

    constructor(eventAggregator)
    {
      //  this.authService = authService;
      this.eventAggregator  = eventAggregator;

    }

    attached() {
        this.login();
  }

    login() {
        // this.authService.launchLoginDialog();
        this.eventAggregator.publish('lockScreenEvent', {name: 'signup'})
    }
}
