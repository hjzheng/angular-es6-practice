export function ApPanelDirective() {
  'ngInject';

  let directive = {
    templateUrl:'app/common/apPanel.directive.html',
    restrict:'E',
    replace:true,
    transclude: true,
    scope: {
      'icon': '@',
      'title': '@',
      'size': '@'
    }
  };

  return directive;

}
