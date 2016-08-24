
  <!--<section class="au-animate">
    <div class="col-xs-12">
    <div class="row">
      <button class="btn btn-primary" click.delegate="login()" if.bind="!isAuthenticate">Log In</button>
      <button click.delegate="logout()" if.bind="isAuthenticated">Log Out</button>
      <hr>
      <button click.delegate="getSecretThing()" if.bind="isAuthenticated">Get Secret Thing</button>
      <h3>${secretThing}</h3>
      <button click.delegate="getDecodedJwt()" if.bind="isAuthenticated">Get Decoded JWT</button>
      <pre if.bind="isAuthenticated">${decodedJwt}</pre>
      <hr>
      <a href="#/public-route">Public Route</a>
      <a href="#/private-route" if.bind="isAuthenticated">Private Route</a>
  </div>
  <div class="row">
   <div class="col-xs-2" ></div>
   <div class="col-xs-10">
    <form role="form" submit.delegate="submit()">
      <div class="form-group">
        <label for="fn">First Name</label>
        <input type="text" value.bind="firstName" class="form-control" id="fn" placeholder="first name">
      </div>
      <div class="form-group">
        <label for="ln">Last Name</label>
        <input type="text" value.bind="lastName" class="form-control" id="ln" placeholder="last name">
      </div>
      <div class="form-group">
        <label>Full Name</label>
        <p class="help-block">${fullName | upper}</p>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
    </div>
    </div>
    </div>
  </section>-->