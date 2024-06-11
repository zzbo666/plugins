
import { useMemo, useState } from "react";
import { IActionContext } from "../../stores/types";
import CreateFlowStore from "../../stores/CreateFlowStore";
import ImagePicker from "./ImgPicker";
import { useMemoizedFn, useMount, useUnmount } from "ahooks";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ActionPageState, CreatePageState } from "../type";
import { Button } from "antd";
import { useCacheLocation, useCustomNavigate } from "@app/pluginUi/hook/useCustomLocation";
import { toJS } from "mobx";


function Create() {
  // modal
  const [actions, setActions] = useState<IActionContext[]>([])
  const navigate = useCustomNavigate();
  const location = useCacheLocation();
  const { isNextScene = false, onCallBack } = (location.state || {}) as CreatePageState


  const createFlowStore = useMemo(() => {
    return new CreateFlowStore(isNextScene)
  }, [])

  // on Event

  const onImageChange = useMemoizedFn((imgUrl: string) => {
    createFlowStore.setImg(imgUrl)
  })

  const addAction = useMemoizedFn((action: IActionContext, position: number) => {
    createFlowStore.setActions(action, position)
  })

  // render
  const renderAction = () => {
    return actions?.map((item, position) => {
      const state: ActionPageState = {
        onCallBack: (action) => {
          addAction({ ...action, position }, position)
        },
        isNextScene: isNextScene
      }
      return <Button
       type="primary" onClick={() => {
        navigate("/action", {
          state: state
        });
      }}>
        {createFlowStore.getAction(position)?.title || "Action"}
      </Button>
    })
  }


  useMount(()=>{
    console.log("create-mount")
  })

  useUnmount(()=>{
    console.log("create-useUnmount")
  })

  return (
    <div>
      <ImagePicker
        onChange={onImageChange}
        value={createFlowStore.storyboardData.imgUrl}
      />
      <div>
        ................ {JSON.stringify(createFlowStore.storyboardData)}
      </div>
      {renderAction()}
      <div></div>
      <Button onClick={() => {
        setActions([...actions, {}])
      }}>
        add action
      </Button>

      <Button onClick={() => {
        if (isNextScene) {
          const senceData = createFlowStore.toSenceData()
          onCallBack(senceData)
          navigate(-1)
        }else{
          // 成功回调 
          console.log("结束plugin:", toJS(createFlowStore.storyboardData))
        }

      }}>
        done
      </Button>
    </div>

  )
}


export default observer(Create)