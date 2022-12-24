import IComplexParam from "./ComplexParameter"
import { parameter, parameter_definition } from "./parameter"

export default class Subrace{
    NAME: string = ""
    COMPLEX: IComplexParam[] = [
        {
            derivate_name: 'Носовой индекс',
            param1 : {
                name: "Длина носа",
                type: 'number'
            },
            param2 : {
                name: "Ширина носа",
                type: 'number'
            },

            produceDerivate(): number {
                if (!this.param1.value && !this.param2.value) return -1
                const coeff = this.param2.value! / this.param1.value!

                if (coeff < 0.70) return 0
                else return coeff <= 0.849? 1 : 2
            }
        },

        {
            derivate_name: "Головной индекс",
            param1 : {
                name: "Ширина черепа",
                type: 'number'
            },
            param2 : {
                name: "Длина лица",
                type: "number"
            },

            produceDerivate(): number{
                if (!this.param1.value && !this.param2.value) return -1
                const coeff = this.param1.value! / this.param2.value!

                if (coeff < 0.77) return 0
                else return coeff <= 0.809? 1 : 2
            }
        },

        {
            derivate_name: 'Лицевой индекс',
            param1: {
                name: "Высота лица 1*",
                type: 'number',
                clue: 'Высота лица от подбородка до глабеллы'
            },
            param2: {
                name: 'Ширина лица',
                type: 'number',
            },

            produceDerivate(): number{
                if (!this.param1.value && !this.param2.value) return -1
                const coeff = this.param1.value! / this.param2.value!

                if (coeff > 0.88) return 0
                else return coeff >= 0.84 ? 1 : 2
            }
        },

        {
            derivate_name: `Высота лба`, 
            param1: {
                name: 'Высота лба',
                type: "number",
            },
            param2: {
                name: 'Высота лица 2',
                type: "number",
                clue: "Высота лица от подбородка до волос"
            },

            produceDerivate(): number{
                if (!this.param1.value && !this.param2.value) return -1

                if (this.param1.value! > this.param2.value! / 3 * 1.05) return 0
                else return this.param1.value! > this.param2.value! / 3 * 0.95 ? 1 : 2
            }
        }
    ]
    
    PARAMETERS: parameter[] = [
        {
            name: "Головной индекс",
            type:'spinnable',
            is_complex: true,
            values: ["Долихоцефалия", "Мезоцефалия", "Брахицефалия"]
        },

        {
            name: 'Лицевой индекс',
            type:'spinnable',
            is_complex: true,
            values: ["Лептопросопия", "Мезопросопия", "Юрипросопия"]
        },

        {
            name: 'Носовой индекс',
            type:'spinnable',
            is_complex: true,
            values: ["Лепториния", "Мезориния", "Хамэриния"]
        },

        {
            name: `Высота лба`, 
            type: "spinnable",
            is_complex: true,
            values: ["Высокий", "Средний", "Низкий"]
        },

        {
            name: 'Форма носа', 
            type:'spinnable',
            is_complex: false,
            values: ['Вогнутая', 'Прямая', 'Выпуклая', 'Волнистая']
        },

        {
            name: 'Форма лба',
            type: 'spinnable',
            is_complex: false,
            values: ['Вертикальный','Наклонный','Выпуклый']
        },
        
        {
            name: 'Выпуклость затылка',
            type: 'spinnable',
            values: ['Плоский', 'Слабо выпуклый', 'Выпуклый']
        },
        
        {
            name: 'Форма глаз', 
            type: 'spinnable',
            values: ['Внутренние углы выше наружных',
                'Горизонтальный', 'Наружные углы выше внутренних']
        },
        
        {
            name: 'Ширина скул',
            type: 'spinnable', 
            values: ['Узкие', 'Средние', 'Средние']
        },

        {
            name: "Ширина челюсти",
            type: 'spinnable',
            values: ['Узкая', 'Средняя', 'Широкая']
        },

        {
            name: 'Цвет кожи',
            type: 'spinnable',
            values: ['Светлая', 'Светло-смуглая', 'Смуглая']
        },

        {name: 'Цвет глаз', type:'number'},
        
        {
            name: 'Цвет волос',
            type: 'spinnable',
            values: ['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q',
                        'R','S','T','U','V','W','X','Y','i','ii','iii','iv','v','vi']
        },
        
        {
            name: 'Тип волос',
            type: 'spinnable',
            values: ['Прямые', 'Волнистые', 'Вьющиеся']
        }
    ]

    /**
     * Constructor for creation of subrace instance with 
     * defined 'expected values' or without (for user input)
     */
    constructor (
        SUBRACE_NAME: string,
        expected_values?: parameter_definition[]
    )
    {
        this.NAME = SUBRACE_NAME
        if (expected_values){
            expected_values.forEach(ev => {
                const param = this.PARAMETERS.find(par => par.name === ev.name)
                if (param) param.expected_vals = ev.expected_value
            })
        }
    }
}