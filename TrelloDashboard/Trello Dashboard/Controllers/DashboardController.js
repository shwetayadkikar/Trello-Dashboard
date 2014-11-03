angular.module("trelloDashboard")
       .controller("DashboardController", ['$scope', '$location', 'MemberService', 'AuthService', 'user', DashboardController]);


function DashboardController($scope, $location, MemberService, AuthService, user) {
    var self = this;
    self.allMentions = {};
    $scope.Logout = logout;
    $scope.user = user;
    console.log(user);

    function logout() {
        console.log("logging out!");
        AuthService.deauthorize();
        $location.url("/");
    }

    //function mentionsCallback(mentions) {
    //    console.log(mentions);
    //    self.allMentions = mentions;
    //}
    //console.log($scope.$parent.User);
    //if ($scope.$parent.User) {
    //    MemberService.getMemberMentions($scope.$parent.User.username, mentionsCallback);
    //}



}