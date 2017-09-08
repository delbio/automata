import { StateInterface } from './state.interface';
import { ActionInterface } from './action.interface';
import { GenericMap, getClassName } from './value.utils';
import { UnsupportedOperationException } from './exceptions';

export class State implements StateInterface
{
    private actionMap: GenericMap<ActionInterface> = {};

    constructor() {}
    
    public getName(): string { return getClassName(this); }

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
    public toString(): string { return this.getName() + '[class='+getClassName(this)+']'; }
}