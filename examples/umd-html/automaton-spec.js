///reference ../../dist/umd/automata.js

"use strict";

// States
var Nuovo = /** @class */ (function (_super) {
    __extends(Nuovo, _super);
    function Nuovo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Nuovo;
}(Automata.State));
var Cancellato = /** @class */ (function (_super) {
    __extends(Cancellato, _super);
    function Cancellato() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cancellato;
}(Automata.State));
;
var Pubblicabile = /** @class */ (function (_super) {
    __extends(Pubblicabile, _super);
    function Pubblicabile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Pubblicabile;
}(Automata.State));
;
var Pubblicato = /** @class */ (function (_super) {
    __extends(Pubblicato, _super);
    function Pubblicato() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Pubblicato;
}(Automata.State));
;
var Elimina = /** @class */ (function (_super) {
    __extends(Elimina, _super);
    function Elimina() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Elimina;
}(Automata.Action));
;
var Modifica = /** @class */ (function (_super) {
    __extends(Modifica, _super);
    function Modifica() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Modifica;
}(Automata.Action));
;
var Pubblica = /** @class */ (function (_super) {
    __extends(Pubblica, _super);
    function Pubblica() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Pubblica;
}(Automata.Action));
;
var nuovo = new Nuovo();
var cancellato = new Cancellato();
var pubblicabile = new Pubblicabile();
var pubblicato = new Pubblicato();
nuovo.addAction(new Elimina(nuovo, cancellato));
nuovo.addAction(new Modifica(nuovo, pubblicabile));
pubblicabile.addAction(new Elimina(pubblicabile, cancellato));
pubblicabile.addAction(new Pubblica(pubblicabile, pubblicato));
pubblicabile.addAction(new Modifica(pubblicabile, pubblicabile));
pubblicato.addAction(new Modifica(pubblicato, pubblicabile));
var automaton = new Automata.Automaton();
[nuovo, cancellato, pubblicabile, pubblicato].forEach(function (s) {
    automaton.addState(s);
});
automaton.addEnd(cancellato);
automaton.setBegin(nuovo);

