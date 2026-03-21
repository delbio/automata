export interface ActionInterface {
    getName(): string;
    execute(args?: any): any;
    getTargetState(): StateInterface;
    getOriginState(): StateInterface;
}

export interface StateInterface {
    getName(): string;
    getNextInputs(): string[];
    getNextActions(): ActionInterface[];
    getAction(actionName: string): ActionInterface;
    addAction(action: ActionInterface): void;
}

export interface AutomatonInterface {
    getName(): string;
    getBegin(): StateInterface;
    getEnd(): StateInterface[];
    getState(name: string): StateInterface;
    getStates(): StateInterface[];
    getCurrentState(): StateInterface;
    move(actionName: string): void;
    doAction(actionName: string, parms?: any): any;
    setCurrentState(state: StateInterface): void;
    setCurrentStateByName(stateName: string): void;
    isFinished(): boolean;
    checkIntegrity(): void;
}

export declare class InvalidArgumentException extends Error {
}
export declare class UnsupportedOperationException extends Error {
}

export declare class Action implements ActionInterface {
    protected originState: StateInterface;
    protected targetState: StateInterface;
    constructor(originState: StateInterface, targetState?: StateInterface);
    getName(): string;
    execute(args?: any): any;
    getTargetState(): StateInterface;
    getOriginState(): StateInterface;
    toString(): string;
}

export declare class State implements StateInterface {
    private actionMap;
    constructor();
    getName(): string;
    getNextInputs(): string[];
    getNextActions(): ActionInterface[];
    getAction(actionName: string): ActionInterface;
    addAction(action: ActionInterface): void;
    toString(): string;
}

export declare type GenericMap<T> = {
    [name: string]: T;
}

export declare class Automaton implements AutomatonInterface {
    protected begin: StateInterface;
    protected end: StateInterface[];
    protected state: StateInterface;
    protected states: GenericMap<StateInterface>;
    constructor();
    private endContain(state);
    private statesContain(state);
    addState(state: StateInterface): void;
    getName(): string;
    getStates(): StateInterface[];
    getBegin(): StateInterface;
    setBegin(begin: StateInterface): void;
    addEnd(end: StateInterface): void;
    getEnd(): StateInterface[];
    isFinished(): boolean;
    getState(name: string): StateInterface;
    getCurrentState(): StateInterface;
    move(actionName: string): void;
    doAction(actionName: string, parms?: any): any;
    setCurrentState(state: StateInterface): void;
    setCurrentStateByName(stateName: string): void;
    checkIntegrity(): void;
    toString(): string;
}
