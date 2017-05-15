import { ActionInterface } from './action.interface';
import { StateInterface } from './state.interface';

export class Action implements ActionInterface
{
    protected originState: StateInterface;
    protected targetState: StateInterface;

    constructor(originState: StateInterface, targetState?: StateInterface)
    {
        this.originState = originState;
        this.targetState = targetState === null ? originState : targetState;
        if (originState === null){
            throw new Error(this+' must have originState set');
        }
    }
    /**
     * @see: http://stackoverflow.com/a/36643177/3753724
     */
    public getName(): string { return this.constructor['name']; }

    public execute(args: any): any {
        //console.log('null action body -- ignoring');
        return null;
    }

    public getTargetState(): StateInterface { return this.targetState; }

    public getOriginState(): StateInterface { return this.originState; }

    public toString(): string { return this.getName() + "() -> " + this.getTargetState(); }
}