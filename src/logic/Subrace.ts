import IComplexParam from "./ComplexParameter"
import IParam from "./IParam"
import parameter from "./parameter"

export default class Subrace{
    NAME: string = ""
    COMPLEX: IComplexParam[] = [
        {
            ID: 0,
            derivate_name: 'Носовой индекс',
            param1 : {
                ID: 18,
                name: "Длина носа",
                type: 'number'
            },
            param2 : {
                ID: 19,
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
            ID: 1,
            derivate_name: "Головной индекс",
            param1 : {
                ID: 20,
                name: "Ширина черепа",
                type: 'number'
            },
            param2 : {
                ID: 21,
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
            ID: 2,
            derivate_name: 'Лицевой индекс',
            param1: {
                ID: 22,
                name: "Высота лица 1*",
                type: 'number',
                clue: 'Высота лица от подбородка до глабеллы'
            },
            param2: {
                ID: 23,
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
            ID: 3,
            derivate_name: `Высота лба`, 
            param1: {
                ID: 24,
                name: 'Высота лба',
                type: "number",
            },
            param2: {
                ID: 25,
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
            ID: 0,
            name: "Головной индекс",
            type:'spinnable',
            is_complex: true,
            values: ["Долихоцефалия", "Мезоцефалия", "Брахицефалия"]
        },

        {
            ID: 1,
            name: 'Лицевой индекс',
            type:'spinnable',
            is_complex: true,
            values: ["Лептопросопия", "Мезопросопия", "Юрипросопия"]
        },

        {
            ID: 2,
            name: 'Носовой индекс',
            type:'spinnable',
            is_complex: true,
            values: ["Лепториния", "Мезориния", "Хамэриния"]
        },

        {
            ID: 3,
            name: `Высота лба`, 
            type: "spinnable",
            is_complex: true,
            values: ["Высокий", "Средний", "Низкий"]
        },

        {
            ID: 4,
            name: 'Форма носа', 
            type:'spinnable',
            is_complex: false,
            values: ['Вогнутая', 'Прямая', 'Выпуклая', 'Волнистая']
        },

        {
            ID: 5,
            name: 'Форма лба',
            type: 'spinnable',
            is_complex: false,
            values: ['Вертикальный','Наклонный','Выпуклый']
        },
        
        {
            ID: 6,
            name: 'Выпуклость затылка',
            type: 'spinnable',
            values: ['Плоский', 'Слабо выпуклый', 'Выпуклый']
        },
        
        {
            ID: 7,
            name: 'Форма глаз', 
            type: 'spinnable',
            values: ['Внутренние углы выше наружных',
                'Горизонтальный', 'Наружные углы выше внутренних']
        },
        
        {
            ID: 8,
            name: 'Ширина скул',
            type: 'spinnable', 
            values: ['Узкие', 'Средние', 'Широкие']
        },

        {
            ID: 9,
            name: "Ширина челюсти",
            type: 'spinnable',
            values: ['Узкая', 'Средняя', 'Широкая']
        },

        {
            ID: 10,
            name: 'Цвет кожи',
            type: 'spinnable',
            values: ['Светлая', 'Светло-смуглая', 'Смуглая']
        },

        {ID: 11, name: 'Цвет глаз', type:'number'},
        
        {
            ID: 12,
            name: 'Цвет волос',
            type: 'spinnable',
                    //0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
            values: ['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q',
                      //16  17  18  19  20  21  22  23  24   25   26    27  28   29
                        'R','S','T','U','V','W','X','Y','i','ii','iii','iv','v','vi']
        },
        
        {
            ID: 13,
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
        expected_values?: IParam[]
    )
    {
        this.NAME = SUBRACE_NAME
        if (expected_values){
            expected_values.forEach(ev => {
                let param : IParam | undefined = this.PARAMETERS.find(par => par.ID === ev.ID)
                if (!param) {
                    param = this.COMPLEX.find(comp => comp.ID == ev.ID) as IParam;
                }
                
                param.expected_values = ev.expected_values
            })
        }
    }
}