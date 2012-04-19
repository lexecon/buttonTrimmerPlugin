var center = {'x':257, 'y':257}

$(document).ready(function(){
	$('#but').trimmerButton({
		lengthOfBlock: 250,
		lengthOfCenter: 150,
		lengthOfCenterAround: 170,
		lengthOfDimmer: 220,
		polyCoords:'110,0,  110,25,  140,30,  150,5',
		clickButton: function(event){
			$('#out1').html(''+event.value)
		},
	    changeRange: function(event){
	    	$('#out2').html(event.value)
	    }
	});
});

function getAngle (center, curentPoint){
	var ac = Math.abs(center.x - curentPoint.x);
	var bc = Math.abs(center.y - curentPoint.y);
	var bac = (Math.atan(bc/ac)*180)/Math.PI;
	var rotate = 0;
	if (curentPoint.x > center.x){ // 1 или 2 четверть
		if (curentPoint.y > center.y){ // 2 четверть
			rotate = 90 + Math.round(bac);
		}else{ // 1 четверть
			rotate = 90 - Math.round(bac);
		}
	}else { // 3 или 4 четверть
		if (curentPoint.y > center.y){ // 3 четверть
			rotate = 270 - Math.round(bac);
		}else{ // 4 четверть
			rotate = 270 + Math.round(bac);
		}
	}
	return rotate;
}