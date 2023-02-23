import IParameter from "./IParameter";

export function CompareParam(param: IParameter, definition: IParameter): boolean{
    if (param.value)
        return definition.expected_vals?.includes(param.value) ?? false
    else return false
}