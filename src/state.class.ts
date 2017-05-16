import { StateInterface } from './state.interface';
import { ActionInterface } from './action.interface';

type GenericMap<T> = { [name : string] : T };

export class UnsupportedOperationException extends Error {}

export class State implements StateInterface
{
    private actionMap: GenericMap<ActionInterface> = {};

    constructor() {}
    
    /**
     * @see: http://stackoverflow.com/a/36643177/3753724
     */
    public getName(): string { return this.constructor['name']; }

    public getNextInputs(): string[] {
        const keys = Object.keys(this.actionMap);
        return keys;
    }

    /**
     * @see: http://stackoverflow.com/a/16643074/3753724 
     */
    public getNextActions(): ActionInterface[] {
        const vals = Object.keys(this.actionMap).map(key => this.actionMap[key]);
        return vals;
    }

    public getAction(actionName: string): ActionInterface {
        if (!(actionName in this.actionMap)){
            throw new UnsupportedOperationException('Invalid action '+actionName+' in state '+this);
        }
        return this.actionMap[actionName];
    }

    public addAction(action: ActionInterface): void {
        if (!(action.getOriginState() === this)){
            throw new Error("L'origine della azione deve essere questo stato");
        }
        if (action.getName() in this.actionMap){
            throw new Error("cannot add action "+action.getName()+" to "+this+": state already has an action with the same name");
        }
        this.actionMap[action.getName()] = action;
    }
    public toString(): string { return this.getName() + '[class='+this.constructor['name']+']'; }
}