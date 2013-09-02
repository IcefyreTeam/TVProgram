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

    var DayModel = WinJS.Class.define(function (id, name, date) {
        this.id = id;
        this.name = name;
        this.date = Date.parse(date);
    })

    var ProgramUpdateModel = WinJS.Class.define(function (id,  lastUpdateDate) {
        this.id = id;
        this.lastUpdateDate = Date.parse(lastUpdateDate);
    })

    var ScheduleModel = WinJS.Class.define(function (name, date,listShows) {
        this.name = name;
        this.listShows = listShows;
        this.date = date;
    },
    {
        fixDuration: function () {
            var self = this;
            for (var i = 0; i < self.listShows.len - 1; i++) {
                self.listShows[i].setDuration(self.listShows[i + 1].startAt);
            }
        }
    })

    var ShowModel = WinJS.Class.define(function (showName, startingTime) {
        this.name = showName;
        this.startAt = startingTime;
        this.dur = 90;//TODO for last user in next Update
    },
    {
        setDuration: function (nextShowStart) {
            var start = this.startAt.split(':');
            var end = nextShowStart.split(':');
            this.dur =
                (parseInt(end[0]) - parseInt(start[0])) * 60 + parseInt(end[1]) - parseInt(start[1])
        }
    })

    WinJS.Namespace.define("Models", {
        Program: ProgramModel,
        Schedule: ScheduleModel,
        Show: ShowModel,
        Day: DayModel,
        ProgramUpdate: ProgramUpdateModel
        //ComputerModel: ComputerModel

    })





    WinJS.Namespace.define("Models", {
        
    })
})()