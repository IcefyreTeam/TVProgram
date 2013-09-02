(function () {

    var tvList = new WinJS.Binding.List([]);

    var loadTvList = function (computerDTOs) {
        //var computerDTOs = Data.tvs;

        var currentCount = tvList.dataSource.list.length
        tvList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < computerDTOs.length; i++) {
            tvList.push(computerDTOs[i]);
        }
    }

    WinJS.Namespace.define("ViewModels", {
        loadMainContent: loadTvList,
        computers: tvList,
        showList: function (index) {
            localSettings.values["tvState"] = index;
            return new WinJS.Binding.List(tvList.getAt(index).listShows);
        },
        addComputer: function (name, manufacturer, processorName, processorGHz, memoryMB) {
            Data.addComputer(new Models.ComputerModel(name, manufacturer, processorName, processorGHz, memoryMB));
        }
    });
})();