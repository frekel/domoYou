function switchDevice(idx){
	
	if($('#device'+idx+' .panel').hasClass('device-online')){
		var doStatus='Off';
		$('#device'+idx+' .panel').addClass('device-offline').removeClass('device-online');		
		$('#device'+idx+' .mainicon').addClass('device-inactive').removeClass('device-active');	
	}
	else {
		var doStatus='On';
		$('#device'+idx+' .panel').removeClass('device-offline').addClass('device-online');		
		$('#device'+idx+' .mainicon').removeClass('device-inactive').addClass('device-active');	
	}
	
	req.abort();
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd='+doStatus+'&level=0&passcode=&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success: function(json) {
			setTimeout(function(){ getDevices(); },1000);
		}
	});
}

function switchScene(idx){

	var doStatus='On';
	$('#device'+idx+' .panel').removeClass('device-offline').addClass('device-online');		
	$('#device'+idx+' .mainicon').removeClass('device-inactive').addClass('device-active');	
	
	req.abort();	
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchscene&idx='+idx+'&switchcmd='+doStatus+'&level=0&passcode=&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success: function(json) {
			setTimeout(function(){ getDevices(); },1000);
		}
	});
}

function switchGroup(idx){
	
	if($('#device'+idx+' .panel').hasClass('device-online')){
		var doStatus='Off';
		$('#device'+idx+' .panel').addClass('device-offline').removeClass('device-online');		
		$('#device'+idx+' .mainicon').addClass('device-inactive').removeClass('device-active');	
	}
	else {
		var doStatus='On';
		$('#device'+idx+' .panel').removeClass('device-offline').addClass('device-online');		
		$('#device'+idx+' .mainicon').removeClass('device-inactive').addClass('device-active');	
	}
	
	req.abort();
	
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchscene&idx='+idx+'&switchcmd='+doStatus+'&level=0&passcode=&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success: function(json) {
			setTimeout(function(){ getDevices(); },1000);
		}
	});
}

function slideDevice(idx,status){
	
	if(status>1){
		sliderlist['sl'+idx] = status;
		$('#device'+idx+' .panel').removeClass('device-offline').addClass('device-online');		
		$('#device'+idx+' .mainicon').removeClass('device-inactive').addClass('device-active');	
	}
	else {
		$('#device'+idx+' .panel').removeClass('device-offline').addClass('device-online');		
		$('#device'+idx+' .mainicon').removeClass('device-inactive').addClass('device-active');	
	}	
	var parentblock = $('#device'+idx);
	var icon = parentblock.find('i.mainicon');
	
	if(typeof(slide)!=='undefined') slide.abort();
	slide = $.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd=Set%20Level&level='+status+'&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success: function(json) {
			if(status>1) icon.removeClass('device-inactive').addClass('device-active');
			else icon.removeClass('device-active').addClass('device-active');
			sliding = false;
		}
	});
}

function slideDeviceToggle(idx){
	var parentblock = $('#device'+idx);
	var icon = parentblock.find('i.mainicon');
	if(icon.hasClass('device-active')){
		slide = $.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd=Set%20Level&level=1&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success: function(json) {
				icon.removeClass('device-active').addClass('device-inactive');
			}
		});
	}
	else {
		slide = $.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd=Set%20Level&level='+sliderlist['sl'+idx]+'&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success: function(json) {
				icon.removeClass('device-inactive').addClass('device-active');
			}
		});
	}
}