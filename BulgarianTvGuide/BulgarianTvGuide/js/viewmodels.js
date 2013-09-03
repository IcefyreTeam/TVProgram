(function () {

    var tvList = new WinJS.Binding.List([]);
    var showList = new WinJS.Binding.List([]);

    var loadTvList = function (tvs) {
        var currentCount = tvList.dataSource.list.length;
        tvList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < tvs.length; i++) {
            tvList.push(tvs[i]);
        }
    }

    var groupedShowList = showList.createGrouped (
        function groupKeySelector(item) { return item.dayId; },
        function groupDataSelector(item) { return item; }
    );

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(day) {
        return list.createFiltered(function (item) { return item.dayId === day; });
    }


    var loadShowList = function (shows) {
        var currentCount = showList.dataSource.list.length;
        showList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < shows.length; i++) {
            showList.push(shows[i]);
        }
    }
    var addToShowList = function (shows) {
        for (var i = 0; i < shows.length; i++) {
            showList.push(shows[i]);
        }
    }

    var unloadShowList = function () {
        var currentCount = showList.dataSource.list.length;
        showList.dataSource.list.splice(0, currentCount);
    }

    WinJS.Namespace.define("ViewModels", {
        loadMainContent: loadTvList,
        computers: tvList,
        loadShowList: loadShowList,
        showList: showList,
        addToShowList:addToShowList,
        unloadShowList: unloadShowList,
        groupedShowList:groupedShowList,
        addComputer: function (name, manufacturer, processorName, processorGHz, memoryMB) {
            Data.addComputer(new Models.ComputerModel(name, manufacturer, processorName, processorGHz, memoryMB));
        }
    });
})();