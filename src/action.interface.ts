import { StateInterface } from './state.interface';
export interface ActionInterface
{
    getName() : string;
    execute(args?: any) : any;
    getTargetState(): StateInterface;
    getOriginState(): StateInterface;
}