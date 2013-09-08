(function () {

    var searchQuery = WinJS.Binding.as({ queryText: "" });

    var showList = ViewModels.showList;
    var filteredShows = showList.createFiltered(function (show) {
        if (show.name.toLowerCase().indexOf(searchQuery.queryText.toLowerCase()) > -1) {
            return true;
        }

        return false;
    });

    var changeSearchQuery = function (text) {
        showList = ViewModels.showList;
        searchQuery.queryText = text;
        showList.notifyReload();
    }

    WinJS.Namespace.define("ViewModels.Search", {
        searchShows: filteredShows,
        submitSearchText: changeSearchQuery,
        searchQuery: searchQuery
    });
})()