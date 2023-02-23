import React, { useEffect, useState } from "react";
import IComplexParam from "../logic/IComplexParam";
import IParameter from "../logic/IParameter";
import Subrace from "../logic/Subrace";
import Parameter from "./Parameter";

export default function Charter(props: {returnEdited: Function, editedSubrace?: Subrace}): JSX.Element {
    const [chart, setChart] = useState<Subrace>()
    useEffect(() => {
        if (!chart) 
            setChart(props.editedSubrace === undefined? 
                new Subrace('USER_INPUT'): 
                props.editedSubrace
            )
        else console.log(chart)
    }, [chart])
    
    function call_back(param: IParameter, e: number){
        setChart((prevState) => {
            if (prevState){
                const simplex = prevState!.PARAMETERS.find(p => p === param) as IParameter
                console.debug(`simplex is: `, simplex, `will receive ${e}`)
                if (simplex) param.value = e;
            }

            console.debug(prevState)
            return prevState
        })
    }

    function complex_back(param: IParameter, value: number){
        if (!chart) return
        setChart(prevChart => {
            param.value = value;
            const complex = prevChart!.PARAMETERS.find(c => 
                c.is_complex && 
                ((c as IComplexParam).paramId1 === param || (c as IComplexParam).paramId2 === param)
            ) as IComplexParam
            
            console.log("value: " + param.value, param, complex)
            if (complex.paramId1.value && complex.paramId2.value){
                complex.produceDerivate();
                console.log("produced val of " + complex.name + " is " + complex.value)
            } 

            console.debug(prevChart)
            return prevChart
        })
    }

    return (<div className="Panel" style={{ minWidth: 250 }} key={'charter'}>
        {chart && chart.PARAMETERS.map(param => 
            {return param.is_complex? 
                <>
                    <Parameter 
                        key={param.ID}
                        param_input={(param as IComplexParam).paramId1}
                        callback={complex_back}
                    />
                    <Parameter 
                        key={param.ID}
                        param_input={(param as IComplexParam).paramId2}
                        callback={complex_back}
                    />
                    <Parameter
                        key={param.ID}
                        param_input={param}
                        callback={call_back} 
                    />
                    <hr />
                </>
                : <Parameter 
                    key={param.ID}
                    param_input={param}
                    callback={call_back} 
                />
            }
        )}
        <button onClick={() => props.returnEdited(chart)}>Done</button>
    </div>)
}