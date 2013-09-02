(function () {
    var computersList = new WinJS.Binding.List([]);

    var loadComputers = function (computerDTOs) {
        //var computerDTOs = Data.initData();

        var currentCount = computersList.dataSource.list.length
        computersList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < computerDTOs.length; i++) {
            computersList.push(computerDTOs[i]);
        }
    }

    WinJS.Namespace.define("ViewModels", {
        loadComputers: loadComputers,
        computers: computersList,
        showList: function (index) {
            return new WinJS.Binding.List(computersList.getAt(index).listShows);
        },
        addComputer: function (name, manufacturer, processorName, processorGHz, memoryMB) {
            Data.addComputer(new Models.ComputerModel(name, manufacturer, processorName, processorGHz, memoryMB));
        }
    });
})();