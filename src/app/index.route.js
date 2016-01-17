export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      label: "main"
    })
    .state('main.dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard',
      label: "Dashboard",
      icon: "fa-tachometer",
      resolve: {
              dashboardData: function(FileService, toastr){
                  
                  var reg = /Finished '(.*)' after ([\d\.]*) (.*)/;

                  return FileService.getFiles(['assets/data/gulpTask.json','assets/data/gulp.log']).then(function(all){

                      if(all[0].status == 200 && all[1].status == 200) {

                        var staticData = _.toArray(all[0].data.tasks);

                        var totalTaskNum = staticData.length;

                        var runningData = [];

                        var gulplogs = all[1].data.split("[");
                        for (var i = gulplogs.length - 1; i >= 0; i--) {
                           var matches = gulplogs[i].match(reg);
                           if(matches && matches.length != 0){
                             runningData.push({
                                name: matches[1],
                                time: matches[2],
                                unit: matches[3],
                                countTime: ( matches[3] == "ms" ? (matches[2] * 1000) : matches[2] )
                             });
                           }
                        }

                        var doneTaskNum = runningData.length;

                        var totalTime = 0;
                        var labels = [];
                        var chartData = [];
                        chartData[0] = [];

                        runningData.forEach(function(item){
                            totalTime = totalTime + Number(item.countTime); 
                            labels.push(item.name);
                            chartData[0].push(item.countTime);
                        });

                        var series = ['Task Name'];
                        var options = {
                           responsive: true
                        };

                        totalTime = Math.round(totalTime*1000)/1000000 + " ms";

                        angular.merge(runningData, staticData);

                        var gridData = runningData; 

                        return {
                          'gridData' : gridData,
                          'totalTaskNum' : totalTaskNum,
                          'totalTime': totalTime,
                          'doneTaskNum': doneTaskNum,
                          'chartData': chartData,
                          'labels': labels,
                          'options': options,
                          'series': series
                        };
                      
                      } else {
                        //toastr
                        toastr.error('Can not get the dashboard data', 'Error');
                      }
                  });
              }
      }
    })
    .state('main.grid', {
      url: '/grid',
      templateUrl: 'app/grid/grid.html',
      controller: 'GridController',
      controllerAs: 'grid',
      label: "Grid",
      icon: "fa-table"
    });

  $urlRouterProvider.otherwise('/main/dashboard');
}
