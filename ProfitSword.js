var currentDate = new Date();
var posX = null;
var posY = null;
var Calendar_currentDate;

var MonthNameArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var MonthNameArrayAbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var gBD, gED;

var gGridX = 320;
var gGridY = 80;
var gutterX = 10;
var gutterY = 15;

document.onmousemove = function (e) {
    if (typeof e == 'undefined') {
        myEvent = window.event;
    } else {
        myEvent = e;
    }
    posX = myEvent.clientX;
    posY = myEvent.clientY;
}

$(document).ready(function () {
    Activate(document);
});

function Activate(element) {
    $('.Button').hover(
     function () { $(this).addClass('hover'); },
     function () { $(this).removeClass('hover'); }
    );
}

function isNumeric(n) {
    return !isNaN(parseFloatReplaceCommas(n)) && isFinite(n);
}

function StopEvent(pE) {
    if (!pE) if (window.event) pE = window.event; else return;
    if (pE.cancelBubble != null) pE.cancelBubble = true;
    if (pE.stopPropagation) pE.stopPropagation();
    if (pE.preventDefault) pE.preventDefault();
    if (window.event) pE.returnValue = false;
    if (pE.cancel != null) pE.cancel = true;
}
// --------DATE Prototypes ------------------------------
Date.prototype.PS_MonthName = function () {
    return MonthNameArray[this.getMonth()];
}

Date.prototype.PS_ShortDate = function () {
    return this.PS_MonthName() + " " + this.getDate() + ", " + this.getFullYear();
}

Date.prototype.PS_LongDate = function () {
    var today = new Date();
    var prefix = "";

    if (this.getDate() == today.getDate())
        prefix = "(Today) ";

    if (this.getDate() == today.PS_AddDay(-1).getDate())
        prefix = "(Yesterday) ";

    if (this.getDate() == today.PS_AddDay(+1).getDate())
        prefix = "(Tomorrow) ";

    return prefix + this.PS_MonthName() + " " + this.getDate() + ", " + this.getFullYear();
}

Date.prototype.PS_MonthYearName = function () {
    return this.PS_MonthName() + "  " + this.getFullYear();
}

Date.prototype.PS_Raw = function () {
    return (this.getMonth() + 1) + "/" + this.getDate() + "/" + this.getFullYear();
}

Date.prototype.PS_Raw_LeadingZeros = function () {
    var Month = this.getMonth() + 1;
    var Day = this.getDate();
    if (Month < 10) {
        Month = "0" + Month;
    }
    if (Day < 10) {
        Day = "0" + Day;
    }

    return Month + "/" + Day + "/" + this.getFullYear();
}

Date.prototype.PS_AddDay = function (d) {
    var tmpDate = new Date(this);
    tmpDate.setDate(this.getDate() + d);

    return tmpDate;
}

Date.prototype.PS_DaysInMonth = function () {
    var int_d = new Date(this.getFullYear(), this.getMonth() + 1, 1);
    var d = new Date(int_d - 1);
    return d.getDate();
}

Date.prototype.PS_FirstDayOfMonth = function () {
    return new Date(this.getFullYear(), this.getMonth(), 1);
}
// -------- End DATE Prototypes ------------------------------

// --------STRING Prototypes ------------------------------
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

// --------end STRING Prototypes ------------------------------

//DONT USE -- USE Dynamic form instead
//function doPostBack(eventTarget, eventArgument) {
//    if (!F.onsubmit || (F.onsubmit() != false)) {
//        F.__EVENTTARGET.value = eventTarget;
//        F.__EVENTARGUMENT.value = eventArgument;
//        F.submit();
//    }
//}

function isNumber(n) {
    return !isNaN(parseFloatReplaceCommas(n)) && isFinite(n);
}

function SelectAllInList(list) {
    $('#' + list + ' input[type=checkbox]').each(function () {
        this.checked = true;
    });
}

function SelectNoneInList(list) {
    $('#' + list + ' input[type=checkbox]').each(function () {
        this.checked = false;
    });
}

function ValidateToFromDate(fromDate, toDate) {
    try {
        if (toDate < fromDate)
            return false;
        else
            return true;
    }
    catch (x) {
        return false;
    }
}

function isArray(obj) {
    if (typeof (obj) == 'undefined' || obj.constructor.toString().indexOf("Array") == -1)
        return false;
    else
        return true;
}

function doLogin() {
    //handel the enter key when logging in
    if (event.keyCode == 13) {
        document.Login.submit();
    }
}

function MergeUrl(t) {
    var UrlDict, AddDict, search;

    UrlDict = UrlKeyPairs(window.location.search.substring(1, window.location.search.length));
    AddDict = UrlKeyPairs(t);

    for (var key in AddDict) {
        UrlDict[key] = AddDict[key]
    }

    search = "";
    for (var key in UrlDict) {
        search = search + key + "=" + UrlDict[key] + "&"
    }

    if (search[search.length - 1] == '&')
        search = search.substring(0, search.length - 1);

    return window.location.pathname + "?" + search;
    //return window.location.pathname + "?x=y";
}

function MergeSearchString(urlSearchString, newSearchString) {
    var UrlDict, AddDict, search;

    UrlDict = UrlKeyPairs(urlSearchString);
    AddDict = UrlKeyPairs(newSearchString);

    for (var key in AddDict) {
        UrlDict[key] = AddDict[key]
    }

    search = "";
    for (var key in UrlDict) {
        search = search + key + "=" + UrlDict[key] + "&"
    }

    if (search[search.length - 1] == '&')
        search = search.substring(0, search.length - 1);

    return search;
    //return window.location.pathname + "?x=y";
}

function UrlKeyPairs(s) {
    var keypairs, keypair; //Dict = Associative array, kinda like a Dictionary in vb
    var Dict = [];

    if (typeof (s) == 'undefined')
        return [];

    if (s.indexOf("&") != -1) {
        keypairs = s.split("&")
        for (var i = 0; i < keypairs.length; i++) {
            if (keypairs[i].indexOf("=") != -1) {
                keypair = keypairs[i].split("=");
                Dict[keypair[0]] = keypair[1];
            }
            else {
                Dict[keypairs[i]] = "";
            }
        }
    }
    else {
        if (s.indexOf("=") != -1) {
            keypair = s.split("=");
            if (keypair[1] == "")
                Dict[keypair[0]] = "";  //cant be empty
            else
                Dict[keypair[0]] = keypair[1]; // keypair[1];
        }
        else {
            Dict = [];
        }
    }

    return Dict
}

/// Use this Method to open a new window and Post Data in the 'F' Form.
///If no post data is needed, use GoNewURL.
function GoNewPage(n) {
    var frm = document.forms["F"];

    frm.method = "post";
    frm.action = n;
    frm.target = "_blank";
    frm.submit();
}

function DoPrint() {
    window.event.returnValue = false;
    window.print();
}

function ShowPrintVersion() {
    window.open(AddUrl("out=print"), "_blank", "", "");
}
function ShowExcelVersion() {
    window.open(AddUrl("out=excel"), "", "", "");
}

function GoDate(frm, d, n) {
    window.event.returnValue = false;
    var newinput = document.createElement("input");
    newinput.setAttribute("type", "hidden");
    newinput.setAttribute("name", "RevenueDate");
    newinput.setAttribute("value", d);
    frm.appendChild(newinput);
    frm.method = "post";

    //  frm.action = ""; //MergeUrl("RevenueDate=");
    //This line was originaly commented out but added back to handel the XML reports.
    //without it a drilldown would leave an action and mess things up.
    frm.action = n;

    frm.target = "";
    frm.submit();
}

function AddUrl(n) {
    var path, search, sa, a;

    path = window.location.pathname;
    search = window.location.search.substring(1, window.location.search.legnth);
    sa = search.split("&");
    a = n.split("=");
    search = "";
    for (var i = 0; i < sa.length; i++) {
        if (sa[i].substr(0, a[0].length) != a[0] && sa[i].indexOf("=") > -1) {
            search += sa[i] + "&";
        }
    }
    path += "?" + search + n;

    return path;
}

