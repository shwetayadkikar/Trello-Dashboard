﻿angular.module("trelloDashboard")
       .directive("activities", [activitiesDirective]);

function activitiesDirective() {
    return {
        restrict: 'E',
        scope: {
            actions: "=",
            user: "="
        },
        templateUrl: "Templates/Activities.html",
        link: function (scope, element, attrs) {
            console.log("inside activities:");
            console.log(scope.actions);
            scope.filterMemberActivities = filterMemberActivities;
            scope.identifyUpdateAction = identifyUpdateAction;

            //filter
            function filterMemberActivities(action) {
                var username = scope.user.username.toLowerCase();
                var actionSubject = action.memberCreator;
                var actionObject = action.member;
                var returnFlag = actionSubject.username.toLowerCase() === username;
                if (returnFlag == false && actionObject != undefined) {
                    returnFlag = actionObject.username.toLowerCase() === username;
                }
                return returnFlag;
            }

            function identifyUpdateAction(old) {
                var keys = [];
                angular.forEach(old, function (value, key) {
                    this.push(key);
                }, keys);
                return keys[0];
            }


        }
    };


}