import { InvalidArgumentException } from "./exceptions.js";
import { isNullOrUndefined, isString, getClassName } from "./value.utils.js";

class Automaton {

  constructor() {
    this.end = [];
    this.states = {};
  }

  endContain(state) {
    return this.end.indexOf(state) > -1;
  }
  statesContain(state) {
    return this.getStates().indexOf(state) > -1;
  }
  addState(state) {
    this.states[state.getName()] = state;
  }
  getName() {
    return getClassName(this);
  }
  /**
   * @see: http://stackoverflow.com/a/16643074/3753724 
   */
  getStates() {
    const vals = Object.keys(this.states).map((key) => this.states[key]);
    return vals;
  }
  getBegin() {
    return this.begin;
  }
  setBegin(begin) {
    if (isNullOrUndefined(begin)) {
      throw new InvalidArgumentException("invalid argument, begin must be passed");
    }
    if (!isNullOrUndefined(this.begin)) {
      throw new Error("begin state already defined");
    }
    if (!this.statesContain(begin)) {
      throw new Error("begin state not declared in the automaton");
    }
    this.begin = begin;
  }
  addEnd(end) {
    if (isNullOrUndefined(end)) {
      throw new InvalidArgumentException("invalid argument, end must be passed");
    }
    if (!this.statesContain(end)) {
      throw new Error("end state not declared in the automaton");
    }
    if (this.endContain(end)) {
      throw new Error("end state already added");
    }
    this.end.push(end);
  }
  getEnd() {
    return this.end;
  }
  isFinished() {
    return this.endContain(this.getCurrentState());
  }
  getState(name) {
    if (isNullOrUndefined(name)) {
      throw new InvalidArgumentException("invalid argument, name must be passed");
    }
    if (!isString(name)) {
      throw new InvalidArgumentException("name must be a string");
    }
    return this.states[name];
  }
  getCurrentState() {
    return this.state;
  }
  move(actionName) {
    if (isNullOrUndefined(actionName)) {
      throw new InvalidArgumentException("invalid argument, actionName must be passed");
    }
    if (!isString(actionName)) {
      throw new InvalidArgumentException("actionName must be a string");
    }
    let s = this.getCurrentState();
    if (isNullOrUndefined(s)) {
      throw new Error("current state not selected in the automaton");
    }
    const a = s.getAction(actionName);
    s = a.getTargetState();
    this.setCurrentState(s);
  }
  doAction(actionName, parms) {
    if (isNullOrUndefined(actionName)) {
      throw new InvalidArgumentException("invalid argument, actionName must be passed");
    }
    if (!isString(actionName)) {
      throw new InvalidArgumentException("actionName must be a string");
    }
    let s = this.getCurrentState();
    if (isNullOrUndefined(s)) {
      throw new Error("current state not selected in the automaton");
    }
    const a = s.getAction(actionName);
    return a.execute(parms);
  }
  setCurrentState(state) {
    if (this.end.length === 0) {
      throw new Error("icomplete automaton: end state(s) not defined");
    }
    if (isNullOrUndefined(this.begin)) {
      throw new Error("incomplete automaton: begin state not defined");
    }
    if (isNullOrUndefined(state)) {
      throw new InvalidArgumentException("automaton state cannot be null or undefined");
    }
    if (!this.statesContain(state)) {
      throw new Error("incomplete automaton: state is not defined in the automaton");
    }
    this.state = state;
  }
  setCurrentStateByName(stateName) {
    if (isNullOrUndefined(stateName)) {
      throw new InvalidArgumentException("invalid argument, stateName must be passed");
    }
    if (!isString(stateName)) {
      throw new InvalidArgumentException("stateName must be a string");
    }
    this.setCurrentState(
      this.getState(stateName)
    );
  }
  checkIntegrity() {
    const b = this.getBegin();
    if (isNullOrUndefined(b)) {
      throw new Error("automaton has not initial state");
    }
    if (b.getNextActions().length === 0 && this.endContain(b)) {
      throw new Error("initial state " + b + " is a dead-end (has no outgoing action)");
    }
    const el = this.getEnd();
    if (el.length === 0) {
      throw new Error("automaton has no end state");
    }
    el.forEach((e) => {
      if (e.getNextActions().length > 0 && e !== b) {
        throw new Error("end state " + e + " must be a dead-end (must not have aoutgoing actions)");
      }
    });
    this.getStates().forEach((e) => {
      if (e.getNextActions().length === 0 && !this.endContain(e)) {
        throw new Error("state " + e + " is dead-end (has no outgoing actions)");
      }
    });
  }
  toString() {
    let result = this.getName() + ": state->actions mapping ";
    result += "{ ";
    this.getStates().forEach((s, si, sl) => {
      s.getNextActions().forEach((a, i, l) => {
        result += s + "." + a;
        if (i < l.length - 1) {
          result += ",";
        }
      });
      if (si < sl.length - 1) {
        result += ";";
      }
    });
    result += " }";
    return result;
  }

}

export {
  Automaton
};
