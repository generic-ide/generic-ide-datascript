// example code taken from https://github.com/tonsky/datascript/blob/master/test/js/tests.js
var d = require('datascript');
var R = require('ramda');
var fs = require('fs');
var kb = require('./knowledgebase.js');
var gr = require('./graphs.js');

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

    // find edges instead of just vertices
    // TODO for now, we insert the 'definedIn' predicate until we figure out how to have the query insert it for us as a constant
    const definedInRelation = R.map(gr.insertPredicateIntoPair("definedIn"),
        d.q('[ :find  ?cn ?pn' +
            '  :in    $ %' +
            '  :where [?c "definedIn" ?p]'+
            '         [?p "name" ?pn]'+
            '         [?c "name" ?cn]'+
            ']',
            kb.pursuitFacts,
            kb.purescriptRules
           ));
    console.log(definedInRelation);

    const outFile = "./tmp/facts.dot";
    // fs.writeFileSync(outFile, factsToGraphViz(kb.pursuitFacts));
    fs.writeFileSync(outFile, gr.relationToGraphViz(definedInRelation));
}

main();