function PopulateDropDown(id, parent, lst, e) {
    var html, listArray, height, path, search, searchArray, searchParrams, Aproxwidth;

    StopEvent(e);
    path = window.location.pathname;
    search = window.location.search.substring(1, window.location.search.length);
    searchArray = search.split("&");
    search = "";
    for (var i = 0; i < searchArray.length; i++) {
        if (searchArray[i].indexOf("=") > -1) {
            if (searchArray[i].substring(0, searchArray[i].indexOf("=")) != id) {
                search += searchArray[i] + "&";
            }
        }
    }
    path += "?" + search + id + "=";
    listArray = lst.split("~");
    height = ((listArray.length / 2) + 1) * 18;
    if (height > (8 * 18)) height = 8 * 18;
    Aproxwidth = 0;
    var cmbBox = document.getElementById(id);
    for (var i = 0; i < listArray.length; i = i + 2) {
        if (Aproxwidth < listArray[i + 1].length) Aproxwidth = listArray[i + 1].length;
        cmbBox.options.add(new Option(listArray[i + 1], listArray[i + 1]))
    }
}

function GoMenu(id, parent, lst, e) {
    var html, listArray, height, path, search, searchArray, searchParrams, Aproxwidth;

    StopEvent(e);
    path = window.location.pathname;
    search = window.location.search.substring(1, window.location.search.length);
    searchArray = search.split("&");
    search = "";
    for (var i = 0; i < searchArray.length; i++) {
        if (searchArray[i].indexOf("Out=Report") > -1) {
            return;
        }
        if (searchArray[i].indexOf("=") > -1) {
            if (searchArray[i].substring(0, searchArray[i].indexOf("=")) != id) {
                search += searchArray[i] + "&";
            }
        }
    }
    path += "?" + search + id + "=";

    if (typeof gPopup != 'undefined') {
        if (gPopup.parentNode == null) {
            gPopup = undefined;
        }
        else {
            gPopup.parentNode.removeChild(gPopup);
        }
    }

    //  if (!e)
    //      gObj = window.event.srcElement;
    //  else
    //   gObj = e.srcElement;

    listArray = lst.split("~");
    height = ((listArray.length / 2) + 1) * 18;
    if (height > (8 * 18)) height = 8 * 18;

    gPopup = document.createElement("div");
    gPopup.id = "_GoMenu";
    gPopup.className = "MenuForm";
    $(gPopup).css('left', document.body.scrollLeft + posX - 10);
    $(gPopup).css('top', document.body.scrollTop + posY - 10);
    gPopup.style.display = "block";

    html = "<DIV class='MenuOut' nowrap>";
    html += "<table width='100%' border=0 cellpadding=0 cellspacing=0><tr><td class='MenuHead' handle=\"_GoMenu\"><A href='' onclick='javascript:edelete(\"_GoMenu\"); showWindowObjects(true);'>Cancel</A></td></tr>"
    html += "<tr><td><DIV style=\"width:100%;height: expression( this.scrollHeight > 600 ? '600px' : 'auto' );max-height: 600px;overflow-y:auto\">";
    html += "<TABLE class='MenuIn' cellpadding-LEFT='2' cellspacing='0'>";

    Aproxwidth = 0;
    for (var i = 0; i < listArray.length; i = i + 2) {
        //get approx width
        if (Aproxwidth < listArray[i + 1].length) Aproxwidth = listArray[i + 1].length;
        if (listArray[i] == "SEARCH") {
            // s += "<TR>";
            html += "<TR class='MenuItem' onmouseover='javascript:this.className = \"MenuItemOn\"' onmouseout='javascript:this.className = \"MenuItem\"'  >";
            html += "<TD nowrap>" + listArray[i + 1] + "&nbsp;&nbsp;<input type=\"text\" name=\"srchBox\"  size=\"15\"  onkeydown='javascript:SearchKeyCheck(\"" + path + escape(listArray[i]) + "\",this.Value);' /></TD>";
            html += "</TR>";
        }
        else {
            html += "<TR class='MenuItem' onmouseover='javascript:this.className = \"MenuItemOn\"' onmouseout='javascript:this.className = \"MenuItem\"'  onclick='javascript:GoPage( \"" + path + escape(listArray[i]) + "\");'>";
            html += "<TD nowrap>" + listArray[i + 1] + "</TD>";
            html += "</TR>";
        }
    }

    html += "</TABLE></DIV></DIV>";

    gPopup.innerHTML = html;

    showWindowObjects(false);
    document.body.appendChild(gPopup);

    //this sets the width of the popup box, if not IE we must guess at what it should be by the max # of chars (Aproxwidth)  in the list and * by pixles per char
    gPopup.style.width = getWidth(gPopup, Aproxwidth * 8) + 20;

    setBoxInView(gPopup);
}

function edelete(o, e) {
    StopEvent(e);
    $('#' + o).remove();
}

function SearchKeyCheck(path, value, e) {
    if (window.event.keycode == 13) {
        GoPage(path + ":" + value.trim(), e);
    }
}

function setBoxInView(o) {
    if (o.offsetleft + o.offsetwidth > document.body.scrollleft + document.body.clientWidth) {
        o.style.left = document.body.scrollleft + document.body.clientWidth - o.offsetwidth - 10;
    }
    if (o.offsetTop + o.offsetHeight > document.body.scrolltop + document.body.clientHeight) {
        o.style.top = document.body.scrolltop + document.body.clientHeight - o.offsetHeight - 10
    }
}

function DoPopUpTextByRowAndFieldId(rowId, fieldId) {
    window.event.returnValue = false;
    if (typeof gPopup != 'undefined') {
        if (gPopup.parentNode == null) {
            gPopup = undefined;
        }
        else {
            gPopup.parentNode.removeChild(gPopup);
        }
    }

    var currentText = $("#" + rowId).find("#" + fieldId).val();

    gPopup = document.createElement("FORM");
    gPopup.id = "PopUpText";
    gPopup.className = "MenuForm";
    gPopup.method = "post";
    gPopup.style.display = "block";
    s = "";
    s = s + "<DIV class=MenuOut>";
    s = s + "<DIV class=MenuIn nowrap>";
    s = s + "<TABLE class=calform cellpadding=1 cellspacing=0>";
    s = s + "<tr><TD class=MenuHead handle=\'" + gPopup.id + "\' colspan=7>";
    s = s + "<TABLE width=100% cellpadding=0 cellspacing=0>";
    s = s + "<TR class=MenuLink>";
    s = s + "<TD class=WN0B align=center nowrap>&nbsp;</TD>";
    s = s + "<TD class=WN0B align=right>";
    s = s + "<A href='' onclick='$(\"#" + rowId + "\").find(\"#" + fieldId + "\").val($(\"#PopUpTextArea\").val()); $(\"#" + rowId + "\").find(\"#" + fieldId + "\").trigger(\"onchange\"); edelete(\"" + gPopup.id + "\"); showWindowObjects(true);return false;'>[Okay]</A> &nbsp;";
    s = s + "<A href='' onclick='edelete (\"" + gPopup.id + "\"); showWindowObjects(true);'>[Cancel]</A>";
    s = s + "</TD></TR></TABLE>";
    s = s + "</TD></TR>";
    s = s + "<TR class=CalHead><TD>";
    s = s + "<TEXTAREA rows=10 cols=40 id=PopUpTextArea>" + currentText + "</TEXTAREA>";
    s = s + "</TD></TR>";
    s = s + "</TABLE></DIV></DIV>";
    s = s + "</DIV></DIV>";
    gPopup.innerHTML = s;
    showWindowObjects(false);
    document.body.appendChild(gPopup);

    gPopup.style.left = document.body.scrollLeft + window.event.clientX - gPopup.clientWidth + 10;
    gPopup.style.top = document.body.scrollTop + window.event.clientY - 10;
}

function showWindowObjects(flag) {
    var o;
    for (o in document.body.all) {
        var i;
        var search;
        search = "OBJECT|SELECT|EMBED|IFRAME|" //this string must end with a pipe(|) !!!!!!!!!!
        i = search.indexOf(o.toUpperCase());
        if (i > 0) {
            var length;
            length = search.indexOf("|", i) - i;
            if (search.substr(i, length) == o.toUpperCase()) {
                if (flag) {
                    o.style.visibility = "visible"; //java - check this
                }
                else {
                    o.style.visibility = "hidden"; //java - check this
                }
            }
        }
    }
}

function getWidth(o, defaultWidth) {
    var r, w

    r = o.getBoundingClientRect();
    w = Math.abs(r.right - r.left);
    if (w == 0) { w = defaultWidth; } // in case browser thinks it's 0
    return w;
}

function GoPage(action, e) {
    var form = document.forms["F"];
    // var element = window.event.srcElement;

    StopEvent(e);
    // element.disabled = true;

    form.method = "post";
    form.action = action;
    form.target = "";
    form.submit();
}

