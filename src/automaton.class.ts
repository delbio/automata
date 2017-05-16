import { StateInterface } from './state.interface';
import { AutomatonInterface } from './automaton.interface';

type GenericMap<T> = { [name : string] : T };

export class InvalidArgumentException extends Error {}

export class Automaton implements AutomatonInterface
{
    protected begin: StateInterface;
    protected end: StateInterface[] = [];
    protected state: StateInterface;
    protected states: GenericMap<StateInterface> = {};

    constructor() {}

    private endContain(state: StateInterface): boolean
    {
        if (this.end.length === 0) { return false }
        for(let i = 0; i < this.end.length; i++){
            if (this.end[i] === state) { return true; }
        }
        return false;
    }
    private statesContain(state: StateInterface): boolean
    {
        const keys = Object.keys(this.states);
        if (keys.length === 0) { return false }
        for(const key in keys){
            if (this.states[key] === state) { return true; }
        }
        return false;
    }

    private isString(val: any): boolean
    {
        return typeof val === 'string' || val instanceof String;
    }
    private isNullOrUndefined(val: any): boolean
    {
        return typeof val === "undefined" || val === null;
    }

    public addState(state: StateInterface): void
    {
        this.states[state.getName()] = state;
    }

    /**
     * @see: http://stackoverflow.com/a/36643177/3753724
     */
    public getName(): string { return this.constructor['name']; }
    /**
     * @see: http://stackoverflow.com/a/16643074/3753724 
     */
    public getStates(): StateInterface[]
    {
        const vals = Object.keys(this.states).map(key => this.states[key]);
        return vals;
    }

    public getBegin(): StateInterface { return this.begin; }

    public setBegin(begin: StateInterface): void
    {
        if (this.isNullOrUndefined(begin)){
            throw new InvalidArgumentException('invalid argument, begin must be passed');
        }
        if (!this.isNullOrUndefined(this.begin)) {
            throw new Error('begin state already defined');
        }
        if (!this.statesContain(begin)){
            throw new Error('begin state not declared in the automaton');
        }
        this.begin = begin;
    }

    public addEnd(end: StateInterface): void
    {
        if (this.isNullOrUndefined(end)){
            throw new InvalidArgumentException('invalid argument, end must be passed');
        }
        if (!this.endContain(end)){
            throw new Error('end state not declared in the automaton');
        }
        this.end.push(end);
    }

    public getEnd(): StateInterface[] { return this.end; }

    public isFinished(): boolean
    {
        return this.endContain(this.getCurrentState());
    }

    public getState(name: string): StateInterface
    {
        if (this.isNullOrUndefined(name)){
            throw new InvalidArgumentException('invalid argument, name must be passed');
        }
        if (!this.isString(name)){
            throw new InvalidArgumentException('name must be a string');
        }
        return this.states[name];
    }
    
    public getCurrentState(): StateInterface { return this.state; }

    public move(actionName: string): void
    {
        if (this.isNullOrUndefined(actionName)){
            throw new InvalidArgumentException('invalid argument, actionName must be passed');
        }
        if (!this.isString(actionName)){
            throw new InvalidArgumentException('actionName must be a string');
        }
        let s = this.getCurrentState();
        if (this.isNullOrUndefined(s)){
            throw new Error('current state not selected in the automaton');
        }
        const a = s.getAction(actionName);
        s = a.getTargetState();
        this.setCurrentState(s);
    }

    public doAction(actionName: string, parms: any): any
    {
        if (this.isNullOrUndefined(actionName)){
            throw new InvalidArgumentException('invalid argument, actionName must be passed');
        }
        if (!this.isString(actionName)){
            throw new InvalidArgumentException('actionName must be a string');
        }
        let s = this.getCurrentState();
        if (this.isNullOrUndefined(s)){
            throw new Error('current state not selected in the automaton');
        }
        const a = s.getAction(actionName);
        return a.execute(parms);
    }

    public setCurrentState(state: StateInterface): void
    {
        if (this.end.length === 0){
            throw new Error('icomplete automaton: end state(s) not defined');
        }
        if (this.isNullOrUndefined(this.begin)){
            throw new Error('incomplete automaton: begin state not defined');
        }
        if (this.isNullOrUndefined(state)){
            throw new InvalidArgumentException('automaton state cannot be null or undefined');
        }
        this.state = state;
    }

    public setCurrentStateByName(stateName: string): void
    {
        if (this.isNullOrUndefined(stateName)){
            throw new InvalidArgumentException('invalid argument, stateName must be passed');
        }
        if (!this.isString(stateName)){
            throw new InvalidArgumentException('stateName must be a string');
        }
        this.setCurrentState(
            this.getState(stateName)
        );
    }

    public checkIntegrity(): void {
        const b = this.getBegin();
        if (this.isNullOrUndefined(b)){
            throw new Error('automaton has not initial state');
        }
        const el = this.getEnd();
        if (b.getNextActions().length === 0 && this.endContain(b)){
            throw new Error('initial state '+b+' is a dead-end (has no outgoing action)');
        }
        if (el.length === 0){
            throw new Error('automaton has no end state');
        }
        el.forEach( e => {
            if (e.getNextActions().length > 0 && e !== b){
                throw new Error('end state ' + e + ' must be a dead-end (must not have aoutgoing actions)');
            }
        });
        this.getStates().forEach( e => {
            if ( e.getNextActions().length === 0 && !this.endContain(e) ){
                throw new Error('state ' + e + ' is dead-end (has no outgoing actions)');
            }
        });
    }

    public toString(): string
    {
        let result = this.getName() + ': state->actions mapping ';
        result += '{ ';
        this.getStates().forEach( s => {
            s.getNextActions().forEach( (a,i,l) => {
                result += s + '.' + a;
                if ( i < l.length -1 ){ result += ','; }
            });
        });
        result += ' }';
        return result;
    }
}