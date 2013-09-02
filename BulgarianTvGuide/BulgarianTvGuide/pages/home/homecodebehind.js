(function () {

    var goToComputerDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/programDetails/programDetails.html", {
            indexInComputersList: invokeEvent.detail.itemIndex
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToComputerDetailsPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadPrograms: function () {
            //ViewModels.loadPrograms();
        },
    //WinJS.Namespace.define("HomeCodeBehind", {
    //    callLoadPrograms: function () {
    //        new WinJS.Promise(function (com) {
    //            Data.initPrograms();
    //            com();
    //        }).then(function () {
    //            ViewModels.loadPrograms();
    //        });
    //        var x = 389543;
    //    },

    //    callInitPrograms: function () {
    //        new WinJS.Promise(function (com) {
    //            Data.initPrograms();
    //            com();
    //        }).then(function () {
    //            ViewModels.loadPrograms();
    //        }).then(function myfunction() {
    //            var w = 389543;

    //        });
    //    }
       goToComputerDetailsPage: goToComputerDetailsPage
    })
})();