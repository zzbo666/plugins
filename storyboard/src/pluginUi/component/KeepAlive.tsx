import { usePrevious, useUpdate } from "ahooks"
import { useEffect, useRef } from "react"
import { useLocation, useOutlet, useNavigate } from "react-router-dom"
import { useCustomNavigate } from "../hook/useCustomLocation"
// import "./index.module.less"
const componentList = new Map()

function KeepAlive(props) {
    const outLet = useOutlet()
    const { pathname, search } = useLocation()
    const toPath = `${pathname}${search}`
    const toPathPreviou = usePrevious(toPath)
    const forceUpdate = useUpdate()
    useEffect(() => {
        if (!componentList.has(toPath)) {
            componentList.set(toPath, outLet)
        }else{
            componentList.delete(toPathPreviou)
        }
        forceUpdate()
    }, [toPath])

    return <div style={{ flex: 1 }}>
        {Array.from(componentList).map(([key, component]) => (
            <div key={key} style={{ display: toPath === key ? "block" : "none" }}>
                {component}
            </div>
        ))}
    </div>
}

export default KeepAlive