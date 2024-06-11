import { Button } from "antd"



type ImagePickerProps = {
    onChange: (imgUrl: string) => void
    value: string
}
export default function ImagePicker(props: ImagePickerProps) {
    const { onChange, value } = props
    return (
        <div style={{ backgroundColor: "red" }}>
            ImagePicker
            <div>
                Draw with Canvas
            </div>
            <Button onClick={() => {
                onChange("https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png")
            }}>
                uploadw
            </Button>
            <div>
                value: {value}
            </div>
        </div>
    )
}