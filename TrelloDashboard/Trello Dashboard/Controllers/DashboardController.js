angular.module("trelloDashboard")
       .controller("DashboardController", ['$scope', '$location', 'MemberService', 'AuthService', 'user', DashboardController]);


function DashboardController($scope, $location, MemberService, AuthService, user) {
    var self = this;
    $scope.Logout = logout;
    $scope.user = user;
    $scope.allMentions = { id : 1};
    console.log(user);

    var promise = MemberService.getMemberMentions(user.username);
    promise.then(mentionsCallback);

    function logout() {
        console.log("logging out!");
        AuthService.deauthorize();
        $location.url("/");
    }

    function mentionsCallback(mentions) {
        console.log(mentions);
        $scope.allMentions = mentions;
    }

    //console.log($scope.$parent.User);
    //if ($scope.$parent.User) {
    //    
    //}



}