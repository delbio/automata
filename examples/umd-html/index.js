///reference ../../dist/umd/automata.js
///reference ./automaton-spec.js

"use strict";

var consoleDomEl = document.getElementById('console');

function writeLine(message)
{
    var textNode = document.createTextNode(message);
    consoleDomEl.appendChild(textNode);
    consoleDomEl.appendChild(document.createElement('br'));
}

writeLine('Automaton definition:')
writeLine(automaton.toString());
writeLine('Check automaton integrity ...');
automaton.checkIntegrity();
writeLine('Passed ;)');

var doThenMove = function (a) {
    automaton.doAction(a);
    automaton.move(a);
};
var curretAutomatonState = function () {
    writeLine('Current: '+ automaton.getCurrentState().toString());
};

writeLine('Set currentState: '+nuovo.toString());
automaton.setCurrentState(nuovo);
curretAutomatonState();
['Modifica', 'Pubblica', 'Modifica', 'Modifica', 'Elimina'].forEach(function (a) {
    writeLine('Exec action: '+a.toString());
    doThenMove(a);
    curretAutomatonState();
});
