angular.module("trelloDashboard")
       .controller("BurndownController", ['$scope', '$location', '$q', 'MemberService', 'CardService', 'user', BurndownController]);

function BurndownController($scope, $location, $q, MemberService, CardService, user) {

    $scope.hoursBurntTillDate = 0; //till date
    $scope.totalNoOfDays = 0;
    $scope.endDate = new Date();
    $scope.startDate = new Date();
    $scope.realTimeData = new Array(); // real time x, y values (x = day, y = burnt days)

    console.log("inside burndown");
    var dueCardsPromise = MemberService.getDueCards(user.username);
    dueCardsPromise.then(getBurndownChartData);

    function getBurndownChartData(cards) {
        $scope.endDate = new Date(cards[0].due);
        $scope.startDate =new Date("12/14/2014");//getCardCreatedDate(cards[0].id);
        angular.forEach(cards, function (card, key) {
            if (card.due > $scope.endDate) {
                $scope.endDate = card.due;
            }
            //var currentStartDate = getCardCreatedDate(card.id);
            //if (currentStartDate < $scope.startDate) {
            //    $scope.startDate = currentStartDate;
            //}
        }, null);

        $scope.totalNoOfDays = workingDaysBetweenDates($scope.startDate, $scope.endDate);
        for (var i = 1; i <= $scope.totalNoOfDays; i++) {
            var item = {};
            item.x = 'day' + i;
            item.y = $scope.totalNoOfDays;
            $scope.realTimeData.push(item);
        }

        var allCommentsRequests = [];
        angular.forEach(cards, function (card, key) {
            var commentsPromise = CardService.getCardComments(card.id);
            allCommentsRequests.push(commentsPromise);
        }, null)

        $q.all(allCommentsRequests).then(function (response) {
            var allComments = [];
            for (var i = 0; i < response.length; i++) {
                if (response[i].length > 0) {
                    allComments = allComments.concat(response[i]);
                }
            }
            console.log(allComments.length);
            getCardCommentsCallback(allComments);
        });
    }

    function getCardCommentsCallback(comments) {
        var hoursBurntOnCard = 0;
        angular.forEach(comments, function (comment, key) {
            var commentText = comment.data.text;
            var commentDate = new Date(comment.date);
            var dayIndex = workingDaysBetweenDates($scope.startDate, commentDate);
            var hoursBurnt = parseTextToGetHoursBurnt(commentText);
            for (var index = dayIndex; index < $scope.realTimeData.length; index++) {
                $scope.realTimeData[index].y = $scope.totalNoOfDays - (((($scope.totalNoOfDays - parseInt($scope.realTimeData[index].y)) * 8) + hoursBurnt) / 8); // multiply Y value by 8 to convert into hours then divide the result by 8 to convert back into days
            }
            hoursBurntOnCard = hoursBurntOnCard + hoursBurnt;
        }, null);

        $scope.hoursBurntTillDate = $scope.hoursBurntTillDate + hoursBurntOnCard;
        console.log($scope.realTimeData);
        var xValues = []; angular.forEach($scope.realTimeData, function (item, key) { this.push(item.x); }, xValues);
        var yValues = []; angular.forEach($scope.realTimeData, function (item, key) { this.push(item.y); }, yValues);
        var yIdealValues = [], i = $scope.totalNoOfDays; angular.forEach($scope.realTimeData, function (item, key) { this.push(i--); }, yIdealValues);

        $(function () {
            $('#container').highcharts({
                title: {
                    text: 'Burndown',
                    //center
                },
                subtitle: {
                    text: 'Source: Trello.com',

                },
                xAxis: {
                    categories: xValues,
                },
                yAxis: {
                    title: {
                        text: 'Days left'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: 'days'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Ideal',
                    data: yIdealValues
                }, {
                    name: 'RealTime',
                    data: yValues
                }]
            });
        });
    }

    function getCardCreatedDate(id) {
        return new Date(1000 * parseInt(id.substring(0, 8), 16));
    }



    function workingDaysBetweenDates(startDate, endDate) {

        var iWeeks, iDateDiff, iAdjust = 0;

        if (endDate < startDate) return -1;                 // error code if dates transposed

        var iWeekday1 = startDate.getDay();                // day of week
        var iWeekday2 = endDate.getDay();

        iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1;   // change Sunday from 0 to 7
        iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;

        if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1;  // adjustment if both days on weekend

        iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1;    // only count weekdays
        iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

        // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
        iWeeks = Math.floor((endDate.getTime() - startDate.getTime()) / 604800000)

        if (iWeekday1 <= iWeekday2) {
            iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
        } else {
            iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
        }

        iDateDiff -= iAdjust                            // take into account both days on weekend

        // add 1 because dates are inclusive

        return (iDateDiff + 1);
    }

    function parseTextToGetHoursBurnt(text) {
        var startIndex = text.indexOf('(');
        var numberArray = new Array();
        for (var index = startIndex + 1; index < text.length; index++) {
            if (!isNaN(text[index])) {
                numberArray.push(text[index]);
            } else if (text[index] === ")") {
                break;
            }
        }
        var number = numberArray.join("");
        if (!isNaN(number))
            return parseInt(number);
        return 0;
    }

    function sumOfPreviousDaysWork(dayIndex) {
        var sum = 0;
        for (var i = 0; i <= dayIndex; i++) {
            sum = sum + parseInt($scope.realTimeData[i].y);
        }
        return sum;
    }
}
