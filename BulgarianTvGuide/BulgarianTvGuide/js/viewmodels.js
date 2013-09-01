﻿(function () {
    var computersList = new WinJS.Binding.List([]);

    var loadComputers = function(){
        var computerDTOs = Data.getComputers();

        var currentCount = computersList.dataSource.list.length
        computersList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < computerDTOs.length; i++) {
            computersList.push(computerDTOs[i]);
        }
    }

    WinJS.Namespace.define("ViewModels", {
        loadComputers: loadComputers,
        computers: computersList,
        addComputer: function (name, manufacturer, processorName, processorGHz, memoryMB) {
            Data.addComputer(new Models.ComputerModel(name, manufacturer, processorName, processorGHz, memoryMB));
        }
    });
})();