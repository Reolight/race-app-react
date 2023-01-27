import IParam from "./IParam"

export type parameter_type = 'spinnable' | 'number'

export default interface parameter extends IParam {
    name: string
    type: parameter_type
    is_complex?: boolean
    expected_vals?: number[]
    value?: number
    values?: string[]
    image?: string
    clue?: string
}