/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="models.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
(function () {
    var tvs = [];
    var days = [];
    var showsToday = [];

    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

    getTvs = function () {
        return tvs;
    }
    getDays = function () {
        return days;
    }

    var setTvs = function (tv) {
        tvs = tv;
    }

    var setDays = function (day) {
        days = day;
    }
    var addShow = function (day) {
        days = day;
    }
    var addShowsToday = function (show) {
        showsToday.push(show);
    }

    var setOneDay = function (tv, day) {
        new WinJS.Promise(function () {
            for (var i = 7; i < 9; i++) {
                initOrDownload({ cmd: "" + tv + "-" + i, day: i });
            }

        })

    }

    var initData = function (currentProgram, currentDay) {
        if (!localSettings.values["firstInit"]) {
            localSettings.values["firstInit"] = true;
        }
        if (!localSettings.values["tvState"]) {
            localSettings.values["tvState"] = 0;
        }
        if (!localSettings.values["downloadState"]) {
            localSettings.values["downloadState"] = -1;
        }
        initTvsAndDays(currentProgram, currentDay);
    }


    var initTvsAndDays = function (currentProgram, currentDay) {
        return new WinJS.Promise(function (complete) {
            tvOpenOrDownload()                              //dl or load     TVS
            .then(function (data) {
                setTimeout(function () {
                    var tvs = data;
                    ViewModels.loadMainContent(getTvs());
                    daysOpenOrDownload()                    //dl or load     DAYS
                        .then(function (days) {
                            setTimeout(function () {
                                //getOneDay(currentProgram, null); 

                                if (localSettings.values["firstInit"] == true) {        //ifFirstStart
                                    localSettings.values["downloadState"] = 0;
                                    initInitiolDayleShows().then(function () {                          //-> add tv.day[DateTimeNow].shows
                                        setTimeout(function () {
                                            //updateAllToLastDay();
                                            var x = 4;
                                        }, 200);
                                    })
                                }
                            }, 200);
                        })
                }, 100);
            });
        });
    }

    var updateAllToLastDay = function () {

        var updateDays = [];
        //getTvs().forEach(function (day) {
        //    updateDay.push(new Models.ProgramUpdate(day.id,day.lastUpdate));
        //})

        //localSettings.values["downloadState"] = -1;
        //localSettings.values["tvState"] = 0;


        updateDays.push(new Models.ProgramUpdate(getTvs()[0].id, getTvs()[0].lastUpdate));
        updateDays.push(new Models.ProgramUpdate(getTvs()[1].id, getTvs()[1].lastUpdate));
        return new WinJS.Promise(function (complete, error) {
            UpdateForAllDays(updateDays).then(function (tempTvs) {
                var localFolder = Windows.Storage.ApplicationData.current.localFolder;
                setTvs(tempTvs);
                return localFolder.createFileAsync(
                                "TvNames.txt",
                                Windows.Storage.CreationCollisionOption.replaceExisting)
                            .then(function (file) {
                                saveToFile(file, JSON.stringify(tempTvs))
                            });

            });
        });
    }

    var UpdateForAllDays = function (updateDays) {
        var localFolder = Windows.Storage.ApplicationData.current.localFolder;
        var tempTvs = getTvs();
        return new WinJS.Promise(function (complete) {
            new WinJS.Promise(function (downloadedResponseText) {
                downloadPost("http://bulgariantvprograms.apphb.com/api/data/PostProgramSchedule", updateDays).then(function (responseText) {
                    downloadedResponseText(responseText);
                });
            }).then(function (responseText) {
                var json = JSON.parse(responseText);
                var filename = "";

                json.forEach(function (shows) {
                    //for (var i = 0; i < json.length; i++) {
                    new WinJS.Promise(function (complete) {
                        var showListPush = new Array();
                        for (var showIndex = 0; showIndex < shows.show.length ; showIndex++) {        //parsvane v modela za 1 den
                            showListPush.push(new Models.Show(shows.show[showIndex].name,
                               shows.show[showIndex].startAt));
                            var asd = 523532532;
                        }
                        if (tempTvs[shows.programId].lastUpdate < shows.dataId) {
                            tempTvs[shows.programId].lastUpdate = shows.dataId;
                        }
                        for (var i = 0; i < showListPush.length - 1; i++) {                                     //promenq prodyljitelnosta na predavaneto
                            showListPush[i].setDuration(showListPush[i + 1].startAt);
                        }

                        complete(showListPush);
                    }).then(
                        function (showListPush) {
                            //filename = "" + json[i].programId + "-" + json[i].dataId;
                            return localFolder.createFileAsync(
                                "" + shows.programId + "-" + shows.dataId + ".txt",
                                Windows.Storage.CreationCollisionOption.openIfExists)
                            .then(function (file) {
                                saveToFile(file, JSON.stringify(showListPush))
                            });
                        })
                    //.then(function (filePromise) {

                    //    //saveToFile("" + tv.id + "-" + tv.schedules[0].dataId + ".txt", JSON.stringify(showListPush))

                    //})
                })
                //forEach end
                //completex();
            }
            );

        })
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
    var initInitiolDayleShows = function (days) {
        return initOrDownload({ cmd: "FirstDay", dayId: days });
    }




    var initOrDownload = function (cmd) {
        return new WinJS.Promise(function (complete, error) {
            dlTvNamesAndParseToLocal(cmd.cmd)
                    .then(function (json) {

                        if (cmd.cmd == "TvNames") {
                            var tvs = [];
                            //var jsonResponse = JSON.parse(json);
                            for (var i = 0, len = json.length; i < len; i++) {
                                tvs.push(new Models.Program(json[i].id, json[i].name, json[i].lastUpdate));
                            }
                            //json.forEach(function (prog) {
                            //    tvs.push(new Models.Program(prog.id, prog.name, prog.lastUpdate));
                            //});
                            setTvs(tvs);
                            complete(tvs);
                        }
                        else if (cmd.cmd == "Days") {
                            var days = [];
                            //var tvs = cmd.tvs;            //moje i da se naloji da se vyrne :?
                            json.forEach(function (day) {
                                days.push(new Models.Day(day.id, day.name, day.date));
                            });
                            setDays(days);
                            complete(days);
                        }
                        else if (cmd.cmd == "FirstDay") {
                            //setTimeout(function myfunction() {
                            //    complete(json);
                            //}, 500
                            //)
                            complete();
                        } else {
                            var thisDay;
                            //while (days == null) {
                            //    setTimeout(function () { }, 100   )
                            //}
                            var d = getDays();
                            for (var i = 0; i < d.length; i++) {
                                if (d[i] == cmd.day) {
                                    thisDay = d[i].name;
                                    //break;
                                }
                            }
                            var tempShows = [];                         /// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> shows
                            json.forEach(function (show) {
                                tempShows.push(
                                    {
                                        dayId: cmd.day,
                                        dayName: thisDay,
                                        name: show.name,
                                        startAt: show.startAt,
                                        dur: show.dur
                                    });
                            })

                            ViewModels.addToShowList(tempShows);
                            complete();
                        }
                    });
        });
    }
    var dlTvNamesAndParseToLocal = function (fileName) {
        var localFolder = Windows.Storage.ApplicationData.current.localFolder;
        return new WinJS.Promise(function (completex) {
            if (fileName == "FirstDay") {
                new WinJS.Promise(function (downloadedResponseText) {
                    download("http://bulgariantvprograms.apphb.com/api/Data/InitPrograms").then(function (responseText) {
                        var qweqw = 1;
                        downloadedResponseText(responseText);
                    });
                }).then(function (responseText) {
                    var json = JSON.parse(responseText);
                    var filename = "";

                    json.forEach(function (tv) {
                        new WinJS.Promise(function (complete) {
                            var showListPush = new Array();
                            for (var showIndex = 0; showIndex < tv.schedules[0].show.length ; showIndex++) {        //parsvane v modela za 1 den
                                showListPush.push(new Models.Show(tv.schedules[0].show[showIndex].name,
                                   tv.schedules[0].show[showIndex].startAt));
                                var asd = 523532532;
                            }
                            for (var i = 0; i < showListPush.length - 1; i++) {                                     //promenq prodyljitelnosta na predavaneto
                                showListPush[i].setDuration(showListPush[i + 1].startAt);
                            }

                            addShowsToday(new Models.Schedule(
                                tvs[tv.id - 1].programName,
                                days[tv.schedules[0].dataId - 1].name,
                                showListPush));


                            complete(showListPush);
                        }).then(
                            function (showListPush) {
                                //filename = "" + tv.id + "-" + tv.schedules[0].dataId;
                                return localFolder.createFileAsync("" + tv.id + "-" + tv.schedules[0].dataId + ".txt",
                                    Windows.Storage.CreationCollisionOption.openIfExists)
                                .then(function (file) {
                                    saveToFile(file, JSON.stringify(showListPush))
                                });
                            })
                        //.then(function (filePromise) {

                        //    //saveToFile("" + tv.id + "-" + tv.schedules[0].dataId + ".txt", JSON.stringify(showListPush))

                        //})
                    })
                    completex();
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
                                completex(programs);
                            },
                            function (messager) {
                                error(messager);
                            }
                        )
                    }
                    ,
                    function () {
                        WinJS.Application.local.readText(fileName + ".txt", "failed to open file").then(
                            function (content) {
                                //setImmediate(function () {                //non used for now
                                var programs = JSON.parse(content);
                                var asd = 35;
                                completex(programs);
                                //});
                            });
                    });
            }
        })

    }
    var saveToFile = function (file, responseText) {
        file.openTransactedWriteAsync().then(function (transaction) {
            var writer = Windows.Storage.Streams.DataWriter(transaction.stream);
            writer.writeString(responseText);

            var n = 321432;
            writer.storeAsync().done(function () {
                var asdasd = 5;
                transaction.commitAsync().done(function () {
                    var asdkjasdk = 5;
                    transaction.close();
                });
            });


        }
        ,
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


    var downloadPost = function (download, json) {
        return WinJS.xhr(
                {
                    type: "post",
                    url: download,
                    headers: { "Content-type": "application/json" },
                    data: JSON.stringify(json)
                }).then(
               function (response) {
                   return response.responseText;
               },
               function (error) {
                   console.log(error.toString());
               }
           );
    }

    var getCurrentDayId = function () {
        var currentDay = getCurrentDateString();

        var id = 0;
        for (var i = 0, len = days.length; i < len; i++) {
            if (days[i].date == Date.parse(currentDay)) {
                id = days[i].id;
                break;
            }
        }
        return id;
    }
    var getCurrentDateString = function () {
        var currentDate = new Date();
        var year = currentDate.getFullYear().toString();
        var month = (currentDate.getMonth() + 1).toString();
        var day = (currentDate.getDay() + 1).toString();

        if (month.length == 1) {
            month = "0" + month;
        }

        if (day.length == 1) {
            day = "0" + day;
        }

        var dateToString = "" + year + "-" + month + "-" + day + "T00:00:00";
        return dateToString;
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
        getCurrentDayId: getCurrentDayId,
        tvs: getTvs,
        initData: initData,
        loadOneDay: setOneDay

    });
})()