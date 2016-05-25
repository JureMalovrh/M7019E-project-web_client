(function () {
  'use strict';

  angular
    .module('apps')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Apps',
      state: 'apps',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'apps', {
      title: 'List Apps',
      state: 'apps.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'apps', {
      title: 'Create App',
      state: 'apps.create',
      roles: ['user']
    });
  }
})();
