export class DashboardController {
  constructor (dashboardData, $scope, $timeout) {
    'ngInject';
    this.gridOptions = {
      enableSorting: true,
      enableFiltering: true,
      columnDefs: [
        { name: 'name', width: '25%', displayName: 'Task Name' },
        { name: 'countTime', width: '15%', displayName: 'Time (μs)', enableFiltering: false, 
            cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'},
        { name: 'dep', width: '30%' , displayName: 'Dep Tasks', 
            cellTemplate: '<div class="ui-grid-cell-contents"><ul class="list-inline"><li ng-repeat="data in COL_FIELD">{{data}}</li></ul></div>' },
        { name: 'help', width: '30%', displayName: 'Description', enableFiltering: false, enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD.message}}</span></div>'  }
      ],
      onRegisterApi: function( gridApi ) {
        this.gridApi = gridApi;
      }
    };

    this.gridOptions.data = dashboardData.gridData;
    this.totalTime = dashboardData.totalTime;
    this.totalTaskNum = dashboardData.totalTaskNum;
    this.doneTaskNum = dashboardData.doneTaskNum;
    this.labels = dashboardData.labels;
    this.chartData = dashboardData.chartData;
    this.options = dashboardData.options;
    this.series = dashboardData.series; 

    $scope.$on('create', (event, chart) => {
       this.chart = chart;
    });

    $scope.$on("sidebarToggleEvent", () => {
       $timeout(() => {
          this.chart.resize();
          this.chart.render();
       }, 1500);
    });
  }
}
