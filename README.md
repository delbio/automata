## What is it?

@delbio/automata is a finite-state machine (FSM) engine.

## Usage

You can install it with `npm`:

```sh
npm install @delbio/automata
```

or get it from url:

```javascript
import {
    Action,
    Automaton,
    State,
} from "https://unpkg.com/@delbio/automata@2.0.0/src/index.js"
```

or define as global variable:

```html
<script type="module">
    import * as automata from "https://unpkg.com/@delbio/automata@2.0.0/src/index.js"
    window.Automata = automata
</script>
```

## Tests

you can inspect test suite inside `__tests__` folder and run all tests using jest from the root's repo.

## Example

```html
<html>
  <body>
    <pre id="console"></pre>

    <script type="module">
        import {
            Action,
            Automaton,
            State,
        } from "https://unpkg.com/@delbio/automata@2.0.0/src/index.js"

        // States
        class Nuovo extends State {}
        class Cancellato extends State {}
        class Pubblicabile extends State {}
        class Pubblicato extends State {}
        // Classes
        class Elimina extends Action {}
        class Modifica extends Action {}
        class Pubblica extends Action {}

        const nuovo = new Nuovo()
        const cancellato = new Cancellato()
        const pubblicabile = new Pubblicabile()
        const pubblicato = new Pubblicato()

        nuovo.addAction(new Elimina(nuovo, cancellato))
        nuovo.addAction(new Modifica(nuovo, pubblicabile))

        pubblicabile.addAction(new Elimina(pubblicabile, cancellato))
        pubblicabile.addAction(new Pubblica(pubblicabile, pubblicato))
        pubblicabile.addAction(new Modifica(pubblicabile, pubblicabile))

        pubblicato.addAction(new Modifica(pubblicato, pubblicabile))

        const automaton = new Automaton()
        for (let s of [nuovo, cancellato, pubblicabile, pubblicato]) {
            automaton.addState(s)
        }
        automaton.addEnd(cancellato)
        automaton.setBegin(nuovo)


        const consoleDomEl = document.getElementById('console')
        function writeLine(message) {
            const textNode = document.createTextNode(message)
            consoleDomEl.appendChild(textNode)
            consoleDomEl.appendChild(document.createElement('br'))
        }

        writeLine('Automaton definition:')
        writeLine(automaton.toString())
        writeLine('Check automaton integrity ...')
        automaton.checkIntegrity()
        writeLine('Passed ;)')

        const doThenMove = function (a) {
            automaton.doAction(a)
            automaton.move(a)
        }
        const curretAutomatonState = function () {
            writeLine(`Current: ${automaton.getCurrentState().toString()}`)
        }

        writeLine(`Set currentState: ${nuovo.toString()}`)
        automaton.setCurrentState(nuovo)
        curretAutomatonState()
        for (let a of ['Modifica', 'Pubblica', 'Modifica', 'Modifica', 'Elimina']) {
            writeLine(`Exec action: ${a.toString()}`)
            doThenMove(a)
            curretAutomatonState()
        }
    </script>
  </body>
</html>
```

execution print this lines:

```
Automaton definition:
Automaton: state->actions mapping { Nuovo[class=Nuovo].Elimina() -> Cancellato[class=Cancellato],Nuovo[class=Nuovo].Modifica() -> Pubblicabile[class=Pubblicabile];;Pubblicabile[class=Pubblicabile].Elimina() -> Cancellato[class=Cancellato],Pubblicabile[class=Pubblicabile].Pubblica() -> Pubblicato[class=Pubblicato],Pubblicabile[class=Pubblicabile].Modifica() -> Pubblicabile[class=Pubblicabile];Pubblicato[class=Pubblicato].Modifica() -> Pubblicabile[class=Pubblicabile] }
Check automaton integrity ...
Passed ;)
Set currentState: Nuovo[class=Nuovo]
Current: Nuovo[class=Nuovo]
Exec action: Modifica
Current: Pubblicabile[class=Pubblicabile]
Exec action: Pubblica
Current: Pubblicato[class=Pubblicato]
Exec action: Modifica
Current: Pubblicabile[class=Pubblicabile]
Exec action: Modifica
Current: Pubblicabile[class=Pubblicabile]
Exec action: Elimina
Current: Cancellato[class=Cancellato]
```

you can try it into this [jsfiddle](https://jsfiddle.net/pdj2czu8/1/)

