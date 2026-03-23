import { isNullOrUndefined, getClassName } from "./value.utils.js";

class Action {

  constructor(originState, targetState) {
    this.originState = originState;
    this.targetState = isNullOrUndefined(targetState) ? originState : targetState;
    if (isNullOrUndefined(originState)) {
      throw new Error(this + " must have originState set");
    }
  }

  getName() {
    return getClassName(this);
  }
  execute(args) {
    return null;
  }
  getTargetState() {
    return this.targetState;
  }
  getOriginState() {
    return this.originState;
  }
  toString() {
    return this.getName() + "() -> " + this.getTargetState();
  }

}

export {
  Action
};
