import React, { useEffect, useState } from "react";
import { parameter } from "../logic/parameter";
import Subrace from "../logic/Subrace";
import Parameter from "./Parameter";

const regex = new RegExp('[0-9]')

export default function Charter(): JSX.Element {
    const [chart, setChart] = useState<Subrace>()
    useEffect(() => {
        if (!chart) setChart(new Subrace())
        else console.log(chart)
    }, [chart])
    
    function call_balck(param: parameter, value: number){
        let c = chart
        if (regex.test(`${value}`)){
            param.value = value
            setChart(c)
        }
    }

    function complex_back(param: parameter, value: number){
        if (!chart) return
        let ch = chart
        const complex = chart.COMPLEX.find(c => c.param1 === param || c.param2 === param)
        if (!complex) { 
            console.error(`Complex param not found... param name: ${param.name}`); 
            return
        }

        param.value = value
        if (complex.param1 && complex.param2 && complex.derivate){
            complex.derivate.value = complex.produceDerivate()
        }

        setChart(ch)
    }

    return (<div className="Panel" style={{ minWidth: 250 }}>
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
                        callback={call_balck} 
                    />
                    <hr />
                </>
                : <Parameter 
                    key={param.name}
                    param_input={param}
                    callback={call_balck} 
                />
            }
        )}
    </div>)
}