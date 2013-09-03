(function () {

    var goToComputerDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/programDetails/programDetails.html", {
            indexInComputersList: invokeEvent.detail.itemIndex
        });
        var currentDateId = Data.getCurrentDayId();

        Data.loadOneDay((invokeEvent.detail.itemIndex + 1), currentDateId);
    }

    WinJS.Utilities.markSupportedForProcessing(goToComputerDetailsPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadPrograms: function () {
           // ViewModels.loadShowList;
        }
        ,
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