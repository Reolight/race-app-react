import ICompared from "../../logic/ICompared";

interface ItemCompared{
    itemName: string
    selected_callback: Function
    compared: ICompared
}

export default function ComparedItem(props: ItemCompared){
    return (
        <div className="Panel" onClick={() => props.selected_callback(props.itemName)}>
            <label>{props.compared.subraceOrigin.NAME}</label>
            <progress max={100} value={props.compared.coincidence} />
        </div>
    )
}