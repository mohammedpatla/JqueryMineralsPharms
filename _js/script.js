// script for final project - Anthony Whitwell, Mohammed Patla
var map;
var profileData;
var companyLocation;
$(document).on("pagecreate", "#finalProject", function() {

    // swipe right event to go back to main page mineral pages
    $(document).on("swiperight", "div[id^='mineral']", function() {
        $.mobile.changePage('#finalProject');
    });

    // swipe right event to go back to main page from pharmaceutical pages
    $(document).on("swiperight", "div[id^='pharmaceutical']", function() {
        $.mobile.changePage('#finalProject');
    });

    $.getJSON("groupMember.json", function(data) {

        profileData = data.students;
        LoadMainProfileData(data);
    });

    $.getJSON("JSON03-mineralsdefinitions.json", function(data) {

        LoadMineralData(data);
    });

    $.ajax({
        url: "Pharmaceutical.xml",
        type: "GET",
        dataType: "xml",
        success: parsePharmaceuticalXML
    });

});

function LoadMainProfileData(data) {

    start = data.students;

    profiles = ["anthonyInfo", "mohammedInfo", "anthonyInfoMap", "mohammedInfoMap"];

    var temp = 0;
    for (x = 0; x < profiles.length; x++) {

        // temp var for setting multiplenames
        if (temp == 2) {
            temp = 0;
        }

        // main content of popup pages for each student
        $("#" + profiles[x]).append(

            "<section data-role='collapsible'>" +
            "<h3 class='ui-btn'>Name</h3>" + "<p>" + start[temp].fullname + "</p>" +
            "</section>" +
            "<section data-role='collapsible'>" +
            "<h3 class='ui-btn'>Student Login</h3>" + "<p>" + start[temp].studentlogin + "</p>" +
            "</section>" +
            "<section data-role='collapsible'>" +
            "<h3 class='ui-btn'>Student Number</h3>" + "<p>" + start[temp].studentno + "</p>" +
            "</section>" +
            "<section data-role='collapsible'>" +
            "<h3 class='ui-btn'>Photo</h3>" + "<p><img src='images/" + start[temp].image + ".jpg' width='70vw'/></p>" +
            "</section>"
        );
        temp++;
        // had to create collapsible set - refresh would not work when dynamically creating the set
        $('[data-role=collapsible-set]').collapsibleset().trigger('create');
    }
}

function LoadMineralData(data) {

    $("#mineralHeader").text(data.mineralsInfo._title);

    start = data.mineralsInfo["phrase-group"];
    for (i = 0; i < start.length; i++) {

        // create the links to the different mineral pages in block-a
        $("#mineralData").append(
            "<a href='#mineral" + i + "' class='ui-btn ui-shadow ui-icon-" + start[i].image + " ui-btn-icon-right'>" +
            start[i].phrase + "</a>"
        );

        // create the different pages for the minerals
        $("body").append(
            "<div data-role='page' id='mineral" + i + "' data-theme='a'>" +
            "<header data-role='header'><h1 class='ui-title'>" + start[i].phrase + "</h1>" + "</header>" +
            "<section class='ui-content' role='main'>" +
            "<p>" + start[i].meaning + "</p>" +
            "<a href='" + start[i]["_reference-url"] + "' class='ui-btn ui-shadow ui-icon-" + start[i].image + " ui-btn-icon-right'>" +
            start[i]._reference + "</a>" +
            "</section>" +
            "<div data-role='footer'>" +
            "<div data-role='navbar'>" +
            "<ul>" +
            "<li>" +
            "<a href='#anthonyMineral" + i + "' class='ui-btn ui-icon-anthony ui-btn-icon-right' data-rel='popup' data-transition='pop'>Anthony</a>" +
            "</li>" +
            "<li>" +
            "<a href='#mohammedMineral" + i + "' class='ui-btn ui-icon-mohammed ui-btn-icon-right' data-rel='popup' data-transition='pop'>Mohammed</a>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "</div>"
        );

        $("#mineral" + i).trigger("pagecreate");

        // create footer for each mineral page
        $("#mineral" + i).append(
            "<div data-role='popup' id='anthonyMineral" + i + "' data-theme='none'>" +
            "<div id='anthonyInfoMineral" + i + "' data-role='collapsible-set'></div></div>" +
            "<div data-role='popup' id='mohammedMineral" + i + "' data-theme='none'>" +
            "<div id='mohammedInfoMineral" + i + "' data-role='collapsible-set'></div></div>"
        );

        $("#anthonyMineral" + i).trigger("create");

        for (x = 0; x < profileData.length; x++) {

            $("#" + profileData[x].image + "InfoMineral" + i).append(
                "<section data-role='collapsible'>" +
                "<h3 class='ui-btn'>Name</h3>" + "<p>" + profileData[x].fullname + "</p>" +
                "</section>" +
                "<section data-role='collapsible'>" +
                "<h3 class='ui-btn'>Student Login</h3>" + "<p>" + profileData[x].studentlogin + "</p>" +
                "</section>" +
                "<section data-role='collapsible'>" +
                "<h3 class='ui-btn'>Student Number</h3>" + "<p>" + profileData[x].studentno + "</p>" +
                "</section>" +
                "<section data-role='collapsible'>" +
                "<h3 class='ui-btn'>Photo</h3>" + "<p><img src='images/" + profileData[x].image + ".jpg' width='70vw'/></p>" +
                "</section>"
            );

            $('[data-role=collapsible-set]').collapsibleset().trigger('create');
        }
    }
}

