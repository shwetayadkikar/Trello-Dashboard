angular.module("trelloDashboard")
       .directive("mentions", ['MemberService', mentionsDirective]);

function mentionsDirective(MemberService) {
    return {
        restrict: 'E',
        scope: {
            mentionslist: "="
        },
        template: '<div>{{ mentionslist[0].data.text }}</div>',
        link: function (scope, element, attrs) {
          
            console.log("inside mentions:");
            console.log(scope);
          
           

        }

    };
       
}

