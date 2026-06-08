import { getClassName } from "./value.utils.js";
import { UnsupportedOperationException } from "./exceptions.js";

class State {
  constructor() {
    this.actionMap = {};
  }
  getName() {
    return getClassName(this);
  }
  getNextInputs() {
    const keys = Object.keys(this.actionMap);
    return keys;
  }
  /**
   * @see: http://stackoverflow.com/a/16643074/3753724 
   */
  getNextActions() {
    const vals = Object.keys(this.actionMap).map((key) => this.actionMap[key]);
    return vals;
  }
  getAction(actionName) {
    if (!(actionName in this.actionMap)) {
      throw new UnsupportedOperationException("Invalid action " + actionName + " in state " + this);
    }
    return this.actionMap[actionName];
  }
  addAction(action) {
    if (!(action.getOriginState() === this)) {
      throw new Error("Action's origin must be this state");
    }
    if (action.getName() in this.actionMap) {
      throw new Error("cannot add action " + action.getName() + " to " + this + ": state already has an action with the same name");
    }
    this.actionMap[action.getName()] = action;
  }
  toString() {
    return this.getName() + "[class=" + getClassName(this) + "]";
  }
}

export {
  State
};
