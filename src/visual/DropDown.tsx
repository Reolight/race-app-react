import React from "react";

interface DropDownProps{
    values: string[]
    filter?: string;
    valueSelection: Function
    returnNumber?: boolean
}

export default function DropDown(props: DropDownProps): JSX.Element{

    function arrayDislay(): string[] {
        if (!props.filter) return props.values
        const regex = new RegExp(`^${props.filter}`)
        return props.values.filter(value => regex.test(value))
    }

    function onSelected(value: string){
        if (props.returnNumber){
            const index = props.values.findIndex(v => v === value)
            console.debug(`returned from DD ${index}`)
            props.valueSelection(index)
            return
        }
        
        props.valueSelection(value)
    }

    return(<> {props.values.length > 0 &&
        <div className={"dropdown"} style={{top: 64, left: 0}}>
            {arrayDislay().map(
                (value, index): JSX.Element => {
                    return(
                        <div
                            key={value+index}
                            onClick={()=>onSelected(value)}
                        >
                            {value}
                        </div>
                    )
                }
            )}
        </div>
    }</>)
}