// example code taken from https://github.com/tonsky/datascript/blob/master/test/js/tests.js
var d = require('datascript');
var R = require('ramda');
var kb = require('./knowledgebase.js');

function main() {
    const db = d.init_db(kb.pursuitFacts);

    // a simple query
    console.log(
        d.q('[:find [?id] :where [?id "name" "log"]]', db)
    );

    // a query using a recursive rule
    console.log(
        d.q('[ :find  ?p  ' +
            '  :in    $ % ' +
            '  :where (definedInT 4 ?p) ]',
            kb.pursuitFacts,
            kb.purescriptRules
           )
    );

    // the same with a name lookup
    console.log(
        d.q('[ :find  ?n ?p' +
            '  :in    $ %' +
            '  :where (definedInT 4 ?p)' +
            '         [?p "name" ?n]'+
            ']',
            kb.pursuitFacts,
            kb.purescriptRules
           )
    );
}

main();
