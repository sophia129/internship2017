
function Init_all(Id){
	Init(Id, 'A');
	Init(Id, 'B');
	Init(Id, 'C');
	Init(Id, 'D');
	Init(Id, 'E');
	Init(Id, 'F');
	Init(Id, 'G');
	Init(Id, 'H');
	Init(Id, 'I');
	Init(Id, 'J');
	Init(Id, 'K');
	Init(Id, 'L');

//Account list Optioning	
	var corpbutton = $('#CorpDialog' + Id + ' a:first').next();
	
	var onclick = corpbutton.attr('onclick');

	$('#Option' + Id + ' a:first').remove();
	var optionbutton = $('#Option' + Id + ' a:first');
	
	onclick = optionbutton.next().attr('onclick');
	
	
	optionbutton.attr('onclick', "OptionChange(" + Id + ");" + onclick);

	
	
  $('#widget' + Id + ' [id^=div]').click(function () {
        StyleDialog("Option"  + Id);
        $("#Option" + Id).show();
		$("#Option" + Id).attr('subwidget', this.id);
	
    });
	
}
function OptionChange(id) {
   
   var searchString = "", url;
    $("#Option" + id).find('select').each(function () {
        var selectname = $(this).attr('name').substring(3, $(this).attr('name').length);
		console.log(selectname);
        var selectedOption = $(this).find('option:selected');
        if (selectedOption.val() == 'selected') selectedOption.val('');
        searchString = searchString + "&" + selectname + "=" + selectedOption.val();
    });

    if ($("#Option" + id).attr('subwidget').indexOf("divB") != -1) {
        searchString = searchString.replace('SIL', 'SIL2');
    }
    else if ($("#Option" + id).attr('subwidget').indexOf("divC") != -1) {
        searchString = searchString.replace('SIL', 'SIL3');
    }
    else if ($("#Option" + id).attr('subwidget').indexOf("divD") != -1) {
        searchString = searchString.replace('SIL', 'SIL4');
    }
	else if ($("#Option" + id).attr('subwidget').indexOf("divE") != -1) {
        searchString = searchString.replace('SIL', 'SIL5');
    }
	else if ($("#Option" + id).attr('subwidget').indexOf("divF") != -1) {
        searchString = searchString.replace('SIL', 'SIL6');
    }
	else if ($("#Option" + id).attr('subwidget').indexOf("divG") != -1) {
        searchString = searchString.replace('SIL', 'SIL7');
    }
	else if ($("#Option" + id).attr('subwidget').indexOf("divH") != -1) {
        searchString = searchString.replace('SIL', 'SIL8');
    }
	else if ($("#Option" + id).attr('subwidget').indexOf("divI") != -1) {
        searchString = searchString.replace('SIL', 'SIL9');
    }
	else if ($("#Option" + id).attr('subwidget').indexOf("divJ") != -1) {
        searchString = searchString.replace('SIL', 'SIL10');
    }
	else if ($("#Option" + id).attr('subwidget').indexOf("divK") != -1) {
        searchString = searchString.replace('SIL', 'SIL11');
    }
	else if ($("#Option" + id).attr('subwidget').indexOf("divL") != -1) {
        searchString = searchString.replace('SIL', 'SIL12');
    }

    url = MergeSearchString($("#CorpDialog" + id + "Url").val(), searchString);
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
            Width = null;
            Height = null;
        }
    } else {
        Width = gGridX - 4;
        Height = gGridY * 6 - 4;
    }
    loadUrlInDash(url, id, Width, Height);
   /*  gClock = setInterval(function () {
        if (iTimer[id] == true) {
            //CellDimensionInit();
            CellDimensionInit(id);
            iTimer[id] = false;
            gTimer = false;
            clearInterval(gClock);
        }
    }, 50); */
}			


