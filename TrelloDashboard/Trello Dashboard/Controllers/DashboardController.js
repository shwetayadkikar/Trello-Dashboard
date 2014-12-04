angular.module("trelloDashboard")
       .controller("DashboardController", ['$scope', '$location', 'MemberService', 'BoardService', 'AuthService', 'user', DashboardController]);


function DashboardController($scope, $location, MemberService, BoardService, AuthService, user) {
    var self = this;
    $scope.Logout = logout;
    $scope.user = user;
    $scope.allMentions = {};
    $scope.actions = {};
    $scope.dueCards = {};
    $scope.boards = {};

    console.log(user);

    var mentionsPromise = MemberService.getMemberMentions(user.username);
    var actionsPromise = MemberService.getMemberActions(user.username);//BoardService.getBoardActions("5437cbfb7fb61a024da81a8a");
    var dueCardsPromise = MemberService.getDueCards(user.username);
    var boardsPromise = MemberService.getBoards(user.username);

    mentionsPromise.then(mentionsCallback);
    actionsPromise.then(actionsCallback);
    dueCardsPromise.then(dueCardsCallback);
    boardsPromise.then(boardsCallback);

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

    function dueCardsCallback(cards) {
        console.log("cards: " + cards);
        var dueCards = new Array();
        angular.forEach(cards, function (card, key) {
            var calendarObj = {
                title: card.name,
                start: card.due
            };
            this.push(calendarObj);
        }, dueCards);
        $scope.dueCards = dueCards;
        console.log("duecards: " + dueCards);
    }

    function boardsCallback(boards) {
        $scope.boards = boards;
    }

    // public functions
    function logout() {
        console.log("logging out!");
        AuthService.deauthorize();
        $location.url("/");
    }



}