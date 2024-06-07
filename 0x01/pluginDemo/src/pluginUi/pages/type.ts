import { IActionContext } from "../stores/types";


export type ActionPageState = {
    onCallBack: (action: IActionContext) => void
    isNextScene: boolean
}

export type CreatePageState = {
    isNextScene: boolean,
    onCallBack: (data: IActionContext) => void

}