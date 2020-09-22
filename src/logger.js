angular.module("ngLogger");

angular
	.module('app')
	.factory('logger', ["$log", logger]);

function logger($log) {

	var defaults = {
		timeOut: 4000,
		positionClass: 'toast-bottom-right'
	}

	function getOptions(optionsOverride) {
		var override = angular.extend({}, defaults, optionsOverride);
		return override;
	}

	function format(data) {
		data = !angular.isObject(data) ? data : (data.message ? data.message : (data.error ? data.error : undefined));
		return data;
	}

	function error(message, title, options) {
		message = format(message);
		if (!message) return;
		window.toastr.error(message, title, getOptions(options));
	}

	function warning(message, title, options) {
		message = format(message);
		if (!message) return;
		window.toastr.warning(message, title, getOptions(options));
	}

	function info(message, title, options) {
		message = format(message);
		if (!message) return;
		window.toastr.info(message, title, getOptions(options));
	}

	function success(message, title, options) {
		message = format(message);
		if (!message) return;
		window.toastr.success(message, title, getOptions(options));
	}

	var service = {
		showToasts: true,

		error: error,
		info: info,
		success: success,
		warning: warning,

		// straight to console; bypass toastr
		log: $log.log
	};

	window.toastr.options.closeButton = true;

	return service;
}