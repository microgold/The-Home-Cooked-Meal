import {inject} from 'aurelia-dependency-injection';
import {validationRenderer} from 'aurelia-validation';

// @validationRenderer
@inject(Element)
export class SimpleValidationRenderer {
// Remember the error divs in our two custom input elements? This is exactly where we are going to render error messages. error is, who would have thought it, the actual error whereas target is the DOM element this error belongs to.
constructor(boundaryElement) {
  this.boundaryElement = boundaryElement;
}

 render(error, target) {
   if (!target || !(this.boundaryElement === target || this.boundaryElement.contains(target))) {
     return;
   }

    target.querySelector(".error").textContent = error.message;
  }
// Once validation becomes successful, we need to remove all the error messages. We do this by implementing a simple unrender() method.

  unrender(error, target) {
    if (!target || !(this.boundaryElement === target || this.boundaryElement.contains(target))) {
      return;
    }

    target.querySelector(".error").textContent = "";
  }
}
