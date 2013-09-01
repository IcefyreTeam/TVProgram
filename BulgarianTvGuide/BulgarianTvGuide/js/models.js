(function () {
    //var ComputerModel = WinJS.Class.define(function (model, manufacturer, processorModel, processorFrequencyGHz, memoryMB) {
    //    this.model = ""+(model*100) +"px";
    //    this.manufacturer = manufacturer;
    //    this.processor = {}; //very important line, else the processor is added to the prototype and shared between all instances
    //    this.processor.model = processorModel;
    //    this.processor.frequencyGHz = processorFrequencyGHz,
    //    this.memoryMB = memoryMB;
    //}, {
    //    model: "500px",
    //    manufacturer: "",
    //    processor: {
    //        model: "",
    //        frequencyGHz: 0
    //    },
    //    memoryMB: 0
    //})
    var ProgramModel = WinJS.Class.define(function (id, programName, lastUpdateDate) {
        this.id = id;
        this.programName = programName;
        this.lastUpdateDate = Date.parse(lastUpdateDate);
    })

    var ScheduleModel = WinJS.Class.define(function (name, listShows) {
        this.name = name;
        this.listShows = listShows;
        for (var i = 0; i < listShows.lenght - 1; i++) {
            listShows[i].setDuration(listShows[i + 1]);
        }
    })

    var ShowModel = WinJS.Class.define(function (showName, startingTime) {
        this.name = showName;
        this.startTime = startingTime;
        this.duration = 90//TODO for last user in next Update
    },
    {
        setDuration: function (nextShowStart) {
            var start = this.startTime.split(':');
            var end = nextShowStart.split(':');
            this.duration =
                (int.parse(end[0]) - int.parse(start[0])) * 60 + int.parse(end[1]) - int.parse(start[1])
        }
    })

    WinJS.Namespace.define("Models", {
        Program: ProgramModel,
        Schedule: ScheduleModel,
        Show: ShowModel,
        //ComputerModel: ComputerModel

    })





    WinJS.Namespace.define("Models", {
        
    })
})()