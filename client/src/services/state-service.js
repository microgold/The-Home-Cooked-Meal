import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
export class StateService {
  getStates() {
    let httpClient = new HttpClient();

    return httpClient.fetch('http://services.groupkt.com/state/get/USA/all')
    .then(response => response.json())
    .then(data => {
      this.states  =  data.RestResponse.result;
    });
  }
}
