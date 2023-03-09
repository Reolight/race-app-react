import React, { useState } from "react";
import IParameter from "../logic/IParameter";
import DropDown from "./DropDown";

interface param_comp {
    param_input?: IParameter
    callback: Function
}

const regex = new RegExp('[0-9]')

export default function Parameter(props: param_comp){
    const [showDropDown, setShowDD] = useState<boolean>(false)
    //should be moved on upper level...

    function val_sel(option: number) {
        console.debug(`Received ${option} and passed`)
        props.callback(props.param_input, option)
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
        (props.param_input? <div style={{position: 'relative', margin: 16}}>
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
                        value={props.param_input.value}
                        onChange={(e) => regex.test(e.target.value) && props.callback(props.param_input, +e.target.value)}   
                    />}
                </>}

                {props.param_input.type === 'spinnable' &&
                    <>
                        <button 
                            onFocus={() => toggleDD(true)} 
                            onBlur={() => setTimeout(() => toggleDD(false), 100)}
                        > 
                            {`${props.param_input.value !== undefined && props.param_input.values && props.param_input.value >= 0  ?
                                `${props.param_input.values[props.param_input.value]} ` : 
                                !props.param_input.is_complex? 'Выберите ': '...'}
                            ${!props.param_input.is_complex? (showDropDown ? '<' : '>') : ''}`}
                        </button>
                        {(!props.param_input.is_complex && showDropDown)&& 
                            <DropDown 
                                values={props.param_input.values!}
                                valueSelection={val_sel}
                                returnNumber={true}
                            />
                        }
                    </>
                }
        </div> : <p>Parameter is undefined...</p>)
    )
}