function DoSizeToFit(id) {
    var o;
    var PageWidth = 960;
    for (o in document.all.tags("TABLE")) {
        if (o.id == id) {
            if (o.clientwidth - PageWidth > 0) {
                o.style.zoom = (PageWidth - o.clientLeft - 20) / o.clientwidth;
            }
        }
    }
}

function DoGetTag(t, e) {
    var src = null;
    e = e || window.event; // IE doesn't pass event as argument.
    var src = e.target || e.srcElement; // IE doesn't use .target

    while (src.tagName != t) {
        src = src.parentNode
    }

    return src;
}

function DoRowChg(e) {
    var I, RID, nodelist;

    RID = e.id;
    $(e).find('#RowStatus').val("C");
    // e.childNodes.item("RowStatus").Value = "C";

    //  for (I in e.getElementsByTagName("INPUT")) --doesn't work
    nodelist = e.getElementsByTagName("INPUT");
    for (var I = 0; I < nodelist.length; I++) {
        if (nodelist[I].id != "RowID") {
            $(nodelist[I]).attr('name', nodelist[I].id + "_" + RID);
        }
        else {
            $(nodelist[I]).attr('name', 'RowID');
        }
    }
    nodelist = e.getElementsByTagName("TEXTAREA");
    for (var I = 0; I < nodelist.length; I++) {
        if (nodelist[I].id != "RowID") {
            $(nodelist[I]).attr('name', nodelist[I].id + "_" + RID);
        }
        else {
            $(nodelist[I]).attr('name', 'RowID');
        }
    }
}

/// Use this Method to open a new window and Post Data in the 'F' Form.
///If no post data is needed, use GoNewURL.
function GoNewPage(action, e) {
    StopEvent(e);

    F.method = "post";
    F.action = action;
    F.target = "_blank";
    F.submit();
}

/// Use this Method to open a new window with a URL there will not be a Post Data.
///If post data is needed, use GoNewPage.
function GoNewURL(url) {
    var newWindow = window.open(url, '_blank');
    newWindow.focus();
    return false;
}

function GoDatum(frm, id, v, n, t, e) {
    var o, element;

    StopEvent(e);
    // element = window.event.srcElement;
    //if(t != "_blank") element.disabled = true;
    o = document.createElement("INPUT");
    o.name = id;
    o.type = "hidden";
    o.value = v;
    frm.method = "post";
    frm.appendChild(o);
    frm.action = n;
    frm.target = t;
    frm.submit();
}

function GoPageMerge(t, e, id) {
    StopEvent(e);
    if (typeof id == 'undefined' || id == null) id = 1;
    var currentUrl = window.location.href.toLowerCase();
    if (currentUrl.indexOf("canvas.aspx") > -1) {
        var url = MergeSearchString($("#CorpDialog" + id + "Url").val().replace('../UI/API/Engine.asp?', ''), t);
        url = '../UI/API/Engine.asp?' + url;
        loadUrlInDash(url, id);
        //gClock = setInterval(function () {
        //    if (iTimer[id] == true) {
        //        CellDimensionInit(id);
        //        iTimer[id] = false;
        //        gTimer = false;
        //        clearInterval(gClock);
        //    }
        //}, 50);
    }
    else
        GoPage(MergeUrl(t), e);
}

function SelYear(id, d, dialogid, miny, e) {
    var s, i, o, a, url, cols, rows, c, r, DD, YY, tdc;

    StopEvent(e);
    if (!window.event)
        gObj = e.target;
    else //IE
        gObj = window.event.srcElement;

    DD = new Date(d);

    YY = DD.getFullYear - 5;
    If(IsNumeric(miny))
    If(YY < miny)
    YY = miny;

    e = DoGetTagObj(o, "TR");

    for (var i = 0; i < a.length; i++) {
        $(e).find("#" + a[i]).val(b[i]);
    }

    DoRowChg(e);
}

function InnerCal2(n, dateText, label, control) {
    var s, i, j, FD, LD, C;
    //var y[11];
    //window.event.cancelBubble = true
    //window.event.returnValue = false

    d = new Date(dateText);

    if (n == "BD")
        gBD = d;
    else
        gED = d;

    var y = [];

    var currentYear = (new Date()).getFullYear();

    for (i = 0; i <= 11; i++) {
        y[i] = currentYear + i - 6;
    }

    //FD = DateAdd("d", 1 - d.day, d);
    FD = d.PS_AddDay(1 - d.getDate());
    while (FD.getDay() != 0) { // not Sunday
        FD = FD.PS_AddDay(-1);
    }
    s = "";
    s += "<TABLE class=calform cellpadding=1 cellspacing=0>";
    s += "<tr><TD align=center colspan=11>";
    s += "<SPAN>" + label + " = " + d.PS_ShortDate() + "<INPUT id=\"" + n + "\" type=hidden value=\"" + d + "\"/></SPAN>";
    s += "</TD></TR>";
    s += "<TR class=CalHead>";
    s += "<TD colspan=2 align=center>&nbsp;</TD>";
    s += "<TD>s</TD><TD>m</TD><TD>t</TD><TD>w</TD><TD>t</TD><TD>f</TD><TD>s</TD>";
    s += "<TD colspan=2 align=center>&nbsp;</TD>";
    s += "</TR>";

    for (i = 0; i <= 5; i++) {
        s += "<tr>";
        if (d.getMonth() == (i)) C = "CalDate"; else C = "CalHead";
        s += "<TD class=" + C + "><A class=CalLink href='' onclick='InnerCal2(\"" + n + "\",\"" + (new Date(d.getFullYear(), (i), 1)).PS_Raw() + "\",\"" + label + "\"," + control.id + "); return false;'>" + MonthNameArrayAbr[i] + "</A></TD>";
        if (d.getMonth() == (i + 6)) C = "CalDate"; else C = "CalHead";
        s += "<TD class=" + C + "><A class=CalLink href='' onclick='InnerCal2(\"" + n + "\",\"" + (new Date(d.getFullYear(), (i + 6), 1)).PS_Raw() + "\",\"" + label + "\"," + control.id + "); return false;'>" + MonthNameArrayAbr[i + 6] + "</A></TD>";
        for (j = 0; j <= 6; j++) {
            if (FD.PS_AddDay((i * 7) + j).getMonth() == d.getMonth()) {
                //LD = FD.PS_DaysInMonth();
                LD = (FD.PS_AddDay((i * 7) + j)).getDate();
                if (d.getDate() == LD) C = "CalDate"; else C = "CalDay";
                s += "<TD class=" + C + "><A class='CalLink' href='' onclick='InnerCal2( \"" + n + "\",\"" + (new Date(d.getFullYear(), d.getMonth(), LD)).PS_Raw() + "\",\"" + label + "\"," + control.id + "); return false;'>" + LD + "</A></TD>";
            }
            else
                s += "<TD class=CalDay></TD>";
        }
        if (d.getFullYear() == y[i]) C = "CalDate"; else C = "CalHead";
        s += "<TD class=" + C + "><A class='CalLink' href='' onclick='InnerCal2(\"" + n + "\",\"" + (new Date(y[i], d.getMonth(), d.getDate())).PS_Raw() + "\",\"" + label + "\"," + control.id + "); return false;'>" + y[i] + "</A></TD>";
        if (d.getFullYear() == y[i + 6]) C = "CalDate"; else C = "CalHead";
        s += "<TD class=" + C + "><A class='CalLink' href='' onclick='InnerCal2(\"" + n + "\",\"" + (new Date(y[i + 6], d.getMonth(), d.getDate())).PS_Raw() + "\",\"" + label + "\"," + control.id + "); return false;'>" + y[i + 6] + "</A></TD>";
        s += "</tr>";
    }
    s += "</table>";

    // gPopUp.all(n + "_Cal").innerHTML = s;
    control.innerHTML = s;
}

function UpdateDateRange(e) {
    GoDateRange(gBD.PS_Raw(), gED.PS_Raw(), e);
}

function UpdateGriffinDateRange(e) {
    var BD = gBD.PS_Raw();
    var ED = gED.PS_Raw();
    if ((new Date(ED)) < (new Date(BD)))
        ED = BD;
    var url = MergeSearchString($('#SiteDialog1Url').val(), "BD=" + BD + "&ED=" + ED);
    $('#CorpDialog1Url').val(url);
    $('#SiteDialog1Url').val(url);
    $('#widCalText').text(BD + " - " + ED);
}

