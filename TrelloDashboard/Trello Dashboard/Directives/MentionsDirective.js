angular.module("trelloDashboard")
       .directive("mentions", ['MemberService', mentionsDirective]);

function mentionsDirective(MemberService) {
    return {
        restrict: 'E',
        scope: {
            mentionslist: "=",           
        },
        templateUrl: "Templates/Mentions.html",
        link: function (scope, element, attrs) {
          
            console.log("inside mentions:");
            console.log(scope);        

        }

    };
       
}

