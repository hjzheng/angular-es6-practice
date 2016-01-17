export function ApStatsDirective() {
  'ngInject';
    return {
      templateUrl:'app/dashboard/apStats.directive.html',
      restrict:'E',
      replace:true,
      scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details':'@',
        'type':'@',
        'goto':'@'
      }
    };
}