// For an introduction to the Share Contract template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232513

(function () {
    "use strict";
    var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();

        
    var item;
    var content;

    var app = WinJS.Application;
    var share;

    var shareTextHandler = function (event) {
        var dataRequest = event.request;

        dataRequest.data.properties.title = item.title

        var htmlFormat =
            Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(toStaticHTML(content));

        dataRequest.data.setHtmlFormat(htmlFormat)

    }

    function onShareSubmit() {
        document.querySelector(".progressindicators").style.visibility = "visible";
        document.querySelector(".commentbox").disabled = true;
        document.querySelector(".submitbutton").disabled = true;
        var showList = ViewModels.groupedShowList.selection.getIndices().sort(function (a, b) {
            return a - b;
        });

        var x = 86;
        for (var i = 0; i < showList.length; i++) {
            //.add (showList.innerHTML);
        }
        

        for (var j = indicesList.length - 1; j >= 0; j--) {
            fileList.splice(indicesList[j], 1);
        }

        if (share.data.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
            share.data.getTextAsync().then(function (text) {
                document.body.innerHTML = text;
            });
        }

        setTimeout(function () {
            share.reportCompleted();
        }, 10000);

        share.reportCompleted();
    }

    // This function responds to all application activations.
    app.onactivated = function (args) {
        var thumbnail;

        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            document.querySelector(".submitbutton").onclick = onShareSubmit;
            share = args.detail.shareOperation;

            document.querySelector(".shared-title").textContent = share.data.properties.title;
            document.querySelector(".shared-description").textContent = share.data.properties.description;

            thumbnail = share.data.properties.thumbnail;
            if (thail) {
                // If the share data includes a thumbnail, display it.
                args.setPromise(thumbnail.openReadAsync().done(function displayThumbnail(stream) {
                    document.querySelector(".shared-thumbnail").src = window.URL.createObjectURL(stream);
                }));
            } else {
                // If no thumbnail is present, expand the description  and
                // title elements to fill the unused space.
                document.querySelector("section[role=main] header").style.setProperty("-ms-grid-columns", "0px 0px 1fr");
                document.querySelector(".shared-thumbnail").style.visibility = "hidden";
            }
        }
    };
umbn
    app.start();
})();
