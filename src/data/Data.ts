import Subrace from "../logic/Subrace"
import { alpinid } from "./Subraces/alpinid";
import { arabid } from "./Subraces/arabid";
import { armenoid } from "./Subraces/armenoid";
import { atlantid } from "./Subraces/atlantid";
import { baltid } from "./Subraces/balt";
import { borreby } from "./Subraces/borreby";
import { brunn } from "./Subraces/brunn";
import { caspid } from "./Subraces/caspid";
import { caucasid } from "./Subraces/caucasid";
import { dinarid } from "./Subraces/dinarid";
import { east_baltid } from "./Subraces/east_balt";
import { east_nordid } from "./Subraces/east_nord";
import { faelid } from "./Subraces/faelid";
import { gorid } from "./Subraces/gorid";
import { indid } from "./Subraces/indid";
import { iranid } from "./Subraces/iranid";
import { keltic_nordid } from "./Subraces/kelt_nord";
import { mediterranid } from "./Subraces/mediterr";
import { noric } from "./Subraces/noric";
import { north_atlantid } from "./Subraces/north_atl";
import { north_pontid } from "./Subraces/north_pont";
import { pontid } from "./Subraces/pontid";
import { scando_nordid } from "./Subraces/scando_nordid";
import { subnordid } from "./Subraces/subnordid";
import { tronder } from "./Subraces/tronder";
import { west_baltdid } from "./Subraces/west_baltid";

const data: Subrace[] = [
    alpinid, arabid, armenoid, atlantid, baltid, borreby, brunn,
    caspid, caucasid, dinarid, east_baltid, east_nordid, faelid, 
    gorid, indid, iranid, keltic_nordid, mediterranid, noric,
    north_atlantid, north_pontid, pontid, scando_nordid, subnordid, 
    tronder, west_baltdid
]

export function GetData(): Subrace[] { return data; }