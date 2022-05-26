export interface IPopUp {
    size?: string,
    href?: string,
    content: {id?: string, icon?: string, text?: string, type?: string, href?: string}[],
    id: string,
    classNameDiv?: string,
}