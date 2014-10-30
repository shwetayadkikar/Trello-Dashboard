
angular.module("trelloDashboard")
       .controller("LoginController", ['$rootScope', '$scope', '$location', 'AuthService', 'MemberService', LoginController]);


function LoginController($rootScope, $scope, $location, AuthService, MemberService) {
    var self = this;
    self.Login = login;
    self.Logout = logout;
    self.isUserAuthorized = isUserAuthorized;

    function login() {
        //logout();

        AuthService.authorize();


    }


    function isUserAuthorized() {
        return AuthService.isAuthorized();
    }

    function logout() {
        AuthService.deauthorize();
        $rootScope.UserLoggedIn = false;
    }


}