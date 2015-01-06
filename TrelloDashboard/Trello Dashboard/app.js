
angular.module("trelloDashboard", ['ngRoute']);

angular.module("trelloDashboard").controller("AppController", ['$scope', '$rootScope', 'AuthService', AppController]);

function AppController($scope, $rootScope, AuthService) {
    var self = this;

    //function getAvatarSource(gravatarHash) {
    //    return "http://www.gravatar.com/avatar/" + avatarHash;
    //}
}

angular.module('trelloDashboard').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
     .when('/', {
         templateUrl: 'Views/Login.html',
         controller: 'LoginController'
     })
     .when('/Dashboard', {
         templateUrl: 'Views/Dashboard.html',
         controller: 'DashboardController',
         resolve: {
             user: function (MemberService) {
                 return MemberService.getLoggedInMember();

             }
         }
     })
     .when('/TeamDashboard', {
         templateUrl: 'Views/TeamDashboard.html',
         controller: 'TeamDashboardController',
         resolve: {
             user: function (MemberService) {
                 return MemberService.getLoggedInMember();
             },
         }
     })
    .when('/Burndown', {
        templateUrl: 'Views/Burndown.html',
        controller: 'BurndownController',
        resolve: {
            user: function (MemberService) {
                return MemberService.getLoggedInMember();
            }
        }
    });
}]);


