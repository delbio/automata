import { ActionInterface } from './action.interface';

export interface StateInterface
{
    getName(): string;
    getNextInputs(): string[];
    getNextActions(): ActionInterface[];
    getAction(actionName: string): ActionInterface;
    addAction(action: ActionInterface): void;

}