function Init(Id){
	
	var i='';
	var green = '#60BD68';
    var red = '#F15854';
	var yellow='#dad70b';
	var value, color, label;
	
	//Determine widget size and font size
	var corpurl = $('#CorpDialog' + Id + 'Url').val();
	var index=corpurl.search('SIZE');
	var size=corpurl.substring(index + 5, index + 8);
	var height, line;
	var font ='80px';
	if (size=='1xH'){
		height='140px';
		line='110px';
	}
	else if (size=='1x1'){
		height='440px';
		line='340px';
	}
	else if (size=='2x1'){
		height='440px';
		line='340px';
		font='120px'
	}
	else if (size=='ALL'){
		height='640px';
		line='500px';
		font='200px'
	}
	console.log(height);
	//Widget display
	$('#widget'+ Id+ ' .widget').css({
			'float':'left', 
			'height': height, 
			'width': '101%',
			'backgroundColor': 'white'
		});
		
		
		$('#widget' + Id + ' h1').css({
			'text-align':'center',
			'line-height':line,
			'font-size': font
		});
		
	//Center value
	if (document.getElementById('ValType'+ i + Id) != null && document.getElementById('ValType' + i +  Id).innerHTML == 'AVL%') {
        if (document.getElementById('CenterNum'+ i + Id) == null) return;
        value = document.getElementById('CenterNum'+ i + Id).innerHTML;
        max = 100;
    }
    else {
		//CenterNumAmt makes the number super unrefined
        if (document.getElementById('CenterNumAmt' + i + Id) == null) return;
        value = document.getElementById('CenterNumAmt' + i + Id).innerHTML;
    }
	
	
	
    if (value >= 1000) {
        if (value > 1e10)
            label = '?' + Number(value).toExponential() + '?';
        else if (value >= 1000000) {
            label = Math.round(value / 1000000 * 10) / 10 + 'M';
        }
        else {
            if ($('#ValType' + i + Id).text() == 'AVL$' || $('#ValType' +i + Id).text() == 'RATE') {
                label = Math.round(value / 1000 * 100) / 100 + 'K';
            }
            else {
                label = Math.round(value / 1000 * 10) / 10 + 'K';
            }
        }
    }
    else {
        if ($('#ValType' + i + Id).text() == 'AVL$' || $('#ValType' + i + Id).text() == 'RATE') {
            label = Math.round(value * 100) / 100;
        }
        else {
            label = Math.round(value * 10) / 10;
        }
        if ($('#ValType' + i + Id).text() == 'AVL%') {
            label = label + '%';
        }
    }
	//Decide color
	var percentage=(parseFloat(document.getElementById("Comp"+i+Id).innerHTML))+100;
        if (percentage >= parseFloat($('#widget'+Id+' #Input1').val())) {
            color = green;
        }
        else if (percentage >= parseFloat($('#widget'+Id+' #Input2').val())){
            color = yellow;
        }
		else{
			color=red;
		}
	
		$('#widget'+Id+' #h'+i).html(label);
		$('#widget'+Id+' #h' + i).css('color', color);
	}