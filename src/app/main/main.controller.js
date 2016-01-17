export class MainController {
  constructor ($state, $rootScope, $scope) {
    'ngInject';
    this.title = $state.current.label;
    this.toggle = false;
    this.navigation = this.getNavigation($state);
    this.$scope = $scope;

    this.init($rootScope);
  }

  toggleSidebar () {
    this.toggle = !this.toggle
    this.$scope.$broadcast('sidebarToggleEvent', this.toggle);
  }

  getNavigation ($state) {
    return $state.get();
  } 

  init ($rootScope){
    var $stateChangeStartCallback = $rootScope.$on('$stateChangeStart', (event, toState) => {
       this.title = toState.label;
    });

    $rootScope.$on("$destroy", $stateChangeStartCallback);
  }
}
