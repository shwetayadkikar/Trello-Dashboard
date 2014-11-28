angular.module("trelloDashboard")
       .directive("fullcalendar", [fullcalendarDirective]);

function fullcalendarDirective() {
    var linker = function (scope, element, attrs) {
        element.fullCalendar({
            events: [
                {
                    title: 'event1',
                    start: '2014-11-01'
                },
                {
                    title: 'event2',
                    start: '2014-11-15',
                    end: '2014-11-18'
                },
                {
                    title: 'event3',
                    start: '2014-11-11T12:30:00',
                    allDay: false // will make the time show
                }
            ]
        });
    }

    return {
        restrict: 'A',
        link: linker
    }
}