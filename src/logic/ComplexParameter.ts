import { parameter } from "./parameter";

export default interface IComplexParam{
    param1: parameter
    param2: parameter

    derivate_name: string
    derivate?: parameter

    produceDerivate(): number
}