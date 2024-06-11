import { AppEventNameType } from "@open-social-protocol/osp-plugin-api-types";
import { ContractAction } from "./pluginUi/utils/constance/contractAction";
import { ethers } from "ethers";

ospSandbox.onEvent(AppEventNameType.onUILoad, () => {
  // ospSandbox.iframe.postMessage({ pluginMessage: 'paySuccess' });
  ospSandbox.uiApi.postMessage({
    type: "PluginMessage",
    value: "Say Hello world",
  });
});
const quantity = 1;
// // efficient? No. Works? Yes.
// // todo pass data instead of relying in types
ospSandbox.uiApi.onMessage((msg: string) => {
  try {
    const data = JSON.parse(msg);
    const { action, payload } = data;
    console.log("onMessage result: ", data, action, payload);

    switch (action) {
      case ContractAction.pluginCreated:
        console.log("创建插件: ", ospSandbox.createOspPostData);
        ospSandbox.createOspPostData(payload);
        break;
      case ContractAction.mint:
        const mintValue = ethers.utils
          .parseEther(payload.price)
          .add(ethers.utils.parseEther(payload.fee))
          .mul(quantity);
        console.log("print minValue", mintValue.toNumber());
        const mint = async () => {
          console.log("go into mint");
          // @ts-ignore
          const response = await ospSandbox.contract.mintWithRewards(
            12341234,
            "0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE",
            "0x8C323439E243AFe55554a1EA5Eb8e349bc75A965",
            1,
            quantity,
            "0x000000000000000000000000Cb4054cD972096C0582aFd71897b71Ca79B43665",
            "0xCb4054cD972096C0582aFd71897b71Ca79B43665",
            {
              value: mintValue,
            }
          );
          console.log("get mint contract data:");
        };
        mint();
        break;
      case ContractAction.mintPreviewRequest:
        // ospSandbox.sendContract()
        // @ts-ignore
        const preview = async () => {
          // @ts-ignore
          const response = await ospSandbox.contract.getZoraCollectionInfo(
            "0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE",
            payload?.address,
            payload?.tokenId
          );
          const collection = response[0];
          const price = response[1];
          const fee = response[2];
          // console.log("合约拿到了preview数据", response, collection, price);

          ospSandbox.uiApi.postMessage({
            type: ContractAction.mintPreviewResult,
            value: {
              collection,
              price,
              fee,
            },
          });
        };
        preview();
        break;
      default:
        // ignore error
        break;
    }
  } catch (error) {
    console.error("ospSandbox.uiApi.onMessage error: ", error);
  }
});
