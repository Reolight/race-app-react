import IParameterDefinition from "../../logic/IParameterDefinition";
import Subrace from "../../logic/Subrace";
import { arrFromRange } from "../../logic/Helpers";

export const dinarid : Subrace = new Subrace( 
    "Динарид",
    [
        {ID: 0, expected_values: [2]},
        {ID: 1, expected_values: [0]},
        {ID: 2, expected_values: [0]},
        {ID: 3, expected_values: [1]},
        {ID: 4, expected_values: [2]},
        {ID: 5, expected_values: [1]},
        {ID: 6, expected_values: [0, 1]},
        {ID: 7, expected_values: [1, 2]},
        {ID: 8, expected_values: [0]},
        {ID: 9, expected_values: [1]},
        {ID: 10, expected_values: [2]},
        {ID: 11, expected_values: [15, 17]},
        {ID: 12, expected_values: arrFromRange (13, 23)},
        {ID: 13, expected_values: [2]}

    ] as IParameterDefinition[]
)

