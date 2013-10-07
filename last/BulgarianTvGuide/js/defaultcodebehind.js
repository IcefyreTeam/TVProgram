(function () {

    var goToAddComputer = function(){
        WinJS.Navigation.navigate("/pages/addcomputer/addcomputer.html");
    }

    WinJS.Utilities.markSupportedForProcessing(goToAddComputer);

    WinJS.Namespace.define("DefaultCodeBehind", {
        goToAddComputer: goToAddComputer
        });
})()