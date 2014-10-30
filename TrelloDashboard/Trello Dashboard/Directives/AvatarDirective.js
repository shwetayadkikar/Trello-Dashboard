angular.module("trelloDashboard").directive("avatar", avatarDirective);

function avatarDirective() {
    return{
        restrict: 'E',
        scope: {
            avatarhash: "="
        },
        template: '<img class=avatar ng-src="https://1.gravatar.com/avatar/{{ avatarhash }}?s=56&d=mm&r=G" />',
        link: function (scope, element, attrs) {
            console.log(scope);
            console.log(attrs);
            console.log(element);
        }
    }
}