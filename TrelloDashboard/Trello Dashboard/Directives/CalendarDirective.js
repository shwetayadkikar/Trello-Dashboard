angular.module("trelloDashboard")
       .directive("fullcalendar", ['MemberService', fullcalendarDirective]);

function fullcalendarDirective(MemberService) {
    var linker = function (scope, element, attrs) {
        console.log("inside fullcalendar");

        var dueCards = new Array();
        var dueCardsPromise = MemberService.getDueCards(scope.user.username);
        dueCardsPromise.then(dueCardsCallback);

        function dueCardsCallback(cards) {
            console.log("cards: " + cards);

            angular.forEach(cards, function (card, key) {
                var calendarObj = {
                    title: card.name,
                    start: card.due,
                    url: card.url
                };
                this.push(calendarObj);
            }, dueCards);

            //setup calendar
            $(element[0].firstChild).fullCalendar({
                events: dueCards,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
                columnFormat: {
                    month: 'ddd',    // Mon
                    week: 'ddd D/M', // Mon 9/7
                    day: 'dddd D/M'  // Monday 9/7
                },
                weekMode: 'liquid', //The calendar will have either 4, 5, or 6 weeks, depending on the month. The height of the weeks will stretch to fill the available height. Other values are 'fixed' and 'variable'
                eventLimit: true, // allow "more" link when too many events
                eventLimitClick: 'day', //on click of "more" will go to day view
                editable: false,
                timezone: 'local',
                timeFormat: '', //this property removes time from calendar
                eventMouseover: function (event, jsEvent, view) {
                    $(jsEvent.target).attr('title', event.title);
                }
            });
        }
    }

    return {
        restrict: 'E',
        scope: {
            user: "="
        },
        link: linker,
        template: '<div></div>'
    };
}