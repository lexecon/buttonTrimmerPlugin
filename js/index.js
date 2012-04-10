var center = {'x':257, 'y':257}

$(document).ready(function(){
	$('#test').mousedown(function(){
		$("#blockButton").mousemove(function(e){
			var rotate = getAngle(center,{"x":e.pageX, "y":e.pageY});
			$('#but').rotate(rotate);
			$('#img').rotate(rotate);
		});
		// треугольник АВС с гипотенузой АВ, А = center
	$('#blockButton').one('mouseleave', function(){
		$("#blockButton").unbind('mousemove');
	});

	$('#blockButton').one('mouseup', function(){
		$("#blockButton").unbind('mousemove');
		// треугольник АВС с гипотенузой АВ, А = center
		
		
		//$('#output').html(e.pageX+':'+e.pageY+' ABC='+rotate);
	});
		
		//$('#output').html(e.pageX+':'+e.pageY+' ABC='+rotate);
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