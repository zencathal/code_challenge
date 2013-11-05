var app = angular.module("app", ['ui.codemirror'])
  .config(function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/finish', {
      templateUrl: 'views/finish.html',
      controller: 'FinishCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/login'});
  })
  .controller('LoginCtrl', ['$scope', 'SharedService', '$location', function ($scope, SharedService, $location) {
    $scope.login = function() {
      SharedService.setName($scope.credentials.name);
      SharedService.setEmail($scope.credentials.email);
      $location.path('/home');
    };
  }])
  .controller('HomeController', ['$scope', 'SharedService', '$location', '$http', function($scope, SharedService, $location, $http) {
    if (SharedService.getEmail() === '' || SharedService.getName() === '') {
      $location.path('/login');
    }

    var problemText = '//name: ' + SharedService.getName() + '\n//email: ' + SharedService.getEmail() + '\n';
    $scope.editorOptions = {
      value: problemText,
      lineWrapping: true,
      lineNumbers: true,
      mode: 'javascript',
      theme: 'base16-dark'
    };

    $scope.logOut = function() {
      console.log($scope.remaining);
      SharedService.setCode($scope.x);
      $location.path('/finish');
    };
  }])
  .controller('FinishCtrl', function($scope, SharedService) {
    $scope.code = SharedService.getCode().split('\n');
  })
  .factory('SharedService', ['$location', function($location) {
    var name = '', email = '', code = '', time = '';
    return {
      getName: function () {
        return name;
      },
      getEmail: function () {
        return email;
      },
      getCode: function (value) {
        return code;
      },
      getTime: function (value) {
        return time;
      },
      setName: function (value) {
        name = value;
      },
      setEmail: function (value) {
        email = value;
      },
      setCode: function (value) {
        code = value;
      },
      setTime: function (value) {
        time = value;
      }
    };
}]);
