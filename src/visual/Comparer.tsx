import { useState } from "react";
import { GetData } from "../data/Data";
import Comparator from "../logic/Comparator";
import ICompared from "../logic/ICompared";
import Subrace from "../logic/Subrace";
import Charter from "./Charter";
import ComparedItem from "./Comparer/ComparedItem";
import SubraceViewer from "./Comparer/SubraceViewer";

const data : Subrace[] = GetData()
let comparedList : ICompared[]
let subraceForEdit : Subrace | undefined;

export default function Comparer() {
    const [givenSubrace, setGivenSubrace] = useState<Subrace | undefined>()
    const [choosenName, setChoosenName] = useState<string>()
    
    function SubraceEditFinished(editedSubrace: Subrace){
        comparedList = Comparator(editedSubrace)
        setGivenSubrace(editedSubrace)
    }

    function SelectedComparedItem(nameOfSelected: string){
        setChoosenName(nameOfSelected)
    }

    function EditSubrace(){
        subraceForEdit = givenSubrace;
        setGivenSubrace(undefined)
    }
    
    return(
        givenSubrace === undefined? 
            <Charter 
                returnEdited={SubraceEditFinished}
                editedSubrace={subraceForEdit}
            /> :
        <>
            <SubraceViewer 
                key={"SubraceViewer"}
                editedSubrace={givenSubrace}
                editSubraceCallback={EditSubrace}
                definedSubrace={
                    comparedList.find(item => item.subraceOrigin.NAME === choosenName)?.subraceOrigin
                }
            />
            
            {comparedList.map(comparedItem =>
                <ComparedItem 
                    isSelected={comparedItem.subraceOrigin.NAME === choosenName}
                    key={comparedItem.subraceOrigin.NAME}
                    compared={comparedItem}
                    itemName={comparedItem.subraceOrigin.NAME}
                    selected_callback={SelectedComparedItem}
                />
            )}
        </>
    )
    
}