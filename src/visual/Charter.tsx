import React, { useEffect, useState } from "react";
import { parameter } from "../logic/parameter";
import Subrace from "../logic/Subrace";
import Parameter from "./Parameter";

export default function Charter(): JSX.Element {
    const [chart, setChart] = useState<Subrace>()
    useEffect(() => {
        if (!chart) setChart(new Subrace('USER_INPUT'))
        else console.log(chart)
    }, [chart])
    
    function call_back(param: parameter, e: number){
        setChart((prevState) => {
            if (prevState){
                const simplex = prevState!.PARAMETERS.find(p => p === param) as parameter
                console.debug(`simplex is: `, simplex, `will receive ${e}`)
                if (simplex) param.value = e;
            }

            console.debug(prevState)
            return prevState
        })
    }

    function complex_back(param: parameter, value: number){
        if (!chart) return
        setChart(prevChart => {
            const complex = prevChart!.COMPLEX.find(c => c.param1 === param || c.param2 === param)
            const simplex = complex?.param1 === param ? complex.param1 : complex?.param2
            if (!complex || !simplex) { 
                console.error(`Complex param not found... param name: ${param.name}`); 
                return
            }
            
            simplex.value = value
            if (complex.param1 && complex.param2){
                const derivate = prevChart!.PARAMETERS.find(par => par.name === complex.derivate_name && par.is_complex)
                if (derivate){
                    derivate.value = complex.produceDerivate()
                } else console.error(`Derivate parameter haven't been found (name: ${complex.derivate_name})`)
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
                        key={param.name + "1"}
                        param_input={chart.COMPLEX.find(complex => complex.derivate_name === param.name)?.param1}
                        callback={complex_back}
                    />
                    <Parameter 
                        key={param.name + "2"}
                        param_input={chart.COMPLEX.find(complex => complex.derivate_name === param.name)?.param2}
                        callback={complex_back}
                    />
                    <Parameter
                        key={param.name}
                        param_input={param}
                        callback={call_back} 
                    />
                    <hr />
                </>
                : <Parameter 
                    key={param.name}
                    param_input={param}
                    callback={call_back} 
                />
            }
        )}
    </div>)
}