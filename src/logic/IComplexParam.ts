import IParameter from "./IParameter";

export default interface IComplexParam extends IParameter {
    paramId1 : IParameter
    paramId2 : IParameter

    produceDerivate(): number
}