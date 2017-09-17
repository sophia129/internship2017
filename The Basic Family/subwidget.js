function Init(Id, i){
	var green = '#13A20F';
    var red = '#C41F1F';
	var yellow='#dad70b';
	var value, color, label;
	
	$('#widget'+ Id+ ' .widget').css({
			'float':'left', 
			'height': '152px', 
			'width': '105%',
		});
		
		
		$('#widget' + Id + ' h1').css({
			'text-align':'center',
			'line-height':'140px',
			'font-size': '95px',
			
		});
		
	
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

	var percentage=(parseFloat(document.getElementById("Comp"+i+Id).innerHTML))+100;

	console.log(percentage);
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