function GoDateRange(BD, ED, e) {
    var oBD, oED;

    StopEvent(e);

    if ((new Date(ED)) < (new Date(BD)))
        ED = BD;

    var form = document.getElementById("F");

    form.method = "post";
    form.action = MergeUrl("BD=" + BD + "&ED=" + ED);
    form.target = "";
    form.submit();
}

function DoPostEnd(s) {
    //[XS]  = (SQL) Exec Savexxxxxx param1,param2,...
    var form = document.getElementById("F");
    form.PostData.value = form.PostData.value.replace("[XS]" + s, "") + "[XS]" + s + "\n";
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function DoPostNumeric(s, fmt, e) {
    var e, v, gObj;

    if (!window.event)
        gObj = e.target;
    else    //IE
        gObj = window.event.srcElement;

    if (fmt.indexOf("#.###") > 0) {
        v = ParseDbl(gObj.value);
        gObj.value = SFmt(fmt, v);
    } else
        v = gObj.value;
    if (!isNumeric(v)) {
        v = 0;
    }
    //[XS]  = (SQL) Exec Savexxxxxx param1,param2,...
    var form = document.getElementById("F");
    form.PostData.value = form.PostData.value + "[XS]" + s.replace("[This]", v) + "\n";
    //document.writeln(form.PostData.value);
}

function DoPost(s, fmt, e) {
    var e, v, gObj;

    if (!window.event)
        gObj = e.target;
    else    //IE
        gObj = window.event.srcElement;

    if (fmt.indexOf("#.###") > 0) {
        v = ParseDbl(gObj.value);
        gObj.value = SFmt(fmt, v);
    } else
        v = gObj.value;

    //[XS]  = (SQL) Exec Savexxxxxx param1,param2,...
    var form = document.getElementById("F");
    form.PostData.value = form.PostData.value + "[XS]" + s.replace("[This]", "'" + v + "'") + "\n";
    alert(form.PostData.value);
}

function DoPost2D(MatchStr, ColumnStr, Value) {
    var form = document.getElementById("F");
    form.PostData.value = MergeStr2D(form.PostData.value, "\n", "[XS]" + MatchStr, ColumnStr, ",", "'" + Value.replace(/'/g, "''") + "'");
    //alert(form.PostData.value);
}

function DoPost2DByID(ID, MatchStr, ColumnStr, Value) {
    var form = document.getElementById("F");
    MatchStr = MatchStr.replace("[ID]", ID);
    form.PostData.value = MergeStr2D(form.PostData.value, "\n", "[XS]" + MatchStr, ColumnStr, ",", "'" + Value + "'");
    //alert(form.PostData.value);
}

function MergeStr2D(BaseStr, LSep, MatchStr, ColumnStr, VSep, Value) {
    var a = BaseStr.split(LSep);
    for (var i = 0; i < a.length; i++) {
        if (a[i].substr(0, MatchStr.length) == MatchStr) {
            a[i] = MergeStr(a[i], VSep, ColumnStr, Value);
            return a.join(LSep);
        }
    }
    return BaseStr + LSep + MergeStr(MatchStr, VSep, ColumnStr, Value);
}

function MergeStr(BaseStr, Sep, MatchStr, Value) {
    var a = BaseStr.split(Sep);
    for (var i = 0; i < a.length; i++) {
        if (a[i].substr(0, MatchStr.length) == MatchStr) {
            a[i] = MatchStr + Value;
            return a.join(Sep);
        }
    }
    return BaseStr + Sep + MatchStr + Value;
}

function DoPrint() {
    window.print();
}

//hide menus if clicked outside
function initMenu() {
    //Add to body.onload event...
    $('.MenuButton').click(function (event) {
        event.stopPropagation();
    });

    $('.SiteMenuTitle').click(function (event) {
        event.stopPropagation();
    });

    $('.DropDownMenu').click(function (event) {
        event.stopPropagation();
    });

    $('#container').click(function () {
        $('.MenuContainer').hide('fast');
    });
}

function ToggleMenu(obj, leftPos) {
    //$('.MenuContainer').hide('fast');
    var makeVisable = ($(obj).css("display") == 'none');
    $(obj).css("left", leftPos);
    if (makeVisable) $(obj).show('fast');
    else $(obj).hide('fast');
}

function RunDialog(dialogid, batchid, siteid) {
    var searchString = "";
    $("#" + dialogid).find('select').each(function () {
        var selectname = $(this).attr('name');
        var selectedOption = $(this).find('option:selected');
        if (selectname) {
            searchString = searchString + "&" + selectname + "=" + selectedOption.val();
        }
    });
    $("#" + dialogid).find('input').each(function () {
        var selectname = $(this).attr('name');
        var selectedOption = $(this).attr('value');
        if (selectname) {
            searchString = searchString + "&" + selectname + "=" + selectedOption;
        }
    });
    GetUrl(MergeSearchString('Services/Handlers/LedgerControl.asp?Act=CloneBatchConfirm&BID=' + batchid + '&S=' + siteid, searchString), '#' + dialogid);
    //alert(MergeSearchString(window.location.href, searchString));
}

function CreatePostFormElement(form, eleName, eleValue) {
    var actionField = document.createElement("input");
    actionField.setAttribute("name", eleName);
    actionField.setAttribute("value", eleValue);
    actionField.setAttribute("type", "hidden");
    form.appendChild(actionField);
}

function addFavorite(url, label) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "../WebEng/ChangeFavorites.aspx");

    CreatePostFormElement(form, "action", "add");
    CreatePostFormElement(form, "url", url);
    CreatePostFormElement(form, "label", label);

    document.body.appendChild(form);
    form.submit();
}

function DeleteFavorite(id, label) {
    if (confirm('Delete ' + label + ' from your favorites?')) {
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "../WebEng/ChangeFavorites.aspx");

        CreatePostFormElement(form, "action", "delete");
        CreatePostFormElement(form, "fid", id);
        CreatePostFormElement(form, "url", document.URL);

        document.body.appendChild(form);
        form.submit();
    }
}

function DoCheckList(o) {
    var c, i, s;

    window.event.returnValue = false;

    s = "";
    $('#List :checked').each(function () {
        s = s + this.id + "|";
    });

    if (s.indexOf("|") > -1)
        s = s.substr(0, (s.length - 1));

    return s;
}

function DoCheckAll(o, v) {
    var c, i;

    window.event.returnValue = false

    $("input[type=checkbox]").each(function () {
        $(this).attr("checked", v);
    });
}

function DoGetTagObj(o, t) {
    var e;

    if (!o)
        e = window.event.srcElement;
    else
        e = o;

    while (e.tagName != t) {
        e = e.parentNode;
    }

    return e;
}

function VSwitch(lst) {
    var e, v, i;

    window.event.returnValue = false;
    window.event.cancelBubble = true;

    v = lst[0];
    e = window.event.srcElement;

    for (i = 0; i < lst.length; i++) {
        if (lst[i] == e.value) {
            //select next item in list, or return to first
            v = lst[(i + 1) % (lst.length)];
            break;
        }
    }

    e.value = v;

    DoRowChg(DoGetTag("TR"));
}

function DoSelect(a, n, v) {
    var s, i, j, o, h;
    if (window.event.srcElement.nodeName != "INPUT") {
        window.event.returnValue = false;
        gObj = window.event.srcElement;
        if (a.length < 12)
            h = (a.length + 1) * 19;
        else
            h = 12 * 19;

        if (typeof gPopup != 'undefined') {
            if (gPopup.parentNode == null) {
                gPopup = undefined;
            }
            else {
                gPopup.parentNode.removeChild(gPopup);
            }
        }

        gPopup = document.createElement("DIV");

        gPopup.id = n;
        gPopup.className = "MenuForm";
        gPopup.style.left = document.body.scrollLeft + window.event.clientX - 10;
        gPopup.style.top = document.body.scrollTop + window.event.clientY - 10;
        gPopup.style.display = "block";

        s = "<DIV class=MenuOut nowrap>";
        s += "<DIV class=MenuHead handle=\"" + n + "\"><A href='' language='javascript' onclick='edelete(\"" + n + "\"); showWindowObjects(true); return false;'>Cancel</A></DIV>"
        s += "<DIV style=\"height:" + h + ";overflow-y:auto\">";
        s += "<TABLE class=MenuIn cellpadding=0 cellspacing=0>";

        Aproxwidth = 10; //min width
        ///// for (var i = 0; i<listArray.length; i=i+2){
        ///// //get approx width
        //////  if (Aproxwidth < listArray[i + 1].length) Aproxwidth = listArray[i + 1].length;
        /////  if (listArray[i]=="SEARCH") {
        for (i = 0; i < a.length; i++) {
            //get approx width
            if (Aproxwidth < a[i].length) Aproxwidth = a[i].length;
            s += "<TR class=MenuItem onmouseover='$(this).addClass(\"MenuItemOn\");' onmouseout='$(this).removeClass(\"MenuItemOn\");'  onclick='DoSetMultObjRowChange(gObj,\"" + v + "\",\"" + (a[i].join("|")).replace("'", "") + "\");edelete(\"" + n + "\");showWindowObjects(true);'>";
            for (j = 1; j < (a[i]).length; j++) {
                s += "<TD nowrap>" + a[i][j] + "</TD>";
            }
            s += "</TR>";
        }
        //s += "</TABLE></DIV></DIV>";
        s += "</TABLE></DIV>";

        gPopup.innerHTML = s;
        showWindowObjects(false);
        document.body.appendChild(gPopup);
        // gPopup.style.width = GetWidth(gPopup) + 20;

        //this sets the width of the popup box, if not IE we must guess at what it should be by the max # of chars (Aproxwidth)  in the list and * by pixles per char
        gPopup.style.width = getWidth(gPopup, Aproxwidth * 8) + 20;

        setBoxInView(gPopup);
    }
}

