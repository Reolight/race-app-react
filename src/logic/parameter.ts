export type parameter_type = 'spinnable' | 'number'

export type parameter = {
    name: string
    type: parameter_type
    is_complex?: boolean
    expected_vals?: number[]
    value?: number
    values?: string[]
    image?: string
    clue?: string
}

export type parameter_definition = {
    name: string
    expected_value: number[]
}