function Location(name, phone, lat, lng) {
    this.name = name;
    this.phone = phone;
    this.lat = lat;
    this.lng = lng;
}

function parsePharmaceuticalXML(data) {


    // store data for map location
    var long = parseFloat($(data).find("longitude").text());
    var lat = parseFloat($(data).find("latidue").text());
    var companyName = $(data).find("company").text();
    var companyPhone = $(data).find("phone").text();

    companyLocation = new Location(companyName, companyPhone, lat, long);

    // MOHAMMED BUILD YOUR PAGES HERE - AW
    //creates variable for counter
    var y = 0;

    //Header
    $("#pharmaceuticalHeader").text("Medicines");
    //sets data start point
    $(data).find("medicines").find("medicine").each(
        function() {
            //console.log(this);
            //console.log($(this).find("brandname").text());

            // create the links to the different medicine pages in block-a
            $("#pharmaceuticalData").append(
                "<a href='#pharmaceutical" + y + "' class='ui-btn ui-shadow ui-btn-icon-right'>" +
                $(this).find("brandname").text() + "</a>"
            );

            // create the different pages for the medicine
            $("body").append(
                "<div data-role='page' id='pharmaceutical" + y + "' data-theme='a'>" +
                "<header data-role='header'><h1 class='ui-title'>" + $(this).find("brandname").text() + "</h1>" + "</header>" +
                "<section class='ui-content' role='main'>" +
                "<p>" + $(this).find("drugname").text() + "</p><br>" +
                "<p>" + $(this).find("description").text() + "</p><br>" +
                "<p>" + $(this).find("administered").text() + "</p><br>" +
                "<p>" + $(this).find("contraindication").text() + "</p><br>" +
                "</section>" +
                "<div data-role='footer'>" +
                "<div data-role='navbar'>" +
                "<ul>" +
                "<li>" +
                "<a href='#anthonypharmaceutical" + y + "' class='ui-btn ui-icon-anthony ui-btn-icon-right' data-rel='popup' data-transition='pop'>Anthony</a>" +
                "</li>" +
                "<li>" +
                "<a href='#mohammedpharmaceutical" + y + "' class='ui-btn ui-icon-mohammed ui-btn-icon-right' data-rel='popup' data-transition='pop'>Mohammed</a>" +
                "</li>" +
                "</ul>" +
                "</div>" +
                "</div>" +
                "</div>"
            );

            //creates the page
            $("#pharmaceutical" + y).trigger("pagecreate");

            // create footer for each mineral page
            $("#pharmaceutical" + y).append(
                "<div data-role='popup' id='anthonypharmaceutical" + y + "' data-theme='none'>" +
                "<div id='anthonyInfopharmaceutical" + y + "' data-role='collapsible-set'></div></div>" +
                "<div data-role='popup' id='mohammedpharmaceutical" + y + "' data-theme='none'>" +
                "<div id='mohammedInfopharmaceutical" + y + "' data-role='collapsible-set'></div></div>"
            );
            $("#anthonypharmaceutical" + y).trigger("create");
            //$("#mohammedpharmaceutical" + y).trigger("create");


            //set data in footers
            //console.log(profileData);
            for (var x = 0; x < profileData.length; x++) {
                $("#" + profileData[x].image + "Infopharmaceutical" + y).append(
                    "<section data-role='collapsible'>" +
                    "<h3 class='ui-btn'>Name</h3>" + "<p>" + profileData[x].fullname + "</p>" +
                    "</section>" +
                    "<section data-role='collapsible'>" +
                    "<h3 class='ui-btn'>Student Login</h3>" + "<p>" + profileData[x].studentlogin + "</p>" +
                    "</section>" +
                    "<section data-role='collapsible'>" +
                    "<h3 class='ui-btn'>Student Number</h3>" + "<p>" + profileData[x].studentno + "</p>" +
                    "</section>" +
                    "<section data-role='collapsible'>" +
                    "<h3 class='ui-btn'>Photo</h3>" + "<p><img src='images/" + profileData[x].image + ".jpg' width='70vw'/></p>" +
                    "</section>"
                );

                $('[data-role=collapsible-set]').collapsibleset().trigger('create');
            }

            //incriment counter
            y++;

        });
}



function CreateMapPage() {
    $.mobile.changePage('#geoLocationPage');
}

// Have tried multiple page events 
$(document).on("pageshow", "#geoLocationPage", function() {
    console.log(companyLocation.name);
    console.log(companyLocation.lat);
    console.log(companyLocation.lng);
    $("#companyName").text(companyLocation.name);

    mapCompany = new google.maps.LatLng(companyLocation.lat, companyLocation.lng);

    // Set Map options (Step 4)
    mapOptions = {
            center: mapCompany,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        // HYBRID, ROADMAP, SATELLITE, TERRAIN

    // Display Map (Step 5)
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // Marker (Step 6-optional)

    myLoc = new google.maps.Marker({
        map: map,
        icon: "images/pushpin.gif",
        animation: google.maps.Animation.DROP,
        position: mapCompany
    });

    // Info Window (Step 7-optional)
    info = new google.maps.InfoWindow({
        content: "Company Info?<br>" + companyLocation.name +
            "<br>" + companyLocation.phone
    });
    google.maps.event.addListener(myLoc, "click", function() {
        info.open(map, myLoc);
    });

    google.maps.event.trigger(map, 'create');
});

//calls this function. To fix error on load of google maps api
window.loadingmap = function() {

}