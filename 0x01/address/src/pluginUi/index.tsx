

export default function PluginUi() {


    return <div className="p-20 w-full h-full flex-col gap-y-3 flex">
        <div className="px-8 py-4 rounded-lg w-full h-[38px] bg-yellow-400" onClick={() => {
            //调用插件API，完成创建
            parent.postMessage(
                {
                    action: 'pluginCreated',
                    payload: {
                        preview: {
                            media: {
                                type: 'image',
                                url: 'https://img1.baidu.com/it/u=4248493572,492967328&fm=253&fmt=auto&app=120&f=JPEG?w=698&h=1216',
                            },
                            buttons: ['亲一亲', '抱一抱', 'Mint解锁隐藏功能'],
                        },
                        extensionCode: JSON.stringify({ skuid: '101' })
                    }
                },
                "*"
            );
        }}>
            <span className="text-white">创建插件</span> 
        </div>
        <div className="px-8 py-4 rounded-lg bg-yellow-400 w-full h-[38px] text-white" onClick={() => {
            //调用插件API，调用Mint界面
            parent.postMessage(
                {
                    action: 'mint',
                    payload: {}
                },
                "*"
            );
        }}>
            Mint
        </div>
        <div className="px-8 py-4 rounded-lg bg-yellow-400 w-full h-[38px]" onClick={() => {
            //调用插件API，调用Mint界面
        }}>
            <span className="text-white">Close Plugin</span> 
        </div>
    </div>
}