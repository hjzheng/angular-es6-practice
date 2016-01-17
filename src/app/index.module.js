import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { GridController } from './grid/grid.controller';
import { ApPanelDirective } from './common/apPanel.directive.js';
import { ApStatsDirective } from './dashboard/apStats.directive.js';
import { FileService } from './common/file.service.js';


angular.module('angularEs6Practice', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 
      'ui.router', 'ui.bootstrap', 'toastr', 'ui.grid', 'ui.grid.pagination', 'ui.grid.autoResize', 
      'ui.grid.selection', 'chart.js'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .directive('apPanel', ApPanelDirective)
  .directive('apStats', ApStatsDirective)
  .service('FileService', FileService)
  .controller('MainController', MainController)
  .controller('GridController', GridController)
  .controller('DashboardController', DashboardController);
