var R = require('ramda');

module.exports = {
        // const definedInRelation = R.map(pair => [pair[0], "definedIn", pair[1]], definedInRelation_);
    insertPredicateIntoPair: predicate => pair => [pair[0], predicate, pair[1]],

    relationToGraphViz: function (facts) {
        function mkEdge(triple) {
            const subj = triple[0], pred = triple[1], obj = triple[2];
            const edge = '  "' + subj + '" -> "' + obj + '" [label="' + pred + '"]\n';
            return edge;
        }

        return ""
            + 'digraph imports {\n'
            + '\n'
            +  R.map(mkEdge, facts).join('')
            + '}';
    },

    // dump all of it into a graph, rendering entities as points
    knowledgeBaseToGraphViz: function(facts) {
        function mkEdge(triple) {
            const subj = triple[0],
                  pred = triple[1],
                  obj  = triple[2];

            const node = 'name' == pred ? '"' + subj + '" [shape=point]\n' : '';
            const edge = R.contains(pred, ['name', 'definedIn']) ? '  "' + subj + '" -> "' + obj + '" [label="' + pred + '"]\n' : '';
            return node + edge;
        }

        return ""
            + 'digraph imports {\n'
            + '\n'
            +  R.map(mkEdge, facts).join('')
            + '}';
    }
};
