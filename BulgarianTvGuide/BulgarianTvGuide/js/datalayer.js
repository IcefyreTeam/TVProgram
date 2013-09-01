/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="models.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
(function () {
    var programs = [];



    var computers = [];

    var getComputers = function () {
        return computers;
    }

    //MAIN INIT
    var initData = function (computerModel) {
        return initNameOfPrograms();


        //initNameOfPrograms();


        //computers.push(computerModel);
    }



    var initPrograms = function () {
        return initData();
        //return dlProgramsAndParseToLocal().then(function (json) {
        //    var asd = json;
        //    return true;
        //});


    }

    var download = function (download) {
        return WinJS.xhr(
                {
                    url: download,
                    //type: "GET",
                    responseType: "json"
                }).then(
               function (response) {
                   return response.responseText;
               },
               function (error) {
                   console.log(error.toString());
               }
           );
    }

    var dlProgramsAndParseToLocal = function () {
        return download("http://bulgariantvprograms.apphb.com/api/Data/InitPrograms");
    }




    var addComputer = function (computerModel) {
        computers.push(computerModel);
    }

    var initNameOfPrograms = function () {
        initOrDownload({ cmd: "TvNames" });
    }

    

    var dlTvNamesAndParseToLocal = function (fileName) {
        var localFolder = Windows.Storage.ApplicationData.current.localFolder;
        return new WinJS.Promise(function (complete) {
            localFolder.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.failIfExists).then(
                function (file) {
                    var asdasd = 78878;
                    download("http://bulgariantvprograms.apphb.com/api/data/InitNameOfTVsModel").then(
                        function (responseText) {
                            var a1 = 3;
                            file.openTransactedWriteAsync().then(function (transaction) {
                                var writer = Windows.Storage.Streams.DataWriter(transaction.stream);
                                writer.writeString(JSON.stringify(responseText));
                                var n = 321432;
                                writer.storeAsync().done(function () {
                                    var asdasd = 5;
                                    transaction.commitAsync().done(function () {
                                        var asdkjasdk = 5;
                                        transaction.close();
                                        //async
                                    });
                                });
                                var programs = JSON.parse(responseText);
                                complete(programs);
                            },
                            function (message) {
                                WinJS.Application.local.remove(fileName);
                            });
                        },
                        function (messager) {
                            error(messager);
                        }
                    )
                },
                function () {
                    WinJS.Application.local.readText(fileName, "failed to open file").then(
                        function (content) {
                            var programs = JSON.parse(JSON.parse(content));
                            complete(programs);
                        });
                });
        })
    }

    initOrDownload = function (cmd) {
        var self = this;
        return new WinJS.Promise(function (complete, error) {
            var fileName;
            if (cmd.cmd == "TvNames") {
                fileName = "TvNames.txt"
                dlTvNamesAndParseToLocal(fileName)
                    .then(function (programs) {
                        programs.forEach(function (prog) {
                            programs.push(new Models.Program(prog.id, prog.name, prog.lastUpdate));
                        });
                    });
            }
        });
    }


    WinJS.Namespace.define("Data", {
        getComputers: getComputers,
        addComputer: addComputer,
        initPrograms: initPrograms
    });
})()