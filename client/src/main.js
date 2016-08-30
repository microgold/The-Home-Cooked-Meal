import 'jquery'
import 'bootstrap'
import {SimpleValidationRenderer} from './resources/validation/simple-validation-renderer'

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-validatejs')
    .plugin('aurelia-validation')
    .feature('bootstrap-validation');

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements
 aurelia.container.registerHandler("simple-renderer", container => container.get(SimpleValidationRenderer));
  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
