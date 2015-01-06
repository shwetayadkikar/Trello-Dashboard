angular.module("trelloDashboard")
       .controller("DashboardController", ['$scope', '$location', 'MemberService', 'BoardService', 'AuthService', 'CardService', '$q', 'user', DashboardController]);


function DashboardController($scope, $location, MemberService, BoardService, AuthService, CardService, $q, user) {
    var self = this;
    $scope.filterByBoard = filterByBoard;
    $scope.user = user;
    $scope.allMentions = [];
    $scope.mentions = [];
    $scope.allCardMentions = {};
    $scope.cardMentions = {};
    $scope.actions = {};
    $scope.boards = {};
    $scope.selectedBoardId = "";
    $scope.selectedBoard = "Select Board";
    $scope.currentpage = "mydashboard";
    console.log(user);

    var actionsPromise = MemberService.getMemberActions(user.username);//BoardService.getBoardActions("5437cbfb7fb61a024da81a8a");
    var boardsPromise = MemberService.getBoards(user.username);
    var cardsPromise = MemberService.getDueCards(user.username);
   

    actionsPromise.then(actionsCallback);
    boardsPromise.then(boardsCallback);
    cardsPromise.then(cardsCallback);


    function actionsCallback(actions) {
        console.log(actions);
        $scope.AllActions = actions;
        $scope.actions = actions;       
    }

    function boardsCallback(boards) {
        $scope.boards = boards;
    }

    function cardsCallback(cards) {
        angular.forEach(cards, function (card, key) {
            var commentsPromise = CardService.getCardComments(card.id);
            commentsPromise.then(commentsCallback);
        }, null);
    }

    function commentsCallback(comments) {
        for (var commentIndex = 0; commentIndex < comments.length; commentIndex++) {
            var commentText = comments[commentIndex].data.text;
            if (commentText.indexOf($scope.user.username) >= 0) {
                var mention = {};
                mention.memberCreator = comments[commentIndex].memberCreator;
                mention.data = comments[commentIndex].data;
                mention.date = comments[commentIndex].date;
                $scope.mentions.push(mention);
                $scope.allMentions.push(mention);
            }
        }
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