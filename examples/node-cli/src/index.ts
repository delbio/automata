import automaton from './automaton-spec';

function writeLine(message: String): void
{
    console.log(message);
}

// controllo di integrità dell'automa
automaton.checkIntegrity();

const doThenMove = (a: any) => {
    automaton.doAction(a);
    automaton.move(a);
};
const curretAutomatonState = () => {
    writeLine('Current: '+ automaton.getCurrentState().toString());
};

writeLine('Automaton definition:')
writeLine(automaton.toString());
writeLine('Check automaton integrity ...');
automaton.checkIntegrity();
writeLine('Passed ;)');

const nuovo = automaton.getState('Nuovo');
writeLine('Set currentState: '+nuovo.toString());
automaton.setCurrentState(nuovo);
curretAutomatonState();
['Modifica', 'Pubblica', 'Modifica', 'Modifica', 'Elimina'].forEach((a) => {
    writeLine('Exec action: '+a.toString());
    doThenMove(a);
    curretAutomatonState();
});
