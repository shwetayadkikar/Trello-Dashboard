angular.module("trelloDashboard")
       .directive("fullcalendar", ['MemberService', fullcalendarDirective]);

function fullcalendarDirective(MemberService) {
    var linker = function (scope, element, attrs) {

        console.log("inside fullcalendar");
        scope.dueCards = new Array();
        scope.$watch("selectedboardid", function (newValue, oldValue) {
            console.log(oldValue);
            console.log(newValue);
            var filteredCards = {};
            if (newValue != "") {
                filteredCards = scope.cards.filter(function (element, index, array) { if (element.idBoard) { return element.idBoard == newValue }; return false; });
                getCalendarData(filteredCards);
            }
            else {
                var dueCardsPromise = MemberService.getDueCards(scope.user.username);
                dueCardsPromise.then(getCalendarData);
            }          
           
        });
        var dueCardsPromise = MemberService.getDueCards(scope.user.username);
        dueCardsPromise.then(dueCardsCallback);

        function dueCardsCallback(cards) {
            console.log("cards: " + cards);
            scope.cards = cards;
            getCalendarData(cards);
            //setup calendar
            $(element[0].firstChild).fullCalendar({
                events: scope.dueCards,
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

        function getCalendarData(cards) {
            scope.dueCards = new Array();
            angular.forEach(cards, function (card, key) {
                var calendarObj = {
                    title: card.name,
                    start: card.due,
                    url: card.url
                };
                this.push(calendarObj);
            }, scope.dueCards);
            $(element[0].firstChild).fullCalendar('removeEvents');
            console.log("refersh " + scope.dueCards);
            $(element[0].firstChild).fullCalendar('addEventSource', scope.dueCards);
            $(element[0].firstChild).fullCalendar('rerenderEvents');
        }
    }

    return {
        restrict: 'E',
        scope: {
            user: "=",
            selectedboardid: "="
        },
        link: linker,
        template: '<div></div>'
    };

}