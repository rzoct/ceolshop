
	
	var allInput = $("input:text"),
		allPassword = $("input:password");
	if(allInput.length > 0) {
		allInput.jqxInput({
			width: '100%',
			height: 27
		});
	}
	if(allPassword.length > 0) {
		allPassword.jqxInput({
			width: '100%',
			height: 27
		});
	}
	// when doing ajax request block screen
	$(document).ajaxStart( function () {
		$("#loading").show();
	}).ajaxSuccess( function () {
		$("#loading").hide();
	}).ajaxError( function (event, response) {
		var message = response.responseText;
		$("#loading").hide();
		showNotification(notifType.error, message);
	});