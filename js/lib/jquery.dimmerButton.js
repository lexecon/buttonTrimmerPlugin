(function($){
	jQuery.fn.trimmerButton = function(options){
		options = $.extend({
			lengthOfBlock: 'def',
			lengthOfDimmer: 'def',
			lengthOfCenter: 'def',
			lengthOfCenterAround: 'def',
			polyCoords: '70,0,  80,20,  120,20,  130,0',
			clickButton: function(event){},
			clickRange: function(event){},
			changeRange: function(event){}
		},options);
		return this.each(function(){
			var dimmerImg = $(this).children('img').eq(0);
			var dimmerMap = $(this).children('map').eq(0);
			var lengthOfDimmer = options.lengthOfDimmer;
			if (lengthOfDimmer == 'def'){
				lengthOfDimmer = dimmerImg.width();
			}
			var lengthOfCenter = options.lengthOfCenter;
			if (lengthOfCenter == 'def'){
				lengthOfCenter = lengthOfDimmer/2;
			}
			var lengthOfCenterAround = options.lengthOfCenterAround;
			if (lengthOfCenterAround == 'def'){
				lengthOfCenterAround = lengthOfDimmer/2;
			}
			var lengthOfBlock = options.lengthOfBlock;
			if (lengthOfBlock == 'def'){
				lengthOfBlock = lengthOfDimmer;
			}
			var main = this;
			var paddingDimmer = (lengthOfBlock-lengthOfDimmer)/2;
			var paddingCenter = (lengthOfBlock-lengthOfCenter)/2;
			var paddingCenterAround = (lengthOfBlock-lengthOfCenterAround)/2;
			var radiusCenter = lengthOfCenter/2;
			var radiusDimmer = lengthOfDimmer/2;
			var leftTop = $(this).offset();
			var centerCoord = {'x':leftTop.left+lengthOfBlock/2, 'y':leftTop.top + lengthOfBlock/2}
			// Dimmer img ***************************************************
			dimmerImg.css("width",lengthOfDimmer).css('height',lengthOfDimmer).css('top',paddingDimmer).css('left',paddingDimmer);
			dimmerMap.append('<area />').children('area').attr('shape','poly').attr('coords',options.polyCoords);
			dimmerMap.append('<area />').children('area').eq(1).attr('shape','circle').attr('coords',radiusDimmer+','+radiusDimmer+','+radiusCenter);
			// Main block ***************************************************
			$(this).css('width',lengthOfBlock).css('height', lengthOfBlock)
			.addClass('jqueryDimmerButtonBlock')
			.prepend('<div class="buttonDimmer defaultDimmer"></div>')
			.prepend('<div class="buttonCenterAround defaultCenterAround"></div>')
			.prepend('<div class="buttonCenter"></div>')
			.prepend('<div class="buttonCenterBackground defaultBackground"></div>')
			// Background **************************************************
			$(this).children('.buttonCenterBackground').css('height', lengthOfCenter)
			.css('width', lengthOfCenter).css('top', paddingCenter).css('left', paddingCenter)
			// Dimmer ******************************************************
			$(this).children('.buttonDimmer').css('height', lengthOfDimmer)
			.css('width', lengthOfDimmer).css('top', paddingDimmer).css('left', paddingDimmer)
			// Center *******************************************************
			$(this).children('.buttonCenter').css('height', lengthOfCenter)
			.css('width', lengthOfCenter).css('top', paddingCenter).css('left', paddingCenter)
			// CenterAround *******************************************************
			$(this).children('.buttonCenterAround').css('height', lengthOfCenterAround)
			.css('width', lengthOfCenterAround).css('top', paddingCenterAround).css('left', paddingCenterAround)

			//Определяем, что будет кнопкой center
			var center = dimmerMap.children('area').eq(1);
			center.click(function(){tougleCenter(main);}) 
			.hover(function(){hoverCenter(main)}, function(){noHoverCenter(main)})
			// Отмена перетаскивания картинки
			$(this).children('img').mousedown(function(ev){
				ev.preventDefault();
				ev.stopPropagation();
			});
			//Определяем, что будет кнопкой Диммера
			var dimmer = dimmerMap.children('area').eq(0);
			dimmer.hover(function(){hoverDimmer(main)}, function(){noHoverDimmer(main)})
			.mousedown(function(ev){
				if(!$(main).children('.buttonCenterBackground').hasClass('defaultBackground')){
					$(main).children('.buttonDimmer').addClass('activeDimmer');
					$(main).mousemove(function(e){
						var rotate = getAngle(centerCoord,{"x":e.pageX, "y":e.pageY},$(main).children('input[type="range"]').val());
						var old = parseInt($(main).children('input[type="range"]').val());
						if (old>340 && old<=360 &&  rotate>=1 && rotate< 30){
							if (rotate>20){
								moveOf(main);
							}
							rotate=360;
						}
						if (old>0 && old<20 &&  rotate<=360 && rotate> 330){
							if (rotate<340){
								moveOf(main);
							}
							rotate=1;
						}
						var opacity = parseInt(rotate/(3.6))/1.5+33;
						$(main).children('.buttonCenterBackground').css('background','hsl(180, '+opacity+'%, 50%)');
						$(main).children('input[type="range"]').val(rotate).change();
						$(main).children('.buttonDimmer').rotate(rotate);
						dimmerImg.rotate(rotate);

					});
					$(main).one('mouseleave', function(){
						moveOf(main);
					});
					$(main).one('mouseup', function(){
						moveOf(main);
					});
				}
				ev.preventDefault();
				ev.stopPropagation();

			})
			// Range ********************************************************
			$(this).children('input[type="range"]').attr('min', 0).attr('max', 360).attr('step',1).attr('value', 0)
			.change(function(){
				var event={"value":$(this).val()};
				options.changeRange(event);
			});
			// checkbox *****************************************************
			$(this).children('input[type="checkbox"]').change(function(){
				var event = {"value": $(this).is(':checked')};
				clickButtonAction(main, event);
				options.clickButton(event);
			});
		}); 
        function moveOf(main){
        	$(main).unbind('mousemove');
        	$(main).children('.buttonDimmer').removeClass('activeDimmer');
        }
		function hoverDimmer (element){
			if(!$(element).children('.buttonCenterBackground').hasClass('defaultBackground')){
				$(element).children('.buttonDimmer').removeClass('defaultDimmer').addClass('hoverDimmer')
			}
		}
		function noHoverDimmer (element){
			if(!$(element).children('.buttonCenterBackground').hasClass('defaultBackground')){
				$(element).children('.buttonDimmer').removeClass('hoverDimmer').addClass('defaultDimmer')
			}
		}
		function hoverCenter(element){
			if(!$(element).children('.buttonDimmer').hasClass('activeDimmer')){
				$(element).children('.buttonCenterAround').removeClass('defaultCenterAround').addClass('hoverCenterAround')
			}
		}
		function noHoverCenter(element){
			if(!$(element).children('.buttonDimmer').hasClass('activeDimmer')){
				$(element).children('.buttonCenterAround').removeClass('hoverCenterAround').addClass('defaultCenterAround')
			}
		}
		function clickButtonAction(element, event){
			if (event.value){
				$(element).children('.buttonCenterBackground').removeClass('defaultBackground').addClass('activeBackground')
			}else {
				$(element).children('.buttonCenterBackground').removeClass('activeBackground').addClass('defaultBackground')
			}
		}
		function tougleCenter(element) {
			var box = $(element).children('input[type="checkbox"]');
			if (box.is(':checked')){
				box.removeAttr('checked');
			}else {
				box.attr('checked', true);
			}
			box.change()
		}
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
	}
})(jQuery)