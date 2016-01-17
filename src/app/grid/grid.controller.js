export class GridController {
  constructor ($scope, $http, uiGridConstants, toastr) {
    'ngInject';
    var _getPage = _.debounce(_.bind(this.getPage, this), 1000);
    
    this.height = null;
    this.paginationOptions = {
      pageNumber: 1,
      pageSize: 10,
      sortName: null,
      sortDirection: null,
      filters: []
    };


    this.gridOptions = {
      paginationPageSizes: [10, 25, 50, 75],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,
      useExternalFiltering: true,
      enableFiltering: true,
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 35,
      columnDefs: [
        { name: 'name' },
        { name: 'gender' },
        { name: 'company' }
      ],
      onRegisterApi: (gridApi) => {
        var _this = this;
        _this.gridApi = gridApi;

        gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
          if (sortColumns.length == 0) {
            _this.paginationOptions.sortName = null;
          } else {
            _this.paginationOptions.sortName = sortColumns[0].name;
            _this.paginationOptions.sortDirection = sortColumns[0].sort.direction; 
          }
          _this.getPage($http, uiGridConstants);
        });

        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          _this.paginationOptions.pageNumber = newPage;
          _this.paginationOptions.pageSize = pageSize;
          
          _this.getPage($http, uiGridConstants);
        });

        gridApi.core.on.filterChanged($scope, function() {
          _this.paginationOptions.filters = [];
          var grid = this.grid;
          grid.columns.forEach(function(column){
            _this.paginationOptions.filters.push({name: column.field, value: column.filters[0].term});
          });
           
          _getPage($http, uiGridConstants);
        });

        //for select API
        gridApi.selection.on.rowSelectionChanged($scope, (row) => {
          var msg = 'row ' + row.entity.name + " selected: " + row.isSelected;
          toastr.info(msg);
        });
 
        gridApi.selection.on.rowSelectionChangedBatch($scope, (rows) => {
          var msg = 'rows changed ' + rows.length;
          toastr.info(msg);
        });
     }
    } 

    this.getPage($http, uiGridConstants);
  }

  setHeight (extra) {
    this.height = ((this.gridOptions.data.length * 30) + 30);
    if (extra) {
       this.height += extra;
    }
  }

  getPage ($http, uiGridConstants) {
     var url;
      switch(this.paginationOptions.sortDirection) {
        case uiGridConstants.ASC:
          url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
          break;
        case uiGridConstants.DESC:
          url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
          break;
        default:
          url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
          break;
      }

      $http.get(url)
      .success((data) => {
        this.gridOptions.totalItems = 100;
        var firstRow = (this.paginationOptions.pageNumber - 1) * this.paginationOptions.pageSize;
        this.gridOptions.data = data.slice(firstRow, firstRow + this.paginationOptions.pageSize);

        this.setHeight(65);
      });
  }

}