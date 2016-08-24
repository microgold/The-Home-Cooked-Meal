import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {StateService} from '../services/state-service';
import {UserApplicationService} from '../services/user-application-service';


@inject(StateService, UserApplicationService)

export class Application{

  constructor(stateService, userApplicationService)  {
    this.stateService = stateService;
    this.userApplicationService = userApplicationService;

    this.address = '';
    this.city = '';
    this.selectedState = null;
    this.zip = '';
    this.isLegal = false;

// pull some of the attributes from the SSO login profile
    let profileString =  localStorage.getItem('profile');
    let profile = JSON.parse(profileString);

      this.fullname = profile.name;
      this.email = profile.email;
      this.imageUrl = profile.picture;

    this.stateService.getStates().then(
      data => {
        this.states = this.stateService.states;
    });
  }



submitForm(){
  this.userApplicationService.addCustomer(this);

  console.log(`fullname is ${this.fullname}, state is ${this.selectedState.name}, and zip is ${this.zip}.`);

}


}
