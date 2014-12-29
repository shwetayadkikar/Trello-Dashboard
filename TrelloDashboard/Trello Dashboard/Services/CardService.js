angular.module("trelloDashboard").service("CardService", ['$q', CardService]);

function CardService($q) {
    var self = this;
    self.getCardComments = getCardComments;

    function getCardComments(cardId) {
        return $q(function (resolve) { Trello.get("cards/" + cardId + "/actions?filter=commentCard&fields=data,date", resolve) });
    }

    return self;
}
