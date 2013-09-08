/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="models.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
(function () {

    //var server = "http://localhost:52807/";                     //local
    var server = "http://bulgariantvprograms.apphb.com/";     //cloud
    var tvs = [];
    var days = [];

    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

    getTvs = function () {
        return tvs;
    }
    getDays = function () {
        return days;
    }

    var setTvs = function (tv) {
        if (localSettings.values["firstInit"] == true) {
            for (var i = 1; i < tv.length; i++) {
                localSettings.values["lud" + i] = -1;
                localSettings.values["lur" + i] = -1; //lastUpdateRequest;
            }
        }

        tvs = tv;
    }

    var setDays = function (day) {
        var currentDateId = Data.getCurrentDayId(day);
        localSettings.values["today"] = currentDateId;
        days = day;
    }
    //var addShow = function (day) {
    //    days = day;
    //}
    //var addShowsToday = function (show) {
    //    showsToday.push(show);
    //}

    var setOneDay = function (tv, today) {
        var localFolder = Windows.Storage.ApplicationData.current.localFolder;
        localSettings.values["tvState"] = tv;
        //localSettings.values["firstInit"] = true;
        //var lastUpdatedDay = localSettings.values["lud" + tv];

        if (today == null) {
            today = localSettings.values["today"];
        }

        if (localSettings.values["lud" + tv] != -1) {
            lastUpdatedDay = localSettings.values["lud" + tv];
            for (var from = today; from < lastUpdatedDay + 1; from++) {
                initOrDownload({ cmd: "" + tv + "-" + from, day: from })
            }
        }
        else {
            lastUpdatedDay = localSettings.values["today"] - 1;
        }


        //for (var from = day; from < lastUpdatedDay + 1; from++) {
        //    initOrDownload({ cmd: "" + tv + "-" + from, day: from })
        //}
        if (localSettings.values["lur" + tv] < localSettings.values["today"]) {
            new WinJS.Promise(function (today) {
                //var updateDays = [];

                //updateDays.push(new Models.ProgramUpdate(tv, lastUpdatedDay));//new Date(localSettings.values["lud" + tv-1]) )); //4));//

                //new WinJS.Promise(function (downloadedResponseText) {
                //    downloadPost(server + "api/data/PostProgramSchedule", updateDays).then(function (responseText) {
                //        downloadedResponseText(responseText);
                //    });

                new WinJS.Promise(function (downloadedResponseText) {
                    downloadPost(server + "api/data/PostTvProgramUpdate", new Models.ProgramUpdate(tv, lastUpdatedDay)).then(function (responseText) {
                        downloadedResponseText(responseText);
                    }),
                    function (error) {
                        //------------------------->ot tuk da se poeme
                    };
                }).then(function (responseText) {
                    var json = JSON.parse(responseText);
                    var filename = "";

                    json.forEach(function (days) {
                        var dayId = days.dataId;

                        //for (var i = 0; i < json.length; i++) {
                        new WinJS.Promise(function (complete) {
                            var listOfShowsToSave = new Array();
                            for (var showIndex = 0; showIndex < days.shows.length ; showIndex++) {        //parsvane v modela za 1 den
                                listOfShowsToSave.push(new Models.Show(days.shows[showIndex].name,
                                  days.shows[showIndex].startAt));
                            }
                            //if (localSettings.values["lud" + shows.programId] < days[shows.dataId - 1].date) {

                            for (var i = 0; i < listOfShowsToSave.length - 1; i++) {                                     //promenq prodyljitelnosta na predavaneto
                                listOfShowsToSave[i].setDuration(listOfShowsToSave[i + 1].startAt);
                            }

                            if (localSettings.values["tvState"] == tv) {//shows.programId) {
                                //var thisDay =days[].;
                                //var thisDayId;
                                //var d = getDays();
                                //for (var i = 0; i < d.length; i++) {
                                //    if (d[i].id == dataId) {//shows.dataId - 1) { //dataId) {//
                                //        thisDay = d[i].name;
                                //        thisDayId = d[i].id;
                                //        //break;x
                                //    }
                                //}
                                var dayName = getDays()[dayId].name;

                                var tempShows = [];                         /// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> shows
                                listOfShowsToSave.forEach(function (show) {
                                    tempShows.push(
                                        {
                                            dayId: dayId,
                                            dayName: dayName,
                                            name: show.name,
                                            startAt: show.startAt,
                                            dur: show.dur
                                        });
                                })
                                ViewModels.addToShowList(tempShows);
                            }
                            complete(listOfShowsToSave);
                        }).then(
                            function (showListPush) {
                                //filename = "" + json[i].programId + "-" + json[i].dataId;
                                return localFolder.createFileAsync(
                                    "" + tv + "-" + dayId + ".txt",
                                    Windows.Storage.CreationCollisionOption.openIfExists)
                                .then(function (file) {
                                    saveToFile(file, JSON.stringify(showListPush));
                                }).done(function () {
                                    if (localSettings.values["lud" + tv] < dayId) {
                                        localSettings.values["lud" + tv] = dayId;
                                    }
                                });
                            })
                    })
                }).done(function () {
                    localSettings.values["lur" + tv] = localSettings.values["today"];
                    var x = 34343434;
                })
            })
        }
    }

    var initData = function () {
        //Windows.Storage.ApplicationData.current.clearAsync()
        //localSettings.values["hadInitSettings"] = false;
        if (!localSettings.values["hadInitSettings"]) {
            localSettings.values["firstInit"] = true;
            localSettings.values["tvState"] = 0;
            localSettings.values["downloadState"] = 0;

            localSettings.values["hadInitSettings"] = true;
        }
        //if (!localSettings.values["firstInit"]) {

        //}
        ////localSettings.deleteContainer.valueOf("tvState");
        //if (!localSettings.values["tvState"]) {

        //}
        //if (!localSettings.values["downloadState"]) {

        //}
        initTvsAndDays();
    }


    var initTvsAndDays = function () {
        return new WinJS.Promise(function (complete) {
            tvOpenOrDownload()                              //dl or load     TVS
            .then(function (data) {
                setTimeout(function () {
                    var tvs = data;
                    ViewModels.loadMainContent(getTvs());
                    daysOpenOrDownload(data)                    //dl or load     DAYS
                    .then(function (days) {
                        localSettings.values["firstInit"] = false;
                        //    setTimeout(function () {
                        //        if (localSettings.values["firstInit"]== true) {        //ifFirstStart
                        //            localSettings.values["downloadState"] = 0;
                        //            initInitiolDayleShows()
                        //            //.then(function () {                          //-> add tv.day[DateTimeNow].shows
                        //            //    setTimeout(function () {
                        //            localSettings.values["firstInit"] = false;
                        //            //        //updateAllToLastDay();
                        //            //    }, 200);
                        //            //})
                        //        }
                        //    }, 200);
                    })
                }, 100);
            });
        });
    }

    var updateAllToLastDay = function () {
        var updateDays = [];
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
                                complete();
                            });

            });
        });
    }

    var UpdateForAllDays = function (updateDays) {
        var localFolder = Windows.Storage.ApplicationData.current.localFolder;
        var tempTvs = getTvs();
        return new WinJS.Promise(function (complete) {
            new WinJS.Promise(function (downloadedResponseText) {
                downloadPost(server + "api/data/PostProgramSchedule", updateDays).then(function (responseText) {
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
                            var tvs = json;
                            //tvs.push(new Models.Program(0, "nullTvName", json[0].lastUpdate));
                            //for (var i = 0, len = json.length; i < len; i++) {
                            //    tvs.push(new Models.Program(json[i].id, json[i].name, json[i].lastUpdate));
                            //}
                            setTvs(tvs);
                            complete(tvs);
                        }
                        else if (cmd.cmd == "Days") {
                            var days = [];
                            //days.push(new Models.Day(0, "nullDayName", null));
                            for (var i = 0, len = json.length; i < len; i++) {
                                //json.forEach(function (day) {
                                days.push(new Models.Day(json[i].id, json[i].name, json[i].date));
                            }
                            setDays(days);
                            complete(days);
                        }
                        else if (cmd.cmd == "FirstDay") {
                            complete();
                        }
                        else {
                            var thisDay;
                            var d = getDays();
                            for (var i = 0; i < d.length; i++) {
                                if (d[i].id == cmd.day) {
                                    thisDay = d[i].name;
                                    thisDayId = d[i].id;
                                }
                            }
                            var tempShows = [];                         /// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> shows
                            json.forEach(function (show) {
                                tempShows.push(
                                    {
                                        dayId: thisDayId,//cmd.day,
                                        dayName: thisDay,
                                        name: show.name,
                                        startAt: show.startAt,
                                        dur: show.dur
                                    });
                            })
                            //var returnDay = tempShows[tempShows.length - 1].dayId;

                            ViewModels.addToShowList(tempShows);
                            complete(tempShows);
                        }
                    });
        });
    }

    var dlTvNamesAndParseToLocal = function (fileName) {
        var localFolder = Windows.Storage.ApplicationData.current.localFolder;
        return new WinJS.Promise(function (completex) {
            if (fileName == "FirstDay") {
                new WinJS.Promise(function (downloadedResponseText) {
                    download(server + "api/Data/InitPrograms").then(function (responseText) {
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
                            }
                            for (var i = 0; i < showListPush.length - 1; i++) {                                     //promenq prodyljitelnosta na predavaneto
                                showListPush[i].setDuration(showListPush[i + 1].startAt);
                            }
                            setTimeout(function () {



                                if (localSettings.values["tvState"] == tv.id) {
                                    var thisDayId = localSettings.values["today"];
                                    var thisDay = days[thisDayId].name;

                                    var tempShows = [];                         /// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> shows
                                    showListPush.forEach(function (show) {
                                        tempShows.push(
                                            {
                                                dayId: thisDayId,
                                                dayName: thisDay,
                                                name: show.name,
                                                startAt: show.startAt,
                                                dur: show.dur
                                            });
                                    })

                                    ViewModels.addToShowList(tempShows);
                                }

                            }, 5000)
                            //addShowsToday(new Models.Schedule(
                            //    tvs[tv.id - 1].programName,
                            //    days[tv.schedules[0].dataId - 1].name,
                            //    showListPush));


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
                                download(server + "api/data/InitNameOfTVsModel").then(function (responseText) {
                                    var qweqw = 1;
                                    downloadedResponseText(responseText);
                                });
                            }
                            else if (fileName == "Days") {
                                download(server + "api/Data/InitDays").then(function (responseText) {
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
               }
               ,
               function (error) {
                   console.log(error.tostring());
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
               }
               ,
               function (error) {
                   console.log(error.toString()); //------------------> TUK
               }
           );
    }

    var getCurrentDayId = function (d) {
        //var currentDay = getCurrentDateString();
        var today = new Date();

        var id = 1;
        while (today > d[id].date) {
            id++;
        }
        //for (var i = 0, len = d.length; i < len; i++) {
        //    if (d[i].date == Date.parse(currentDay)) {
        //        id = d[i].id;
        //        break;
        //    }
        //}
        return id-1 ;
    }
    var getCurrentDateString = function () {
        var currentDate = new Date();
        var year = currentDate.getFullYear().toString();
        var month = (currentDate.getMonth() + 1).toString();
        var day = currentDate.getDate();

        if (month.length == 1) {
            month = "0" + month;
        }

        if (day.length == 1) {
            day = "0" + day;
        }

        var dateToString = "" + year + "-" + month + "-" + day + "T00:00:00";
        return dateToString;
    }


    WinJS.Namespace.define("Data", {
        getCurrentDayId: getCurrentDayId,
        tvs: getTvs,
        initData: initData,
        loadOneDay: setOneDay

    });
})()