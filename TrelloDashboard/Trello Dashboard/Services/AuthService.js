angular.module("trelloDashboard").service("AuthService", ['$location', AuthService]);

function AuthService($location) {
    var self = this;
    self.authorize = authorize;
    self.isAuthorized = isAuthorized;
    self.deauthorize = deauthorize;
    self.onAuthorize = onAuthorize;

    function authorize() {
        Trello.authorize({
            type: "popup",
            success: self.onAuthorize,
            error: function () { console.log("error"); },
            scope: { write: true, read: true }
        });
    }

    function onAuthorize() {
        console.log("in onauth");
        if (isAuthorized()) {
            console.log("auth");
            $location.url("/Dashboard");
        }
            //COMMENT THIS
        else {
            console.log("not auth");
        }

    }

    function deauthorize() {
        Trello.deauthorize();
    }

    function isAuthorized() {
        return Trello.authorized();
    }
    return self;
}