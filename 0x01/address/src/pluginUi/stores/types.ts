

export type MintNft = {
    zoraUrl?: string;
};

export type Restart = {
    status?: boolean;
};

// common action 数据结构
export type IActionContext = {
    title?: string;
    type?: "nextSence" | "mintNft" | "restart",
    data?: Storyboard | MintNft | Restart
    position?: number
};

export type Storyboard = {
    imgUrl?: string;
    actions?: IActionContext[];
};
