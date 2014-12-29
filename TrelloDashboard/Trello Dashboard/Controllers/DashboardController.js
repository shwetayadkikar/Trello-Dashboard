angular.module("trelloDashboard")
       .controller("DashboardController", ['$scope', '$location', 'MemberService', 'BoardService', 'AuthService', 'user', DashboardController]);


function DashboardController($scope, $location, MemberService, BoardService, AuthService, user) {
    var self = this;
    $scope.filterByBoard = filterByBoard;
    $scope.user = user;
    $scope.allMentions = {};
    $scope.mentions = {};
    $scope.actions = {};
    $scope.boards = {};
    $scope.selectedBoardId = "";
    $scope.selectedBoard = "Select Board";
    $scope.currentpage = "mydashboard";
    console.log(user);

    var mentionsPromise = MemberService.getMemberMentions(user.username);
    var actionsPromise = MemberService.getMemberActions(user.username);//BoardService.getBoardActions("5437cbfb7fb61a024da81a8a");
    var boardsPromise = MemberService.getBoards(user.username);

    mentionsPromise.then(mentionsCallback);
    actionsPromise.then(actionsCallback);
    boardsPromise.then(boardsCallback);

    //private callback functions
    function mentionsCallback(mentions) {
        console.log(mentions);
        $scope.mentions = mentions;
        $scope.allMentions = mentions;
    }

    function actionsCallback(actions) {
        //var notificationsPromise = MemberService.getMemberNotifications(user.username);
        console.log(actions);
        $scope.AllActions = actions;
        $scope.actions = actions;
        //notificationsPromise.then(function (notifications) {
        //    for (var i = 0; i < notifications.length; i++) {
        //        $scope.actions.push(notifications[i]);
        //    }
        //});
    }
    
    function boardsCallback(boards) {
        $scope.boards = boards;
    }

    // public functions
   

    function filterByBoard(board) {
        //$scope.allMentions.
        $scope.selectedBoardId = board.id;
        $scope.selectedBoard = board.name;
        if (board.id != '') {
            console.log("filtering");
            console.log($scope.selectedBoardId);
            $scope.actions = $scope.AllActions.filter(function (element, index, array) { if (element.data.board) { return element.data.board.id == board.id }; return false; });
            $scope.mentions = $scope.allMentions.filter(function (element, index, array) { if (element.data.board) { return element.data.board.id == board.id }; return false; });
        }
        else {
            $scope.actions = $scope.AllActions;
            $scope.mentions = $scope.allMentions;
        } 
    }  


}