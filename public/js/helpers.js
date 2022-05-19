var register = function(Handlebars) {
	var helpers = { // add all helpers as key: value pairs
		
		toMelbourneTime: function(time) {
			if (time) {
				return time.toLocaleString("en-US", {timeZone: "Australia/Melbourne"})
			}
			return ""     
		},

		dateToString: function(time) {
			if (time === "today") time = new Date()
			var date = time.getDate()
			var month = time.getMonth() + 1
			var year = time.getFullYear()
			if (date < 10) date = "0" + date
			if (month < 10) month = "0" + month
			const newTime =  year + "-" + month + "-" + date 
			return newTime
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
		},

		compare: function(operand_1, operator, operand_2, options) {
			var operators = {
			 'eq': function(l,r) { return l == r; },
			 'noteq': function(l,r) { return l != r; },
			 'gt': function(l,r) { return Number(l) > Number(r); },
			 'or': function(l,r) { return l || r; },
			 'and': function(l,r) { return l && r; },
			 '%': function(l,r) { return (l % r) === 0; }
			}
			, result = operators[operator](operand_1,operand_2);
		  
			if (result) return options.fn(this);
			else  return options.inverse(this);
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