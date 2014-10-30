
angular.module("trelloDashboard").service("MemberService", ['$q', MemberService])

function MemberService($q) {
    var self = this;
    self.getLoggedInMember = getLoggedInMember;
    self.getMemberMentions = getMemberMentions;

    function getLoggedInMember() {
        //var deferred = $q.defer();
        //Trello.members.get("me", function(user){ deferred.resolve(user); });
        //return deferred.promise;
        return $q(function (resolve) { Trello.members.get("me", resolve); });
    }

    function getMemberMentions(username, mentionsCallback) {
        Trello.members.get(username + "/notifications?filter=mentionedOnCard", mentionsCallback);
    }

    return self;
}