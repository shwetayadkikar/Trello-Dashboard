angular.module("trelloDashboard").service("BoardService", ['$q', BoardService]);

function BoardService($q) {
    var self = this;
    self.getBoardActions = getBoardActions;

    function getBoardActions(boardId) {
        return $q(function (resolve) { Trello.get("boards/" + boardId + "/actions", resolve) });
    }

    return self;
}
