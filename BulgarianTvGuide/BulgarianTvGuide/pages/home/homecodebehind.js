(function () {

    var goToComputerDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/programDetails/programDetails.html", {
            indexInComputersList: invokeEvent.detail.itemIndex
        });
        var currentDateStr = HomeCodeBehind.getCurrentDateString();
        Data.initData((invokeEvent.detail.itemIndex + 1), currentDateStr);
    }

    WinJS.Utilities.markSupportedForProcessing(goToComputerDetailsPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadPrograms: function () {
           // ViewModels.loadShowList;
        },
        getCurrentDateString: function () {
            var currentDate = new Date();
            var year = currentDate.getFullYear().toString();
            var month = (currentDate.getMonth() + 1).toString();
            var day = (currentDate.getDay() + 1).toString();

            if (month.length == 1) {
                month = "0" + month;
            }

            if (day.length == 1) {
                day = "0" + day;
            }

            var dateToString = "" + year + "-" + month + "-" + day + "T00:00:00";
            return dateToString;
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