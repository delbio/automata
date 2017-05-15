import { StateInterface } from './state.interface';

export interface AutomatonInterface
{
    getName(): string;
    getBegin(): StateInterface;
    getEnd(): StateInterface[];
    getState(name: string): StateInterface;
    getStates(): StateInterface[];
    getCurrentState(): StateInterface;
    move(actionName: string): void;
    doAction(actionName: string, parms: any): any;
    setCurrentState(state: StateInterface): void;
    setCurrentState(stateName: string): void;
    isFinished(): boolean;
    checkIntegrity(): void;
}