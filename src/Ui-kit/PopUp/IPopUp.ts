export interface IPopUp {
    size?: string,
    content: {id?: string, icon?: string, text?: string, type?: string}[],
    id: string,
    classNameDiv?: string,
}