function DoPostYN(s, fmt, e) {
    var v, gObj;

    if (!window.event)
        gObj = e.target;
    else    //IE
        gObj = window.event.srcElement;

    if (gObj.innerHTML == 'Y') {
        gObj.innerHTML = '&nbsp;';
        v = 0;
    }
    else {
        gObj.innerHTML = 'Y';
        v = 1;
    }

    var form = document.getElementById("F");
    form.PostData.value = form.PostData.value + "[XS]" + s.replace("[This]", v) + "\n";
}

function DoSearchMenu(sid, vl, act) {
    var s, i, j, o;
    if (window.event.srcElement.nodeName != "INPUT") {
        window.event.returnValue = false;
        gObj = window.event.srcElement;

        if (typeof gPopup != 'undefined') {
            if (gPopup.parentNode == null) {
                gPopup = undefined;
            }
            else {
                gPopup.parentNode.removeChild(gPopup);
            }
        }

        gPopup = document.createElement("DIV");
        gPopup.id = "SM";
        gPopup.className = "MenuForm";
        gPopup.style.left = document.body.scrollLeft + window.event.clientX - 10;
        gPopup.style.top = document.body.scrollTop + window.event.clientY - 10;
        gPopup.style.width = 300;
        gPopup.style.display = "block";

        s = "<DIV class=MenuOut nowrap>";
        s += "<DIV id='SM_h' class='MenuHead' handle='SM'><TABLE width='100%'><TR><TD>Search&nbsp;<INPUT style='width:175' class='I0S' type='text' onkeyup='DoSearch(\"SM_d\",this.value,\"" + sid + "\",\"" + vl + "\",\"" + act + "\");' tabindex=0></TD><TD align=right><A href='' onclick='edelete(\"SM\"); showWindowObjects(true); return false;'>Cancel</A></TD></TR></TABLE></DIV>";
        s += "<DIV id='SM_d'>";
        s += "Type some letters of the description<BR>in the search box and press 'Enter'</DIV></DIV>";

        gPopup.innerHTML = s;
        showWindowObjects(false);
        document.body.appendChild(gPopup);

        //this sets the width of the popup box, if not IE we must guess at what it should be by the max # of chars (Aproxwidth)  in the list and * by pixles per char
        //  gPopup.style.width = getWidth(gPopup, Aproxwidth * 8) + 20;
    }
}

function DoSearch(n, v, sid, vl, act) {
    var o, r;

    if (v.length > 0) {
        o = window.event.srcElement;
        //"../system/engine.asp?sid=&s=s&vl=5%7C6&act=ItemTag"
        var url = "../system/engine.asp?sid=" + sid + "&s=" + escape(v) + "&vl=" + escape(vl) + "&act=" + escape(act);
        DoRemoteCmd(url, v, SM_d);
        setBoxInView(o);
    }
}

function DoRemoteCmd(f, s, obj) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return false;
        }
        if (xhr.status !== 200) {
            alert("Error, status code: " + xhr.status);
            return false;
        }
        obj.innerHTML = "<pre>" + xhr.responseText + "<\/pre>";
    };

    xhr.open("POST", f, false);
    xhr.send();
}

// RENAMED function DoSetMultObj(o, ids, vals) { -- Duplicate Function
function DoSetMultObjRowChange(o, ids, vals) {
    var e, a, b;

    window.event.returnValue = false;

    a = ids.split("|");
    b = vals.split("|");

    e = DoGetTagObj(o, "TR");

    for (var i = 0; i < a.length; i++) {
        //c.item(cint(a(i))).value = b(i);
        //c.item(a[i]).value = b[i];
        // $(c).find("#" + a[i]).val(b[i]);
        $(e).find("#" + a[i]).val(b[i]);
    }

    //DoPostRow(o, "");
    DoRowChg(e);
}

function DoPostURL(id, V, e) {
    window.event.returnValue = false;
    var url = MergeSearchString($("#SiteDialog1Url").val(), "&" + id + "=" + V);
    if ($(window).width() <= 600)
        url = MergeSearchString(url, "&STy=2");
    else
        url = MergeSearchString(url, "&STy=1");
    loadUrlInDash(url, 1);
    return false;
}

