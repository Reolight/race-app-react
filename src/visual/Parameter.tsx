import React, { useState } from "react";
import { parameter } from "../logic/parameter";
import DropDown from "./DropDown";

interface param_comp {
    param_input?: parameter
    callback: Function
}

export default function Parameter(props: param_comp){
    const [showDropDown, setShowDD] = useState<boolean>(false)
    const [value, setValue] = useState<number | undefined>(props.param_input?.value)
    //should be moved on upper level...

    function val_sel(num: number) {
        if (!props.param_input){
            console.error(`parameter is not defined...`)
            return
        }

        props.callback(props.param_input, num)
        setShowDD(false)
    }

    function toggleDD(focused: boolean) {
        if (props.param_input?.is_complex) {
            console.warn(`Cannot open dropdown in complex parameter`)
            return
        }

        if (showDropDown && focused) setShowDD(false)
        else setShowDD(focused)
    }

    function Label(): JSX.Element{
        if (!props.param_input) return <label>Undefined</label>
        return <label>{
            (props.param_input.is_complex && props.param_input.value && props.param_input.value >= 0)
            ? `${props.param_input.name}: ${props.param_input.value}` 
            : `${props.param_input.name}`
            }
        </label>
    }

    return(
        (props.param_input? <>
            <p>
                {props.param_input.clue? 
                    <abbr title={props.param_input.clue}>
                        <Label />
                    </abbr> : <Label />
                }
                {props.param_input.type === 'number' && 
                <>
                    {!props.param_input.is_complex && 
                    <input 
                        type={'number'}
                        value={value}
                        onChange={(e) => props.callback(props.param_input, e.target.value)} 
                    />}
                </>}

                {props.param_input.type === 'spinnable' && 
                    <>
                        <button onFocus={() => toggleDD(true)} onBlur={() => toggleDD(false)}>
                            {(value && value >= 0 && props.param_input.values ?
                                `${props.param_input.values[value]} ` : 'Выберите ')
                            + showDropDown? '<' : '>'}
                        </button>
                        {(!props.param_input.is_complex && showDropDown)&& 
                            <DropDown 
                                values={props.param_input.values!}
                                valueSelection={val_sel} 
                            />
                        }
                    </>
                }
            </p>
        </> : <p>Parameter is undefined...</p>)
    )
}