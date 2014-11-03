
angular.module("trelloDashboard")
       .controller("LoginController", ['$rootScope', '$scope', '$location', 'AuthService', 'MemberService', LoginController]);


function LoginController($rootScope, $scope, $location, AuthService, MemberService) {
    var self = this;
    self.Login = login;
    self.isUserAuthorized = isUserAuthorized;

    function login() {
        AuthService.authorize();
    }


    function isUserAuthorized() {
        return AuthService.isAuthorized();
    }

    function onAuthorize() {
        console.log("in onauth");
        if (isAuthorized()) {
            console.log("auth");
            $location.url("/Dashboard");
        }
            //COMMENT THIS
        else {
            console.log("not auth");
        }

    }

}