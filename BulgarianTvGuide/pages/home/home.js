(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
            //HomeCodeBehind.callLoadPrograms();
        },
        ready: function (element, options) {
            // TODO: Initialize the page here.
            this.updateLayout(element, Windows.UI.ViewManagement.ApplicationView.value, null);
        },

        updateLayout: function (element, viewState, lastViewState) {

            // Respond to changes in viewState.

            // Get the ListView control. 
        var viewStateExampleListView =
            element.querySelector("#programsListView").winControl;
        var appHeader = document.getElementsByClassName('pagetitle');
            // Use a ListLayout if the app is snapped or in full-screen portrait mode. 
        if (viewState === Windows.UI.ViewManagement.ApplicationViewState.snapped ||
            viewState === Windows.UI.ViewManagement.ApplicationViewState.fullScreenPortrait) {

            // If layout.Horizontal is false, the ListView
            // is already using a ListLayout, so we don't
            // have to do anything. We only need to switch
            // layouts when layout.horizontal is true. 
            if (viewStateExampleListView.layout.horizontal) {
                viewStateExampleListView.layout = new WinJS.UI.ListLayout();
                appHeader[0].innerText = "Програмата";
            }
        }
   
            // Use a GridLayout if the app isn't snapped or in full-screen portrait mode. 
        else 
        {
            // Only switch layouts if layout.horizontal is false. 
            if (!viewStateExampleListView.layout.horizontal) {
                viewStateExampleListView.layout = new WinJS.UI.GridLayout();
                appHeader[0].innerText = "Телевизионна програма";
            }
        }

    }
    });
})();
