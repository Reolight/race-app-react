import IParam from "./IParam";
import parameter from "./parameter";

export default interface IComplexParam extends IParam{
    param1: parameter
    param2: parameter

    derivate_name: string
    produceDerivate(): number
}