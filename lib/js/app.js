angular.module('app', ['angularInlineEdit', 'LocalStorageModule'])
.controller('ToDoController', function($q, storageService) {
  /*****************************
  Variables
  *****************************/
  var self = this;
  this.allStoredItems = [];
  this.todos = [];
  this.count = 0;
  this.class = 'active';
  /*****************************
  Page loads with current localstorage
  *****************************/
  this.todos = storageService.getAllItems()
  /*****************************
  User input storing as object
  *****************************/
  this.formSubmit = function() {
    self.allStoredItems = storageService.getAllItems();
    self.allStoredItems.push({
      todo: self.submittedToDo,
      checked: false
    });
    self.count++;
    self.submittedToDo = null;

    storageService.storeAllItems(self.allStoredItems);
    self.todos = storageService.getAllItems();
  }
  /*****************************
  Toggling 'check' of item
  *****************************/
  this.check = function(item) {
    if(item.checked === false) {
      self.count--;
      item.checked = true;
    } else if(item.checked === true){
      self.count++;
      item.checked = false;
    }
  }
  /*****************************
  'X': delete item from page and localstorage
  *****************************/
  this.remove = function(item) {
    var index = self.todos.indexOf(item)
    if (index > -1) {
      self.todos.splice(index, 1);
      storageService.storeAllItems(self.todos);
    }
  }
  /*****************************
  Delete all items and clearing from localstorage
  *****************************/
  this.removeAll = function() {
    self.todos = [];
    self.todos = self.allStoredItems;
    storageService.storeAllItems(self.allStoredItems);
  }

});
