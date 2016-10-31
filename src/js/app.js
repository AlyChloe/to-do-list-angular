angular.module('app', ['angularInlineEdit', 'LocalStorageModule'])
.controller('ToDoController', function($q, storageService) {
  /*****************************
  Variables
  *****************************/
  var self = this;
  this.allStoredItems = [];
  this.todos = [];
  this.count = 0;
  this.checkFilter;
  /*****************************
  Filter
  *****************************/
  this.navList = [
    {title: 'All'},
    {title: 'Active', check: false},
    {title: 'Completed', check: true}
  ]
  this.select = function(item) {
    self.selected = item;
  };
  this.isActive = function(item) {
    return self.selected === item;
  };
  /*****************************
  Page loads with current localstorage
  *****************************/
  this.todos = storageService.getAllItems()
  this.count = this.todos.length;
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
  Delete all completed items and clearing from localstorage
  *****************************/
  this.removeAll = function() {
    for(var i = 0; i < self.todos.length; i++) {
      if(self.todos[i].checked === true) {
        var index = self.todos.indexOf(self.todos[i]);
        if (index > -1) {
          self.todos.splice(index, 1);
          storageService.storeAllItems(self.todos);
        }
      }
    }
  }

});
