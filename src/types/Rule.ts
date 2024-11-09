
export type Rule = {
    id: string,
    name: string,
    isActive: boolean,
    value?: string | number | null,
    valueType?: "BOOLEAN" | "INTEGER" | "STRING"
}