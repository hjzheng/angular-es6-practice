describe('MainControllers', () => {
  let vm;

  beforeEach(angular.mock.module('angularEs6Practice'));

  beforeEach(inject(($controller) => {
    vm = $controller('MainController');
  }));

  it('toggleSidebar function, should change toggle variable', () => {
    vm.toggle = false;
    vm.toggleSidebar();
    expect(vm.toggle).toEqual(true);
  });

  describe('getContributors function', () => {
    let navigation;

    beforeEach(inject(($state) => {
      navigation = vm.getNavigation($state);
    }));
    
    it('return object should be Array', () => {
        expect(navigation).toEqual(jasmine.any(Array));
    });

    it('return object should be equal $state object', inject(($state) => {
        expect(navigation.length === $state.get().length).toBeTruthy();
    }));

    it('return object label property should be defined', () => {
        expect(navigation[1].label).toBeDefined();
    });
  });
});
