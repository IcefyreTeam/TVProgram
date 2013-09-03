// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/programDetails/programDetails.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element,
               ViewModels.computers.getAt(options.indexInComputersList));
            var showList = ViewModels.showList;
            var container = document.getElementById("ShowsListView");
            var shows = new WinJS.UI.ListView(container, {
                itemTemplate: document.getElementById("short-computer-template"),
                itemDataSource: showList.dataSource,
                layout: { type: WinJS.UI.GridLayout },
                scrollPosition: 0
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            ViewModels.unloadShowList();
        },

        updateLayout: function (element, viewState, lastViewState) {
            // Respond to changes in viewState.

            // Get the ListView control. 
            var viewStateExampleListView =
                element.querySelector("#ShowsListView").winControl;

            // Use a ListLayout if the app is snapped or in full-screen portrait mode. 
            if (viewState === Windows.UI.ViewManagement.ApplicationViewState.snapped ||
                viewState === Windows.UI.ViewManagement.ApplicationViewState.fullScreenPortrait) {

                // If layout.Horizontal is false, the ListView
                // is already using a ListLayout, so we don't
                // have to do anything. We only need to switch
                // layouts when layout.horizontal is true. 
                if (viewStateExampleListView.layout.horizontal) {
                    viewStateExampleListView.layout = new WinJS.UI.ListLayout();
                }
            }

                // Use a GridLayout if the app isn't snapped or in full-screen portrait mode. 
            else {
                // Only switch layouts if layout.horizontal is false. 
                if (!viewStateExampleListView.layout.horizontal) {
                    viewStateExampleListView.layout = new WinJS.UI.GridLayout();
                }
            }
        }
    });
})();
