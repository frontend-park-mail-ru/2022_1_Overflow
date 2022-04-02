const Handlebars = require('handlebars/runtime');
Handlebars.registerHelper('if_eq', function(a, b, options) {
    if (a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

module.exports = Handlebars;