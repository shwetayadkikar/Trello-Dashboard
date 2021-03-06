﻿
angular.module("trelloDashboard").service("MemberService", ['$q', MemberService])

function MemberService($q) {
    var self = this;
    self.getLoggedInMember = getLoggedInMember;
    self.getMemberMentions = getMemberMentions;
    self.getMemberActions = getMemberActions;
    self.getMemberNotifications = getMemberNotifications;
    self.getDueCards = getDueCards;
    self.getBoards = getBoards;
    self.getSomeMember = getSomeMember;

    function getLoggedInMember() {
        //var deferred = $q.defer();
        //Trello.members.get("me", function(user){ deferred.resolve(user); });
        //return deferred.promise;
        return $q(function (resolve) { Trello.members.get("me", resolve); });
    }

    function getMemberMentions(username) {
        return $q(function (resolve) { Trello.members.get(username + "/notifications?filter=mentionedOnCard", resolve) });
    }

    function getMemberActions(username) {
        return $q(function (resolve) { Trello.members.get(username + "/actions", resolve) });
    }

    function getMemberNotifications(username) {
        return $q(function (resolve) { Trello.members.get(username + "/notifications", resolve) });
    }

    function getDueCards(username) {
        return $q(function (resolve) { Trello.members.get(username + "/cards?fields=name,due,url,idBoard", resolve) });
    }

    function getBoards(username) {
        return $q(function (resolve) { Trello.members.get(username + "/Boards?fields=name,id", resolve) });
    }

    function getTeamMembers(username) {
        return $q(function (resolve) { Trello.members.get("chinmay12", resolve) });
    }

    function getSomeMember() {
        return $q(function (resolve) { Trello.members.get("chinmay12", resolve) });
    }

    
    //function getMembersActivityFeed(username, boardId) {
    //   return $q(function (resolve) { Trello.Boards.get(boardId + "/actions", resolve) });
    //    //promise.then(function (actions) { filterBoardActionsByUser(actions, username) });
    //}

    //function filterBoardActionsByUser(actions, username) {
    //    var filteredActions = actions.filter(function () { return (this.memberCreator.username.toLowerCase() === username.toLowerCase() || this.member.username.toLowerCase() === username.toLowerCase()); })
    //}

    return self;
}