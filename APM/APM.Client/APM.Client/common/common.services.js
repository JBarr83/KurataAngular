(function () {
	"use strict";

	angular
		.module("common.services",
					["ngResource"])
		.constant("appSettings",
		{
			//localhost path for the Web API portion
			serverPath: "http://localhost:53874/"
		});
}());