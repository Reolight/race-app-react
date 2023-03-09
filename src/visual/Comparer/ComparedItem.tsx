import ICompared from "../../logic/ICompared";

interface ItemCompared{
    itemName: string
    selected_callback: Function
    compared: ICompared
    isSelected: boolean
}

export default function ComparedItem(props: ItemCompared){
    return (
        <div 
            className={props.isSelected? "Panel selected": "Panel"} 
            onClick={() => props.selected_callback(props.itemName)}
        >
            <p>
                <label style={{fontWeight: "bold"}}>{props.compared.subraceOrigin.NAME}</label>
            </p>
            <p>                
                <progress max={100} value={props.compared.coincidence * 100} />
            </p>
        </div>
    )
}