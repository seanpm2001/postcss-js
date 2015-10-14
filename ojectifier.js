var camelcase = require('camelcase-css');

function process(node) {
    var name;
    var result = { };
    node.each(function (child) {

        if ( child.type === 'atrule' ) {
            name = '@' + child.name;
            if ( child.params ) name += ' ' + child.params;
            if ( typeof child.nodes === 'undefined' ) {
                result[name] = true;
            } else {
                result[name] = process(child);
            }

        } else if ( child.type === 'rule' ) {
            result[child.selector] = process(child);

        } else if ( child.type === 'decl' ) {
            name = camelcase(child.prop);
            if ( typeof result[name] === 'undefined' ) {
                result[name] = child.value;
            } else if ( Array.isArray(result[name]) ) {
                result[name].push(child.value);
            } else {
                result[name] = [result[name], child.value];
            }
        }

    });
    return result;
}

module.exports = process;
