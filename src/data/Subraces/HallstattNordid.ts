import { arrFromRange } from "../../logic/Helpers";
import IParameterDefinition from "../../logic/IParameterDefinition";
import Subrace from "../../logic/Subrace";

export const scando_nordid : Subrace = new Subrace( 
    "Скандидо-нордид",
    [
        {ID: 0, expected_values: [0, ...arrFromRange(4, 8) ]},
        {ID: 1, expected_values: []},
        {ID: 2, expected_values: []},
        {ID: 3, expected_values: []}

    ] as IParameterDefinition[]
)

