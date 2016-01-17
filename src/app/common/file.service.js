export class FileService {
  constructor ($q, $http) {
    'ngInject';
    this.$q = $q;
    this.$http = $http;
  }

  getFiles(files) {
    var promises = files.map((file) => {
        return this.$http.get(file);
    });
    return this.$q.all(promises);
  }
}
