var register = function(Handlebars) {
	var helpers = { // add all helpers as key: value pairs
		toMelbourneTime: function(time) {
			if (time) {
				return time.toLocaleString("en-US", {timeZone: "Australia/Melbourne"})
			}
			return ""     
		},

		checkThreshold: function(data, management) {
			var start = '<td>'
			var content = data
			const end = '</td>'
			if (!management.required) {
				start = '<td style="background-color:gray;">'
				content = ""
			} else if (!data & management.required) {
				content = "missing"
				start = '<td style="color:red;">'
			} else if (content < management.lowerThreshold || content > management.upperThreshold) {
				start = '<td style="color:red;">'
			}
			return start + content + end
		}
	}

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		// register helpers
		// for each helper defined above 
		for (var prop in helpers) {
				// we register helper using the registerHelper method
				Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
			// just return helpers object if we can't register helpers here
			return helpers;
	}
};


// export helpers to be used in our express app
module.exports.register = register;
module.exports.helpers = register(null); 