import parameter from "./parameter";

export function CompareParam(param: parameter, definition: parameter): boolean{
    if (param.value)
        return definition.expected_vals?.includes(param.value) ?? false
    else return false
}