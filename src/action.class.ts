import { ActionInterface } from './action.interface';
import { StateInterface } from './state.interface';
import { isNullOrUndefined, getClassName } from './value.utils';

export class Action implements ActionInterface
{
    protected originState: StateInterface;
    protected targetState: StateInterface;

    constructor(originState: StateInterface, targetState?: StateInterface)
    {
        this.originState = originState;
        this.targetState = isNullOrUndefined(targetState) ? originState : targetState;
        if (isNullOrUndefined(originState)) {
            throw new Error(this+' must have originState set');
        }
    }

    public getName(): string { return getClassName(this); }

    public execute(args?: any): any {
        //console.log('null action body -- ignoring');
        return null;
    }

    public getTargetState(): StateInterface { return this.targetState; }

    public getOriginState(): StateInterface { return this.originState; }

    public toString(): string { return this.getName() + "() -> " + this.getTargetState(); }
}