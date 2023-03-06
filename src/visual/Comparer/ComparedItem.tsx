import ICompared from "../../logic/ICompared";

interface ItemCompared{
    itemName: string
    selected_callback: Function
    compared: ICompared
}

export default function ComparedItem(props: ItemCompared){
    return (
        <div className="Panel" onClick={() => props.selected_callback(props.itemName)}>
            <p><label>{props.compared.subraceOrigin.NAME}</label></p>
            <p><progress  max={100} value={props.compared.coincidence} /></p>
        </div>
    )
}