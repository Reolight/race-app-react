import { CSSProperties, HTMLAttributes } from "react"
import Comparator, { Compare } from "../../logic/Comparator"
import Subrace from "../../logic/Subrace"

interface subraceViewerProps{
    editedSubrace: Subrace
    definedSubrace?: Subrace
    editSubraceCallback: Function
}

const commonStyle : CSSProperties = {
    fontWeight: "bold"
}

const validColor = "#33CC66"
const invalidColor = "#ff5f5f"

export default function SubraceViewer(props: subraceViewerProps): JSX.Element {
    if (props.definedSubrace === undefined){
        return (
            <div className="Panel">
                {props.editedSubrace.PARAMETERS.map(parameter => {
                    let value = parameter.type === 'spinnable' && parameter.values && parameter.value !== undefined ? 
                        parameter.values[parameter.value] :
                        parameter.value === undefined? "не установлен" : parameter.value
                    return <p><label>{parameter.name}: {value}</label></p>
                })}
                <button onClick={() => props.editSubraceCallback()} >Редактировать</button>
            </div>
        )
    }

    return (
        <div className="Panel">
            {props.editedSubrace.PARAMETERS.map(parameter => {
                let value = parameter.type === 'spinnable' && parameter.values && parameter.value ? 
                    parameter.values[parameter.value] :
                    parameter.value
                let defined_parameter = props.definedSubrace?.PARAMETERS.find(p => p.ID == parameter.ID)
                let description_of_defined: string | undefined = defined_parameter?.expected_values?.map(
                    expected => defined_parameter?.values !== undefined? defined_parameter.values[expected]
                                                            :  expected.toString()).join(", ")
                let font_color: string = defined_parameter === undefined? invalidColor
                    : Compare(parameter, defined_parameter)? validColor : invalidColor
                return (
                    <p>
                        <label style={{...commonStyle, color: font_color}}>{parameter.name}: {value} </label>
                        <br/>
                        <label style={{...commonStyle, color: font_color}}>({description_of_defined})</label>
                    </p>)
            })}
        </div>
    )
}