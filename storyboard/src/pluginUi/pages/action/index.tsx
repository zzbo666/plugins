import { useLocation, useNavigate } from "react-router-dom";
import { ActionPageState, CreatePageState } from "../type";
import { Button } from "antd";
import { useCacheLocation, useCustomNavigate } from "@app/pluginUi/hook/useCustomLocation";
import { useState } from "react";
import { IActionContext } from "@app/pluginUi/stores/types";




export default function Action() {
    const location = useCacheLocation();
    const navigate = useCustomNavigate();
    const { onCallBack, isNextScene } = (location.state || {}) as ActionPageState
    const [actionData, setActionData] = useState<IActionContext>()
    //TODO 输入框数据
    const title = "testTitle"

    const mockNtfPage: (zoraUrl: string) => IActionContext = (zoraUrl) => {
        return {
            data: {
                zoraUrl
            },
            type: "mintNft"
        }
    }
    const mockRestartPage: () => IActionContext = () => {
        return {
            data: {
                status: true
            },
            type: "restart"
        }
    }

    return (
        <div>

            <div>
                {JSON.stringify(actionData)}
            </div>
            <div>
                ..............
            </div>
            {!isNextScene && <Button onClick={() => {
                const state: CreatePageState = {
                    onCallBack: (action) => {
                        setActionData(action)
                    },
                    isNextScene: true
                }
                navigate("/create", {
                    state: state
                });
            }}>
                To next scene
            </Button>}
            <Button
                onClick={() => {
                    const nftAction = mockNtfPage("https://www.baidu.com/")
                    setActionData(nftAction)
                }}
            >
                Mint NFT
            </Button>
            <Button onClick={() => {
                const nftAction = mockRestartPage()
                setActionData(nftAction)
            }}>
                ReStart
            </Button>
            <Button onClick={() => {
                actionData.title = title
                onCallBack(actionData)
                navigate(-1)
            }}>
                done
            </Button>
        </div>
    )
}