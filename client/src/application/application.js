import {computedFrom} from 'aurelia-framework';
import {inject, NewInstance} from 'aurelia-dependency-injection';
import {StateService} from '../services/state-service';
import {UserApplicationService} from '../services/user-application-service';
import {ValidationRules, required} from 'aurelia-validatejs';
import {ValidationController, validateTrigger, validationMessages} from 'aurelia-validation';




@inject(StateService, UserApplicationService, NewInstance.of(ValidationController))
export class Application{

  @required
  city = null;

  @required
  fullname = null;



  constructor(stateService, userApplicationService, validationController)  {
    this.stateService = stateService;
    this.userApplicationService = userApplicationService;
    this.validationController = validationController;

    this.validationController.validateTrigger = validateTrigger.manual;
  //  validationMessages['required'] = `\${$displayName} is missing!`;


    // ValidationRules.ensure((m: Application) => m.city).required()
    //                 .ensure((m: Application) => m.fullname).required()
    //                 .ensure((m: Application) => m.selectedState).required()
    //   .on(this);


    this.address = '';

    this.selectedState = null;
    this.zip = '';
    this.isLegal = false;
    this.showMessage = false;

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

bind() {

}

submitForm(){
// let errors = this.validationController.validate();
   this.validationController.validate().then(result => {
          if (result.length == 0)
          {
            let userExistPromise = this.userApplicationService.userExists(this.email);
            userExistPromise.then(result => {
              if (result.success == false) {
                this.showMessage = true;
                this.message = result.message; this.success = result.success;
            }
            else {
              let promise = this.userApplicationService.addCustomer(this);
              promise.then(result => {
                if (result != null)    {
                  this.showMessage = true; this.message = result.message; this.success = result.success;
              }
            });
          }
       });
    }

    });
  console.log(`fullname is ${this.fullname}, state is ${this.selectedState.name}, and zip is ${this.zip}.`);

}


}
