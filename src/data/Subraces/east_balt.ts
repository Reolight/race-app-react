import IParam from "../../logic/IParam";
import Subrace from "../../logic/Subrace";
import { arrFromRange } from "../../logic/Helpers";

export const east_baltid : Subrace = new Subrace( 
    "Восточный балтид",
    [
        {ID: 0, expected_values: [2]},
        {ID: 1, expected_values: [2]},
        {ID: 2, expected_values: [1, 2]},
        {ID: 3, expected_values: [1]},
        {ID: 4, expected_values: [0]},
        {ID: 5, expected_values: [0, 2]},
        {ID: 6, expected_values: [0]},
        {ID: 7, expected_values: [1, 2]},
        {ID: 8, expected_values: [2]},
        {ID: 9, expected_values: [2]},
        {ID: 10, expected_values: [0]},
        {ID: 11, expected_values: arrFromRange (0, 7)},
        {ID: 12, expected_values: arrFromRange (0, 11)},
        {ID: 13, expected_values: [0]}

    ] as IParam[]
)

