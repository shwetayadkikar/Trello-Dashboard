angular.module("trelloDashboard").service("AuthService", ['$location', AuthService]);

function AuthService($location) {
    var self = this;
    self.authorize = authorize;
    self.isAuthorized = isAuthorized;
    self.deauthorize = deauthorize;
    //self.onAuthorize = onAuthorize;

    function authorize(onAuthorize) {
        Trello.authorize({
            type: "popup",
            success: onAuthorize,
            error: function () { console.log("error"); },
            scope: { write: true, read: true }
        });
    }    

    function deauthorize() {
        Trello.deauthorize();
    }

    function isAuthorized() {
        return Trello.authorized();
    }
    return self;
}