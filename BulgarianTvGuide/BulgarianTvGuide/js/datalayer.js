/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="models.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
(function () {
    var tvs = [];
    var days = [];

    var setTvs = function (tv) {
        tvs = [];
        tvs = tv;
    }
    var setDays = function (day) {
        days = [];
        days = day;
    }

    var initData = function () {
        var localSettings = Windows.Storage.ApplicationData.current.localSettings;

        if (!localSettings.values["firstInit"]) {
            localSettings.values["firstInit"] = true;
        }
        var asd = [];
        var asdd = initTvsAndDays().then(function (all) {
            asd = all; // etooooooooooooooooooooooooooo tova sa ti dannite za parse-vane !!!!!!!!!!!! - all

            var x = 5;
        }).then(function () {
            ViewModels.loadComputers(asd);
            var p = 42;
        });
    }

    var initTvsAndDays = function () {
        var self = this;
        return new WinJS.Promise(function (complete) {
            tvOpenOrDownload()
            .then(function (data) {
                //daysOpenOrDownload();

                setTimeout(function () {
                    //var tvs = data;
                    daysOpenOrDownload().then(function (days) {
                        //WinJS.Application.local.remove("FirstDay.txt");      /// must be remove after 
                        setTimeout(function () {
                            //var asda2s = days;

                            //var daysss2 = days;
                            //var daysss2 = days.days;
                            var asdd = tvs;
                            WinJS.Application.local.remove("FirstDay.txt");
                            showsFirstDay(days).then(function (all) {
                                complete(all);
                                //setTimeout(function () {
                                //    new WinJS.Promise(function (complete) {

                                //        var asdasd = 5353;
                                //        var asdas = all;
                                //        var iojkoet = 53;
                                //    })
                                //    var asd = all;
                                //    var asd = 989;
                                //    //complete(all);
                                //}, 200)
                            });
                            //complete(all);
                        }, 200);


                        var x = 34535;
                        //return {tvs, day}

                    })

                    //return ;


                    var dasfsd = 35;

                    //    if (localSettings.values["firstInit"] == true) {
                    //        new WinJS.Promise(function (complete) {
                }, 100);
            });
            ////////.then(function (days) {
            ////////    //WinJS.Application.local.remove("FirstDay.txt");      /// must be remove after 
            ////////    var asda2s = days;
            ////////    setTimeout(function () {
            ////////        var daysss = ddd;
            ////////        var daysss2 = days;
            ////////        var daysss2 = days.days;
            ////////        var asdd = tvs;
            ////////        showsFirstDay(tvs, days);
            ////////        complete(all);
            ////////    }, 21000);

            ////////    var dasfsd = 35;

            ////////    //    if (localSettings.values["firstInit"] == true) {
            ////////    //        new WinJS.Promise(function (complete) {
            ////////})
            //.then(function (data) {
            //    var asd = data.all;
            //    //var as2d = data.tvs;
            //    complete(asd);
            //})

            //)
            //complete(asd);
        });
    }

    var tvOpenOrDownload = function () {
        return new WinJS.Promise(function (complete) {
            tvs = initOrDownload({ cmd: "TvNames" });
            complete(tvs);
        })
    }
    var daysOpenOrDownload = function () {
        return new WinJS.Promise(function (complete) {
            setTimeout(function () {
                days = initOrDownload({ cmd: "Days" });
                complete(days);

            }, 100)

        })
    }
    var showsFirstDay = function (days) {
        return initOrDownload({ cmd: "FirstDay", day: days });
    }

    var initOrDownload = function (cmd) {
        return new WinJS.Promise(function (complete, error) {
            if (cmd.cmd == "FirstDay") {
                dlTvNamesAndParseToLocal(cmd.cmd)
            }
            dlTvNamesAndParseToLocal(cmd.cmd)
                    .then(function (json) {
                        if (cmd.cmd == "TvNames") {
                            var tvs = [];
                            var jsonResponse = JSON.parse(json);
                            for (var i = 0, len = jsonResponse.length; i < len; i++) {
                                tvs.push(new Models.Program(jsonResponse[i].id, jsonResponse[i].name, jsonResponse[i].lastUpdate));
                            }
                            //json.forEach(function (prog) {
                            //    tvs.push(new Models.Program(prog.id, prog.name, prog.lastUpdate));
                            //});
                            setTvs(tvs);
                            complete(tvs);
                        }
                        else if (cmd.cmd == "Days") {
                            var days = [];
                            var tvs = cmd.tvs;
                            json.forEach(function (day) {
                                days.push(new Models.Day(day.id, day.name, day.date));
                            });
                            setDays(days);
                            complete(days);
                        }
                        else if (cmd.cmd == "FirstDay") {
                        //    setTimeout(function () {
                        //        //var showListPush = new Array();
                        //        //var filename = "";
                        //        //var all = new Array();

                        //        //for (var tv = 0; tv < json.length ; tv++) {
                        //        //    for (var day = 0; day < json[tv].schedules.length ; day++) {
                        //        //        showListPush = new Array();
                        //        //        for (var showIndex = 0; showIndex < json[tv].schedules[day].show.length ; showIndex++) {
                        //        //            showListPush.push(new Models.Show(json[tv].schedules[day].show[showIndex].name,
                        //        //               json[tv].schedules[day].show[showIndex].startAt));
                        //        //            var asd = 523532532;
                        //        //        }
                        //        //        //var asd = cmd.tv._value[json[tv].id - 1].programName;
                        //        //        //var d = cmd.day._value[json[tv].schedules[day].dataId - 1].name;
                        //        //        //showListPush.fixDuration();
                        //        //        for (var i = 0; i < showListPush.length - 1; i++) {
                        //        //            showListPush[i].setDuration(showListPush[i + 1].startAt);
                        //        //        }




                        //        //        //newSchedule.fixDuration();
                        //        //        all.push(new Models.Schedule(
                        //        //            cmd.tv._value[json[tv].id - 1].programName,
                        //        //            cmd.day[json[tv].schedules[day].dataId - 1].name,
                        //        //            showListPush
                        //        //            ));

                        //        //        var askjfdkasf = 3535;
                        //        //    }
                            //        //}
                            var xsd = 5353;
                            complete(json);
                        //    }, 1000)
                        }
                    });
        });
    }
    var dlTvNamesAndParseToLocal = function (fileName) {
        var localFolder = Windows.Storage.ApplicationData.current.localFolder;
        return new WinJS.Promise(function (complete) {
            if (fileName == "FirstDay") { // ili update
                new WinJS.Promise(function (downloadedResponseText) {
                    download("http://bulgariantvprograms.apphb.com/api/Data/InitPrograms").then(function (responseText) {
                        var qweqw = 1;
                        downloadedResponseText(responseText);
                    });
                }).then(function (responseText) {
                    var json = JSON.parse(responseText);

                    var showListPush = new Array();
                    var filename = "";
                    var all = new Array();


                    for (var tv = 0; tv < json.length ; tv++) {
                        for (var day = 0; day < json[tv].schedules.length ; day++) {
                            showListPush = new Array();
                            for (var showIndex = 0; showIndex < json[tv].schedules[day].show.length ; showIndex++) {
                                showListPush.push(new Models.Show(json[tv].schedules[day].show[showIndex].name,
                                   json[tv].schedules[day].show[showIndex].startAt));
                                var asd = 523532532;
                            }
                            //var asd = cmd.tv._value[json[tv].id - 1].programName;
                            //var d = cmd.day._value[json[tv].schedules[day].dataId - 1].name;
                            //showListPush.fixDuration();
                            for (var i = 0; i < showListPush.length - 1; i++) {
                                showListPush[i].setDuration(showListPush[i + 1].startAt);
                            }
                            filename = "" + json[tv].id + "-" + json[tv].schedules[day].dataId;
                            localFolder.createFileAsync(filename + ".txt", Windows.Storage.CreationCollisionOption.failIfExists).then(
                                function (file) {
                                    saveToFile(file, responseText);
                                });



                            //newSchedule.fixDuration();
                            all.push(new Models.Schedule(
                                tvs[json[tv].id - 1].programName,
                                days[json[tv].schedules[day].dataId - 1].name,
                                showListPush
                                ));

                            //var askjfdkasf = 3535;
                        }
                    }

                    complete(all);
                })


            }
            else {


                localFolder.createFileAsync(fileName + ".txt", Windows.Storage.CreationCollisionOption.failIfExists).then(
                    function (file) {
                        new WinJS.Promise(function (downloadedResponseText) {
                            if (fileName == "TvNames") {
                                download("http://bulgariantvprograms.apphb.com/api/data/InitNameOfTVsModel").then(function (responseText) {
                                    var qweqw = 1;
                                    downloadedResponseText(responseText);
                                });
                            }
                            else if (fileName == "Days") {
                                download("http://bulgariantvprograms.apphb.com/api/Data/InitDays").then(function (responseText) {
                                    var qweqw = 1;
                                    downloadedResponseText(responseText);
                                });
                            }

                        }).then(
                            function (responseText) {


                                saveToFile(file, responseText);
                                var programs = JSON.parse(responseText);
                                var x = 8;
                                complete(programs);
                            },
                            function (messager) {
                                error(messager);
                            }
                        )
                    },
                    function () {
                        WinJS.Application.local.readText(fileName + ".txt", "failed to open file").then(
                            function (content) {
                                //setImmediate(function () {
                                var programs = JSON.parse(content);//JSON.parse();
                                var asd = 35;
                                complete(programs);
                                //});

                            });
                    });
            }
        })

    }
    var saveToFile = function (file, responseText) {
        file.openTransactedWriteAsync().then(function (transaction) {
            var writer = Windows.Storage.Streams.DataWriter(transaction.stream);
            writer.writeString(responseText.toString());
            //JSON.stringify(responseText));
            var n = 321432;
            writer.storeAsync().done(function () {
                var asdasd = 5;
                transaction.commitAsync().done(function () {
                    var asdkjasdk = 5;
                    transaction.close();
                });
            });

        },
                            function (message) {
                                WinJS.Application.local.remove(fileName + ".txt");
                            });
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



    // ot tuk nadolu ne e moe !!!!!!!!!!!!!!!! moje da triesh


    //var programs = [];


    //var computers = [];

    //var getComputers = function () {
    //    return computers;
    //}

    ////MAIN INIT
    //var initData = function (computerModel) {
    //    return initNameOfPrograms();


    //    //initNameOfPrograms();


    //    //computers.push(computerModel);
    //}





    //var download = function (download) {
    //    return WinJS.xhr(
    //            {
    //                url: download,
    //                //type: "GET",
    //                responseType: "json"
    //            }).then(
    //           function (response) {
    //               return response.responseText;
    //           },
    //           function (error) {
    //               console.log(error.toString());
    //           }
    //       );
    //}

    //var dlProgramsAndParseToLocal = function () {
    //    return download("http://bulgariantvprograms.apphb.com/api/Data/InitPrograms");
    //}




    //var addComputer = function (computerModel) {
    //    computers.push(computerModel);
    //}

    //var initNameOfPrograms = function () {
    //    initOrDownload({ cmd: "TvNames" });
    //}



    //var dlTvNamesAndParseToLocal = function (fileName) {
    //    var localFolder = Windows.Storage.ApplicationData.current.localFolder;
    //    return new WinJS.Promise(function (complete) {
    //        localFolder.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.failIfExists).then(
    //            function (file) {
    //                var asdasd = 78878;
    //                download("http://bulgariantvprograms.apphb.com/api/data/InitNameOfTVsModel").then(
    //                    function (responseText) {
    //                        var a1 = 3;
    //                        file.openTransactedWriteAsync().then(function (transaction) {
    //                            var writer = Windows.Storage.Streams.DataWriter(transaction.stream);
    //                            writer.writeString(JSON.stringify(responseText));
    //                            var n = 321432;
    //                            writer.storeAsync().done(function () {
    //                                var asdasd = 5;
    //                                transaction.commitAsync().done(function () {
    //                                    var asdkjasdk = 5;
    //                                    transaction.close();
    //                                    //async
    //                                });
    //                            });
    //                            var programs = JSON.parse(responseText);
    //                            complete(programs);
    //                        },
    //                        function (message) {
    //                            WinJS.Application.local.remove(fileName);
    //                        });
    //                    },
    //                    function (messager) {
    //                        error(messager);
    //                    }
    //                )
    //            },
    //            function () {
    //                WinJS.Application.local.readText(fileName, "failed to open file").then(
    //                    function (content) {
    //                        var programs = JSON.parse(JSON.parse(content));
    //                        complete(programs);
    //                    });
    //            });
    //    })
    //}

    //initOrDownload = function (cmd) {
    //    var self = this;
    //    return new WinJS.Promise(function (complete, error) {
    //        var fileName;
    //        if (cmd.cmd == "TvNames") {
    //            fileName = "TvNames.txt"
    //            dlTvNamesAndParseToLocal(fileName)
    //                .then(function (programs) {
    //                    programs.forEach(function (prog) {
    //                        programs.push(new Models.Program(prog.id, prog.name, prog.lastUpdate));
    //                    });
    //                });
    //        }
    //    });
    //}


    WinJS.Namespace.define("Data", {
        //getComputers: getComputers,
        //addComputer: addComputer,
        initData: initData
    });
})()