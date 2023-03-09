import IParameterDefinition from "./IParameterDefinition"

export type parameter_type = 'spinnable' | 'number'

export default interface IParameter extends IParameterDefinition {
    name: string
    type: parameter_type
    is_complex?: boolean
    value?: number
    values?: string[]
    image?: string
    clue?: string
}