angular.module("trelloDashboard")
       .controller("DashboardController", ['$scope', '$location', 'MemberService', 'BoardService', 'AuthService', 'user', DashboardController]);


function DashboardController($scope, $location, MemberService, BoardService, AuthService, user) {
    var self = this;
    $scope.Logout = logout;
    $scope.user = user;
    $scope.allMentions = {};
    $scope.actions = {};

    console.log(user);

    var mentionsPromise = MemberService.getMemberMentions(user.username);
    var actionsPromise = MemberService.getMemberActions(user.username);//BoardService.getBoardActions("5437cbfb7fb61a024da81a8a");

    mentionsPromise.then(mentionsCallback);
    actionsPromise.then(actionsCallback);

    //private callback functions
    function mentionsCallback(mentions) {
        console.log(mentions);
        $scope.allMentions = mentions;
    }

    function actionsCallback(actions) {
        var notificationsPromise = MemberService.getMemberNotifications(user.username);
        console.log(actions);
        $scope.actions = actions;
        notificationsPromise.then(function (notifications) {
            for (var i = 0; i < notifications.length; i++) {
                $scope.actions.push(notifications[i]);
            }            
        });
    }

    // public functions
    function logout() {
        console.log("logging out!");
        AuthService.deauthorize();
        $location.url("/");
    }

   

}