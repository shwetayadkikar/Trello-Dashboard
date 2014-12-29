angular.module("trelloDashboard")
       .directive("headerbar", ['$location', 'AuthService', headerBarDirective]);

function headerBarDirective($location, AuthService) {
    return {
        restrict: 'E',
        scope: {
            user: "=",
            currentpage : "="
        },
        templateUrl: "Templates/HeaderBar.html",
        link: function (scope, element, attrs) {

            scope.Redirect = Redirect;
            scope.Logout = logout;

            console.log("inside headerbar:");
            console.log(scope);

            function Redirect(url) {
                console.log("Redirecting!");
                $location.url(url);
            }

            function logout() {
                console.log("logging out!");
                AuthService.deauthorize();
                $location.url("/");
            }

        }

    };

}