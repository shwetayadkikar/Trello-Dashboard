angular.module("trelloDashboard")
       .controller("DashboardController", ['$scope', 'MemberService', 'user', DashboardController]);


function DashboardController($scope, MemberService, user) {
    var self = this;
    self.allMentions = {};
    $scope.user = user;
    console.log(user);

    //function mentionsCallback(mentions) {
    //    console.log(mentions);
    //    self.allMentions = mentions;
    //}
    //console.log($scope.$parent.User);
    //if ($scope.$parent.User) {
    //    MemberService.getMemberMentions($scope.$parent.User.username, mentionsCallback);
    //}



}