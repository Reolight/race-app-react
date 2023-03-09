import IParameter from "./IParameter";
import Subrace from "./Subrace";
import ICompared from "./ICompared"
import { GetData } from "../data/Data";

export default function Comparator(compared: Subrace): ICompared[] {
    const data = GetData();
    let ComparedList : ICompared[] = []
    for (let defined_subrace of data){
        let score = 0;
        const params_count = defined_subrace.PARAMETERS.length;
        for (let defined_param of defined_subrace.PARAMETERS){
            let inputed_param = compared.PARAMETERS.find(param => param.ID === defined_param.ID)
            if (!inputed_param || inputed_param.value === undefined){
                console.warn("Comparer: Param with ID ["+defined_param.ID+"] is absent in given subrace instance")
                continue;
            }

            if (Compare(inputed_param, defined_param))
                score++;
        }
        
        ComparedList.push({ 
            subraceOrigin: defined_subrace, 
            coincidence: score / params_count 
        } as ICompared)
    }

    return ComparedList.sort((a, b) => b.coincidence - a.coincidence)
}

export function Compare(param: IParameter, definition: IParameter): boolean{
    if (param.value !== undefined){
        return definition.expected_values?.includes(param.value) ?? false
    }
    else return false
}