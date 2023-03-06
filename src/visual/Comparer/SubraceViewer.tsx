import Subrace from "../../logic/Subrace"

interface subraceViewerProps{
    editedSubrace: Subrace
    definedSubrace?: Subrace
    editSubraceCallback: Function
}

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
                return <p><label>{parameter.name}: {value} ({props.definedSubrace?.PARAMETERS.find(p => p.ID == parameter.ID)?.expected_values})</label></p>
            })}
        </div>
    )
}