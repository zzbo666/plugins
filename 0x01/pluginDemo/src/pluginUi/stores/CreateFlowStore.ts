import { makeAutoObservable } from "mobx";
import { IActionContext, Storyboard } from "./types";
import { find, findIndex } from "lodash";




class CreateFlowStore {
    storyboardData: Storyboard
    isNextSence: boolean;

    constructor(isNextSence: boolean) {
        this.storyboardData = {}
        this.isNextSence = isNextSence
        makeAutoObservable(this)
    }

    setImg(imgUrl?: string) {
        this.storyboardData.imgUrl = imgUrl
    }

    getAction(position: number){
        const action = find(this.storyboardData.actions, {
            position
        })
        return action
    }

    setActions(action: IActionContext, position: number) {
        if (typeof action.position !== 'number') {
            throw Error("action position null error")
        }
        if(this.storyboardData.actions === undefined){
            this.storyboardData.actions = []
        }
        const index = findIndex(this.storyboardData.actions, {
            position
        })
        
        if (index > -1) {
            this.storyboardData.actions[index] = action
        } else {
            this.storyboardData.actions = [...this.storyboardData.actions, action]
        }
    }

    removeAction(position: number) {
        const index = findIndex(this.storyboardData.actions, {
            position
        })
        if (index > -1) {
            this.storyboardData.actions.splice(index, 1)
            this.resortAction(position)
        }
    }

    private resortAction(position: number) {
        this.storyboardData.actions?.forEach((action, index) => {
            if (action?.position > position) {
                this.storyboardData.actions[index].position - 1
            }
        })
    }

    get isDataReady() {
        return !!this.storyboardData.imgUrl && this.storyboardData.actions?.length > 0
    }

    toSenceData() {
        if (this.isNextSence && this.isDataReady) {
            return {
                type: "nextSence",
                data: this.storyboardData
            } as IActionContext
        }
        return null
    }

}


export default CreateFlowStore
