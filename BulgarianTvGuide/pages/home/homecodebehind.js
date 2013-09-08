(function () {

    var goToTvSchedulePage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/programDetails/programDetails.html", {
            indexInComputersList: invokeEvent.detail.itemIndex
        });
        //var currentDateId = Data.getCurrentDayId();

        Data.loadOneDay((invokeEvent.detail.itemIndex + 1)); //, currentDateId);
        Windows.Storage.ApplicationData.current.localSettings.values["tvState"] =
            invokeEvent.detail.itemIndex + 1;// + 1;
    }

    WinJS.Utilities.markSupportedForProcessing(goToTvSchedulePage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadPrograms: function () {
           // ViewModels.loadShowList;
        }
        ,
       goToComputerDetailsPage: goToTvSchedulePage
    })
})();