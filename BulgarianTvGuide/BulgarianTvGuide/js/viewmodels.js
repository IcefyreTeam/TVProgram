(function () {

    var tvList = new WinJS.Binding.List([]);
    var showList = new WinJS.Binding.List([]);

    var loadTvList = function (computerDTOs) {
        //var computerDTOs = Data.tvs;

        var currentCount = tvList.dataSource.list.length;
        tvList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < computerDTOs.length; i++) {
            tvList.push(computerDTOs[i]);
        }
    }

    var loadShowList = function (showsDTOs) {
        //var computerDTOs = Data.tvs;

        var currentCount = showList.dataSource.list.length;
        showList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < showsDTOs.length; i++) {
            showList.push(showsDTOs[i]);
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
        unloadShowList: unloadShowList,
        addComputer: function (name, manufacturer, processorName, processorGHz, memoryMB) {
            Data.addComputer(new Models.ComputerModel(name, manufacturer, processorName, processorGHz, memoryMB));
        }
    });
})();