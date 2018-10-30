// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova','angular.filter'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.search', {
    url: '/search/:incidentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  .state('app.cart', {
    url: '/cart/:incidentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller: 'CartCtrl'
      }
    }
  })

   .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
      }
    }
    })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

    .state('app.incidents', {
      url: '/incidents',
      views: {
        'menuContent': {
          templateUrl: 'templates/incidents.html',
          controller: 'IncidentsCtrl'
        }
      }
    })

.state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })

.state('app.calender', {
      url: '/calender',
      views: {
        'menuContent': {
          templateUrl: 'templates/calender.html',
          controller: 'CalenderCtrl'
        }
      }
    })

.state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })

.state('app.profile', {
      url: '/profile/:profileId',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

.state('app.signature', {
      url: '/signature/:incidentId',
      views: {
        'menuContent': {
          templateUrl: 'templates/esignature.html',
          controller: 'SignatureCtrl'
        }
      }
    })

.state('app.invoice', {
      url: '/invoice',
      views: {
        'menuContent': {
          templateUrl: 'templates/invoice.html',
          controller: 'InvoiceCtrl'
        }
      }
    })

.state('app.barcodescan', {
      url: '/barcodescan',
      views: {
        'menuContent': {
          templateUrl: 'templates/barcodescan.html',
          controller: 'BarcodeScanCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/incidents/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/incident.html',
        controller: 'IncidentCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