//$(window).resize(function () {
//    if ($("#CorpDialog1Url").val().indexOf("Dashboard") >= 0) {
//        //alert("resizing");
//        for (var i = 1; i <= $("[id^='widget']").length; i++) {
//            loadUrlInDash($("#CorpDialog" + i + "Url").val(), i);
//        }
//    }
//    //loadUrlInDash(loadURL, id);
//    //alert("resizing");
//});
function GoDialog(dialogid, id, type) {
    var searchString = "", url;
	var obj = {};
    $("#" + dialogid).find('select').each(function () {
        var selectname = $(this).attr('name').substring(3, $(this).attr('name').length);
        var selectedOption = $(this).find('option:selected');
        if (selectedOption.val() == 'selected') selectedOption.val('');
        searchString = searchString + "&" + selectname + "=" + selectedOption.val();
		obj[selectname] = selectedOption.val();
    });

    if (type != "URLPackage") {
        $("#" + dialogid).find('input[type=checkbox]').each(function () {
            var boxid = $(this).attr('id');
            if (this.checked) {
                searchString = searchString + "&" + boxid + "=on";
				obj[boxid] = "=on";
            } else {
                searchString = searchString + "&" + boxid + "=off";
				obj[boxid] = "=off";
            }
        });
    } else {
        var checkedlist = "";
        $("#" + dialogid).find('input[type=checkbox]').each(function () {
            if (this.checked && this.id != "undefined") {
                checkedlist += "|" + $(this).attr('id');
            }
        });
        if ($("#" + dialogid).find('input[type=checkbox]').length > 0){
            searchString = searchString + "&CheckedList=" + checkedlist.substring(1);
			obj["CheckedList"] = checkedlist.substring(1);
		}
    }

    if (type == "MenuOnly" && dialogid.indexOf("CorpDialog") >= 0){
        searchString = searchString + "&ReloadMenu=Y&DashId=" + id + "&ShowCorp=Y";
		obj["ReloadMenu"] = "Y";
		obj["DashId"] = id;
		obj["ShowCorp"] = "Y";
	}
	
    else if (type == "MenuOnly" && dialogid.indexOf("SiteDialog") >= 0){
        searchString = searchString + "&ReloadMenu=Y&DashId=" + id + "&ShowCorp=N";
		obj["ReloadMenu"] = "Y";
		obj["DashId"] = id;
		obj["ShowCorp"] = "N";
	}
    //var lineValues = $.map($(':checkbox[name=Options\\[\\]]:checked'), function (n, i) {
    //    return n.value;
    //}).join('|');
    //if (lineValues.length > 0) {
    //    searchString = searchString + "&Options=" + lineValues;
    //}

    $("#" + dialogid).find('textarea').each(function () {
        var textid = $(this).attr('id');
        var textcontent = $(this).html();
        if (textcontent == '') textcontent = $(this).val();
        searchString = searchString + "&" + textid + "=" + textcontent;
		obj[textid] = textcontent;
    });

    $("#" + dialogid).find('input[type="text"]').each(function () {
        var inputid = $(this).attr('id');
        var inputcontent = $(this).val();
        searchString = searchString + "&" + inputid + "=" + inputcontent;
		obj[inputid] = inputcontent;
    });

    searchString = searchString.replace(/%/g, '%25');
    searchString = searchString.replace(/#/g, '%23');
    //searchString = searchString.substring(1);
    if (type === "Global") {
        url = MergeSearchString(window.location.href, searchString);
        GoPage(url);
    }
    else if (type === "URLParameters") {
        var searchStringArray = searchString.split("&");
        var XNMenu = "";
        for (i = 0; i < searchStringArray.length; i++) {
            if (searchStringArray[i].indexOf("XNMenu") !== -1) {
                XNMenu = searchStringArray[i];
            }
        }
        if (XNMenu.length > 0) {
            searchString = XNMenu.replace("XNMenu=", "") + searchString.replace("&" + XNMenu, "");
        } else {
            searchString = searchString.substr(1);
        }
        $("#" + id).val(searchString);
    }
    else if (type === "URLPackage") {
        var searchStringArray = searchString.split("&");
        var XNMenu = "";
        for (i = 0; i < searchStringArray.length; i++) {
            if (searchStringArray[i].indexOf("XNMenu") !== -1) {
                XNMenu = searchStringArray[i];
            }
        }
        if (XNMenu.length > 0) {
            searchString = XNMenu.replace("XNMenu=", "XN=") + searchString.replace("&" + XNMenu, "");
        } else {
            searchString = searchString.substr(1);
        }
        searchString = MergeSearchString($("#" + id).val(), searchString);
        $("#" + id).val(searchString);
    }
    else if (type === "MenuOnly") {
        url = MergeSearchString($("#" + dialogid + "Url").val(), searchString);
        url = url.replace(/@/g, '%40');
        $.ajax({
            async: false,
            type: "GET",
            url: url,
            success: function (data) {
                $("#" + dialogid + "tablebody").html(data);
            }
        });
    }
    else {
        url = MergeSearchString($("#" + dialogid + "Url").val(), searchString);
        if (url.indexOf("Out=Report") > 0) {
            $("#" + dialogid).hide();
            PrintDashWidget(id, 'Report');
        }
        else if (url.indexOf("Out=Excel") > 0)
            PrintDashWidget(id, 'Excel');
        else {
            url = url.replace(/@/g, '%40');
            var Width, Height, WSize, W, H;
            if (url.indexOf('SIZE') > 0) {
                WSize = url.substr(url.indexOf('SIZE') + 5, 3);
                if (WSize.indexOf('x') > 0) {
                    W = Number(WSize.substr(0, 1))
                    if (WSize.substr(2, 1) == "H") {
                        H = 0.5
                    }
                    else {
                        H = Number(WSize.substr(2, 1))
                    }
                    Width = W * gGridX + (W - 1) * gutterX - 4;
                    Height = H * gGridY * 6 + (H - 1) * gutterY - 4;
                }
                else {
                    //Width = $('#widget' + id + ' thead').width();
                    //if ($('#widget' + id).find('.placeholderDashGraph').length > 0) {
                    //    Height = $('#widget' + id + " .placeholderDashGraph").height() + $('#widget' + id + " [id^='Rpt']").height();
                    //} else {
                    //    Height = $('#widget' + id + " [id^='Rpt']").height();
                    //}
                    Width = null;
                    Height = null;
                }
            } else {
                Width = gGridX - 4;
                Height = gGridY * 6 - 4;
            }
            loadUrlInDash(url, id, Width, Height);
            //gClock = setInterval(function () {
            //    if (iTimer[id] == true) {
            //        //CellDimensionInit();
            //        CellDimensionInit(id);
            //        iTimer[id] = false;
            //        gTimer = false;
            //        clearInterval(gClock);
            //    }
            //}, 50);
        }
    }
}

function ShowDialog(dialogid) {
    StyleDialog(dialogid);
    $("#" + dialogid).show("fast");
}

function HideDialog(dialogid) {
    $("#" + dialogid).hide();
}

function SetImport(path) {
    document.body.style.cursor = "wait";
    $('#ImportControl').html("Please wait.  The data is loading...");
    window.setTimeOut(DoImport(path), 1000);
}

function DoImport(path) {
    try {
        //do the cmd -- need to convet from vb
        GetUrl(path, '#ImportControl');
        document.body.style.cursor = "";
        //window.location = returnPage;
    }
    catch (ex) {
        $('#ImportControl').html("Error = " + ex.Description);
        document.body.style.cursor = "";
    }
}

function SaveAsCanvas(CanvasID, Rows, Columns, IsPublic, UserID) {
    var canvasName = prompt("Please enter a name for the canvas", "Canvas");godialog
    if (canvasName === null) {
        return;
    }
    if ((canvasName != null) && (canvasName != ""))
        SaveCanvas(CanvasID, canvasName, Rows, Columns, IsPublic, UserID);
}

function gBlur(E) {
    $(E).css("background-color", "");
}

function gFoc(E) {
    $(E).css("background-color", "#ddd5c7");
    E.focus();
}

function gChg(E) {
    var A, F, G, I, P;
    A = E.split(":");
    F = A[0];
    G = A[1];
    I = A[2];

    P = document.getElementsByName("Chg:" + G + ":" + I);
    $(P).val("Yes");
}

function SaveAsCanvas(CanvasID, Rows, Columns, IsPublic, UserID) {
    var canvasName = prompt("Please enter a name for the canvas", "Canvas");
    if (canvasName === null) {
        return;
    }
    if ((canvasName != null) && (canvasName != ""))
        SaveCanvas(CanvasID, canvasName, Rows, Columns, IsPublic, UserID);
}

function SaveCanvas(CanvasID, CanvasName, Rows, Columns, IsPublic, UserID) {
    var S;
    CanvasName = unescape(CanvasName).replace("'", "''");
    S = "Canvas @CanvasID='" + CanvasID + "' ,@UserID='" + UserID + "' ,@CanvasName='" + CanvasName + "' ,@Rows='" + Rows + "' ,@Columns='" + Columns + "' ,@IsPublic='" + IsPublic + "' ,@Type='Save'";
    DoPostEnd(S);
    for (var i = 1; i <= Rows; i++) {
        for (var j = 1; j <= Columns; j++) {
            SaveCanvasPanel(CanvasID, i, j, $("#dialog" + i.toString() + j.toString() + "-Url").val().slice(4));
        }
    }
    GoPage(MergeSearchString(window.location.href, "CL=" + CanvasID + "&NROWS=" + Rows + "&NCOLS=" + Columns));
}

function DeleteCanvas(CanvasID, CanvasName, UserID) {
    var S;
    if (confirm("Do you wish to delete " + unescape(CanvasName) + "?") == true) {
        S = "Canvas @CanvasID='" + CanvasID + "' ,@UserID='" + UserID + "' ,@CanvasName='' ,@Type='D'";
        DoPostEnd(S);
        GoPage(window.location.href);
    }
}

function SaveCanvasPanel(CanvasID, Row, Column, URL) {
    var S;
    S = "CanvasPanel @CanvasID='" + CanvasID + "', @Row='" + Row + "', @Column='" + Column + "', @URL='" + URL + "'";
    DoPostEnd(S);
}

function parseFloatReplaceCommas(str) {
    if (typeof str != 'undefined') {
        str = str.toString();
        return parseFloat(str.replace(/,/g, ''));
    }
    else {
        return NaN;
    }
}

function DoPostTransMonth(SiteID, Tag, Period, Mode, Param, Fmt, event) {
    var S, Month, Year, tmpDate;
    Month = Period.substring(4, 6);
    Year = Period.substring(0, 4);
    tmpDate = new Date(Year, Month, 1);
    S = "TransMonthInput" + Param + " @SiteID='" + SiteID + "',@Tag='" + Tag + "',@Year='" + Year + "',@Month='" + Month + "',@Mode='" + Mode + "',@" + Param + "=[This]";
    DoPostNumeric(S, Fmt, event);

    S = "TransactionsMonthRollup @SiteID='" + SiteID + "',@Tag='" + Tag + "',@Date='" + tmpDate.PS_FirstDayOfMonth().PS_Raw() + "',@Mode='" + Mode + "'";
    DoPostEnd(S);

    S = "Calculate @SiteID='" + SiteID + "',@Year=" + tmpDate.getFullYear() + ",@Month=" + (tmpDate.getMonth()) + ",@Mode='" + Mode + "'";
    DoPostEnd(S);
}

function SaveCanvasPanel(CanvasID, Row, Column, URL) {
    var S;
    S = "CanvasPanel @CanvasID='" + CanvasID + "', @Row='" + Row + "', @Column='" + Column + "', @URL='" + URL + "'";
    DoPostEnd(S);
}

function GetControl(id, url) {
    var s, i, o, a, url, cols, rows, c, r, DD, YY, tdc;

    if (typeof gPopup != 'undefined') {
        if (gPopup.parentNode == null) {
            gPopup = undefined;
        }
        else {
            $(gPopup).remove();
        }
    }

    gPopup = document.createElement("div");
    gPopup.id = id;
    $(gPopup).css('position', 'absolute');
    $(gPopup).css('z-index', '9999');
    $(gPopup).css('filter', 'alpha(opacity=90)');
    //$(gPopup).css('height', '400px');
    //$(gPopup).css('overflow-x', 'hidden');
    //$(gPopup).css('overflow-y', 'auto');
    //$(gPopup).css('padding-right', '15px');
    //$(gPopup).css('width', '100%');
    $(gPopup).css('display', 'block');
    $(gPopup).attr('class', 'popupList');

    GetUrlNoCache(url, gPopup);

    posX = myEvent.clientX;
    posY = myEvent.clientY;

    $(document.body).append($(gPopup));
    $(gPopup).draggable({ handle: "#" + id + "title", cancel: "#" + id + "body" });
    if (document.body.scrollLeft + posX - document.body.clientWidth > (-$(gPopup).width() / 2)) {
        $(gPopup).css('left', document.body.scrollLeft + document.body.clientWidth - $(gPopup).width() - 10);
    } else {
        $(gPopup).css('left', document.body.scrollLeft + posX - $(gPopup).width() / 2);
    }
    $(gPopup).css('top', document.body.scrollTop + posY - 10);
    Activate(gPopup);
    showWindowObjects(false);
    Calendar_currentDate = new Date(gDate);
}

function GetOptControl(id, url) {
    var s, i, o, a, url, cols, rows, c, r, DD, YY, tdc;

    var p = document.createElement("div");
    p.id = id;
    $(p).css('position', 'absolute');
    $(p).css('z-index', '9999');

    GetUrl(url, p);
    $(gPopup).find('#calSpace').append($(p));
    Activate(p);
    showWindowObjects(false);
}

function GetControlSearch(id, url) {
    var s, i, o, a, url, cols, rows, c, r, DD, YY, tdc;

    if (typeof gPopup != 'undefined') {
        if (gPopup.parentNode == null) {
            gPopup = undefined;
        }
        else {
            $(gPopup).remove();
        }
    }

    gPopup = document.createElement("div");
    gPopup.id = id;
    $(gPopup).css('position', 'absolute');
    $(gPopup).css('z-index', '9999');
    //$(gPopup).css('overflow-y', 'auto');
    $(gPopup).css('height', '400px');
    //$(gPopup).append("<DIV class=MenuOut nowrap >");
    $(gPopup).append("<DIV class=MenuOut style='background-color:#366247' handle='" + id + "' nowrap><A href='' onclick='ClosePopup(\"" + id + "\")'>Close</A></DIV>");
    $(gPopup).append("<iFrame FRAMEBORDER=0 style='width:350px;height:270px' src='" + url + "' >");
    $(gPopup).append("</iFrame></DIV>");

    //GetUrl2(url, gPopup);
    $(document.body).append($(gPopup));
    $(function () { $(gPopup).draggable({ handle: "#" + id + "title", cancel: "#" + id + "body" }); });
    $(gPopup).css('left', document.body.scrollLeft + posX - 10);
    $(gPopup).css('top', document.body.scrollTop + posY - 10);
    Activate(gPopup);
    showWindowObjects(false);
}

function ClosePopup(id) {
    window.event.returnValue = false;
    var oElm;
    oElm = document.getElementById(id);
    oElm.style.display = "none";
}

function ClosePopupChild(id) {
    window.event.returnValue = false;
    var oElm;
    oElm = parent.document.getElementById(id);
    oElm.style.display = "none";
}

function GetUrlNoCache(loadURL, obj) {
    $.ajax({
        async: false,
        cache: false,
        type: 'GET',
        url: loadURL,
        success: function (data) {
            $(obj).html(data);
        }
    });
}

function GetUrl(loadURL, obj, onsuccess) {
    $.ajax({
        async: false,
        type: 'GET',
        url: loadURL,
        success: function (data) {
            $(obj).html(data);
            if (typeof (onsuccess) != 'undefined') {
                onsuccess();
            }
        },
        error: function () {
            alert(loadURL + ' failed');
        }
    });
}

function GoMenuCmd(lst, e) {
    var html, listArray, height, path, search, searchArray, searchParrams, Aproxwidth;

    StopEvent(e);
    if (!window.event)
        gObj = e.target;
    else //IE
        gObj = window.event.srcElement;

    if (typeof gPopup != 'undefined') {
        if (gPopup.parentNode == null) {
            gPopup = undefined;
        }
        else {
            gPopup.parentNode.removeChild(gPopup);
        }
    }

    listArray = lst.split("~");
    height = ((listArray.length / 2) + 1) * 18;
    if (height > (8 * 18)) height = 8 * 18;

    gPopup = document.createElement("div");
    gPopup.id = "_GoMenu";
    gPopup.className = "MenuForm";
    $(gPopup).css('left', document.body.scrollLeft + posX - 10);
    $(gPopup).css('top', document.body.scrollTop + posY - 10);
    gPopup.style.display = "block";

    html = "<DIV class='MenuOut' nowrap>";
    html += "<table width='100%' border=0 cellpadding=0 cellspacing=0><tr><td class='MenuHead' handle=\"_GoMenu\"><A href='' onclick='javascript:edelete(\"_GoMenu\"); showWindowObjects(true);'>Cancel</A></td></tr>"
    html += "<tr><td><DIV style=\"width:100%;height: expression( this.scrollHeight > 600 ? '600px' : 'auto' );max-height: 600px;overflow-y:auto\">";
    html += "<TABLE class='MenuIn' cellpadding-LEFT='2' cellspacing='0'>";

    Aproxwidth = 0;
    for (var i = 0; i < listArray.length; i = i + 2) {
        //get approx width
        if (Aproxwidth < listArray[i + 1].length) Aproxwidth = listArray[i + 1].length;
        html += "<TR class='MenuItem' onmouseover='javascript:this.className = \"MenuItemOn\"' onmouseout='javascript:this.className = \"MenuItem\"'  onclick='javascript:" + listArray[i + 1] + "'>";
        html += "<TD nowrap>" + listArray[i] + "</TD>";
        html += "</TR>";
    }

    html += "</TABLE></DIV></DIV>";

    gPopup.innerHTML = html;

    showWindowObjects(false);
    document.body.appendChild(gPopup);

    //this sets the width of the popup box, if not IE we must guess at what it should be by the max # of chars (Aproxwidth)  in the list and * by pixles per char
    gPopup.style.width = getWidth(gPopup, Aproxwidth * 8) + 20;
    setBoxInView(gPopup);
}

function DoSetMultObjRowChangeControl(o, ids, vals, e) {
    var o, a, b;

    window.event.returnValue = false;

    a = ids.split("|");
    b = vals.split("|");
    for (var i = 0; i < a.length; i++) {
        $(o).find("#" + a[i]).val(b[i]);
    }
    $(o).find("#" + a[0])[0].fireEvent("onchange");
    try {
        DoRowChg(DoGetTagObj(o, "TR"));
    } catch (ex) { };
}

function DoSetMultObjRowChangeControlChild(o, ids, vals, rowId, colId) {
    var a, b, i;
    //alert(ids);
    //parent.window.event.returnValue = false;

    a = ids.split("|");
    b = vals.split("|");
    for (i = 0; i < a.length; i++) {
        //$(o).find("#" + a[i]).val(b[i]);
        parent.document.getElementById(a[i]).value = b[i];
    }
    parent.document.getElementById(rowId.substring(0, 1) + rowId.substring(3, 9999)).cells[colId].innerHTML = b[i];     //temp solution to the rowId issue, may update later
    parent.document.getElementById(a[0]).fireEvent("onchange");
    //$(o).find("#" + a[0])[0].fireEvent("onchange");
    //try {
    //    DoRowChg(DoGetTagObj(o, "TR"));
    //} catch (ex) { };
}

function CmdRemoteX(f, s) {
    var oHTTP, oXML;

    oHTTP = new ActiveXObject("Msxml2.XMLHTTP.3.0");
    oHTTP.open("POST", f, false);
    oHTTP.setRequestHeader("content-type", "text/xml");
    oHTTP.send("<ROOT><![CDATA[" & s & "]]></ROOT>");
    oHTTP = null;
}

function ImportBudgetAll(date, page) {
    var $rows = $('#Rpt tbody tr');
    var SiteID;
    var index = 0;
    if (window.confirm("This will import all displayed Periods of Accounting Budget.  Do you wish to continue?")) {
        GetControl("progress", "Services/Handlers/ProgressBar.aspx?id=progress");
        setTimeout(function () { ImportBudgetInc(date, $rows, 0); }, 500);
    }
}

function ImportBudgetInc(date, rows, index) {
    $('#progressbar div').css("width", Math.floor((index / (rows.length - 1)) * 100) + "%");
    rows.eq(index).find('td:eq(0) a').css('color', '#60bd68').css('font-weight', 'bold');
    var SiteID = rows.eq(index).find('td:eq(1)').text();
    CmdRemoteX("Services/ExeHandlers/ImportBudget.asp?S=" + SiteID + "&D=" + date + "&Act=ImportAll", "");
    index++;
    if (index < rows.length) setTimeout(function () { ImportBudgetInc(date, rows, index); }, 500);
    else GoDialog("CorpDialog1", "1", "NotGlobal");
}

function ImportActualsAll_Corp(date, page) {
    var $rows = $('#Rpt tbody tr');
    var SiteID;
    var index = 0;
    var date2 = ((new Date(date)).getMonth() + 1) + '/1/' + (new Date(date)).getFullYear();
    if (window.confirm("This will import all displayed Periods of Accounting Actuals.  Do you wish to continue?")) {
        GetControl("progress", "Services/Handlers/ProgressBar.aspx?id=progress");
        setTimeout(function () { ImportActualsCorpInc(date2, $rows, 0); }, 500);
    }
}

function ImportActualsCorpInc(date, rows, index) {
    $('#progressbar div').css("width", Math.floor((index / (rows.length - 1)) * 100) + "%");
    rows.eq(index).find('td:eq(0) a').css('color', '#60bd68').css('font-weight', 'bold');
    var SiteID = rows.eq(index).find('td:eq(15)').text();
    CmdRemoteX("Services/ExeHandlers/ImportActuals.asp?S=" + SiteID + "&D=" + date + "&Act=ImportAll", "");
    index++;
    if (index < rows.length) setTimeout(function () { ImportActualsCorpInc(date, rows, index); }, 500);
    else GoDialog("CorpDialog1", "1", "NotGlobal");
}

function ImportActualsAll_Site(SiteID, page) {
    var $rows = $('#Rpt tbody tr');
    var date;
    var index = 0;
    if (window.confirm("This will import all displayed Periods of Accounting Actuals.  Do you wish to continue?")) {
        GetControl("progress", "Services/Handlers/ProgressBar.aspx?id=progress");
        setTimeout(function () { ImportActualsSiteInc(SiteID, $rows, 0); }, 500);
    }
}

function ImportActualsSiteInc(SiteID, rows, index) {
    $('#progressbar div').css("width", Math.floor((index / (rows.length - 1)) * 100) + "%");
    rows.eq(index).find('td:eq(0) a').css('color', '#60bd68').css('font-weight', 'bold');
    var date = $rows.eq(index).find('td:eq(4)').text();
    CmdRemoteX("Services/ExeHandlers/ImportActuals.asp?S=" + SiteID + "&D=" + date + "&Act=ImportAll", "");
    index++;
    if (index < rows.length) setTimeout(function () { ImportActualsSiteInc(SiteID, rows, index); }, 500);
    else GoDialog("CorpDialog1", "1", "NotGlobal");
}

function ImportVendorsAll(date, page) {
    var $rows = $('#Rpt tbody tr');
    var SiteID;
    var index = 0;
    if (window.confirm("This will import all Site Vendors.  Do you wish to continue?")) {
        GetControl("progress", "Services/Handlers/ProgressBar.aspx?id=progress");
        setTimeout(function () { ImportVendorsInc(date, $rows, 0); }, 500);
    }
}

function ImportVendorsInc(date, rows, index) {
    $('#progressbar div').css("width", Math.floor((index / (rows.length - 1)) * 100) + "%");
    rows.eq(index).find('td:eq(0) a').css('color', '#60bd68').css('font-weight', 'bold');
    var SiteID = rows.eq(index).find('td:eq(1)').text();
    CmdRemoteX("Services/ExeHandlers/ImportVendors.asp?S=" + SiteID + "&D=" + date + "&Act=ImportAll", "");
    index++;
    if (index < rows.length) setTimeout(function () { ImportVendorsInc(date, rows, index); }, 500);
    else GoDialog("CorpDialog1", "1", "NotGlobal");
}

function ShowTextInput(o) {
    if ($(o).val() == 'Other') {
        $(o).parent().parent().parent().next().children().show();
    } else {
        $(o).parent().parent().parent().next().children().hide();
    }
}

function DoAccountPaste2(Arr, RowID) {
    var S, A;
    var SrcArr = new Array();
    try {
        S = ClipBoardGet();
        A = S.split("\n");

        for (var I = A.length - 1; I >= 0; I--) {
            if (A[I].indexOf(String.fromCharCode(9)) > 0) {
                V = A[I].split(String.fromCharCode(9));
                for (var J = V.length - 1; J >= 0; J--) {
                    SrcArr[J] = V[J];
                }
            }
        }
        DoCopySetXML(Arr, SrcArr, RowID);
        ClipBoardClear();
    }
    catch (ex) {
    }
}

function ClipBoardGet() {
    return window.clipboardData.getData("Text");
}

function DoCopySetXML(a, v, rowId) {
    var o, C, T, R, RD, RT, RX;

    T = DoGetTag("TBODY");
    RD = DoGetTag("TR");
    R = RD.cloneNode(true);
    R = $(T).find("#" + rowId)[0];
    temp = $(R).html().replace(/\[ID\]/gi, '-1');
    $(R).html(temp);

    if (a && a.constructor == Array) {
        for (var I = 0; I < a.length; I++) {
            if (v[I] != undefined) {
                $(R).find("#" + a[I])[0].value = v[I];
                $(R).find("#" + a[I])[0].fireEvent("onchange");
            }
        }
    }
    DoRowChg(R);
}


function ClipBoardClear() {
    ClipBoardClear = window.clipboardData.setData("Text", "");
}

function DoGetRow(evnt) {
 var row;

 if (typeof evnt.currentTarget == 'undefined') {
  row = window.event.srcElement;
 } else {
  row = evnt.currentTarget;
 }

 while (row.tagName != "TR")
  row = row.parentElement;

 return row;
}

function FormatNumber(number,noOfDecimals) {
    Number.prototype.formatMoney = function (c, d, t) {
        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };   

    return parseFloatReplaceCommas(number).formatMoney(noOfDecimals, '.', ',');
}

function enterToTab() {
    if (window.event && window.event.keyCode == 13) {
        window.event.keyCode = 9;
    }
}


function GetUrlwithProgress(loadURL, obj, onsuccess) {
    $(obj).html('<img src="../UI/Images/3Party/ajax-loader.gif" alt=""></img>');
    $.get(loadURL, function (data) {
        $(obj).html(data);
        if (typeof (onsuccess) != 'undefined') {
            onsuccess();
        }
    }).fail(function (data) {
        $(obj).html(loadURL + ' failed');
    });
}

function GetUrlwithProgressJSON(loadURL, obj, onsuccess) {
    $(obj).html('<img src="../UI/Images/3Party/ajax-loader.gif" alt=""></img>');
    $.get(loadURL, function (data) {
        var returnstr = "";
        var json;
        json = jQuery.parseJSON(data);
        returnstr = "<table style='font-size:12px;background-color:#494949;'>";
        $.each(json, function (key, value) {
            returnstr = returnstr + "<tr><td>" + key + "</td>";
            returnstr = returnstr + "<td>" + value + "</td></tr>";
        });
        returnstr = returnstr + "</table>";
        $(obj).html(returnstr);
        if (typeof (onsuccess) != 'undefined') {
            onsuccess();
        }
    }).fail(function (data) {
        $(obj).html(loadURL + ' failed');
    });
}