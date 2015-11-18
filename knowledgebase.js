// Questions:
//
// - How do we represent ordered collections, while keeping things queryable?
//
module.exports = {
    pursuitFacts: [
        [1, "name", "log"],
        [1, "sort", "value"],
        [1, "definedIn", 2],

        [2, "name", "Console"],
        [2, "sort", "module"],
        [2, "definedIn", 3],

        [3, "name", "Eff"],
        [3, "sort", "module"],
        [3, "definedIn", 4],

        [4, "name", "Monad"],
        [4, "sort", "module"],
        [4, "definedIn", 5],

        [5, "name", "Control"],
        [5, "sort", "module"],
        [5, "definedIn", 6],

        [6, "name", "purescript-console"],
        [6, "sort", "package"],
        [6, "version", "0.1.2"],
        [6, "definedIn", 7],

        [7, "name", "purescript-console"],
        [7, "sort", "repository"],
        [7, "subsort", "github"],
        [7, "url", "https://github.com/purescript/purescript-console"],
        [7, "sort", "github"],

        // more stuff to make the graph a bit more interesting
        [10, "name", "print"],
        [10, "sort", "value"],
        [10, "definedIn", 2]
    ],

    purescriptRules:
        // transitive version of definedIn
        '[ [ (definedInT ?x ?y) [?x "definedIn" ?y] ]' +
        '  [ (definedInT ?x ?y) [?x "definedIn" ?t]' +
        '                       (definedInT ?t ?y) ] ' +
        ']'
};
