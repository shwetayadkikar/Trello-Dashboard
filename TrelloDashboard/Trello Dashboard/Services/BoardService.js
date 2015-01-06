angular.module("trelloDashboard").service("BoardService", ['$q', BoardService]);

function BoardService($q) {
    var self = this;
    self.getBoardActions = getBoardActions;
    self.getBoardMembers = getBoardMembers;

    function getBoardActions(boardId) {
        return $q(function (resolve) { Trello.get("boards/" + boardId + "/actions", resolve) });
    }

    function getBoardMembers(boardId) {
        return $q(function (resolve) { Trello.get("boards/" + boardId + "/members", resolve) });
    }

    return self;
}
