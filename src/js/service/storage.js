angular.module('app')
.service('storageService', function(localStorageService) {
  this.storeAllItems = function(allStoredItems) {
    localStorageService.set('todo', allStoredItems);
  }

  this.getAllItems = function() {
    return localStorageService.get('todo') || [];
  }
});
