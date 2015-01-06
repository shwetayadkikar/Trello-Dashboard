angular.module("trelloDashboard").service("CardService", ['$q', CardService]);

function CardService($q) {
    var self = this;
    self.getCardComments = getCardComments;
    self.getCardMembers = getCardMembers;

    function getCardComments(cardId) {
        return $q(function (resolve) { Trello.get("cards/" + cardId + "/actions?filter=commentCard&fields=data,date,memberCreator", resolve) });
    }

    function getCardMembers(cardId) {
        return $q(function (resolve) { Trello.get("cards/" + cardId + "/members", resolve) });
    }

    return self;
}
