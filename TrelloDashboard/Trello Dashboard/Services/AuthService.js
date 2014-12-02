angular.module("trelloDashboard").service("AuthService", ['$location','$q', AuthService]);

function AuthService($location,$q) {
    var self = this;
    self.authorize = authorize;
    self.isAuthorized = isAuthorized;
    self.deauthorize = deauthorize;
    //self.onAuthorize = onAuthorize;

    function authorize() {
        return $q(function (resolve) {
            Trello.authorize({
                type: "popup",
                success: resolve,
                error: function () { console.log("error"); },
                scope: { write: true, read: true },
                name : "Trello Dashboard"
            })
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