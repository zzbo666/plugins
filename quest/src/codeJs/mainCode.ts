import { ContractAction } from "../pluginUi/utils/constance/contractAction";
if (pluginApi.type === "detail") {
  pluginApi.uiApi.showUI(0.67);
}

pluginApi.onEvent("onInitializing", () => {
  // ospSandbox.iframe.postMessage({ pluginMessage: 'paySuccess' });
  console.log("onInitializing", Object.keys(pluginApi.ospContracts));
});
// // efficient? No. Works? Yes.
// // todo pass data instead of relying in types
pluginApi.uiApi.onMessage((data: { action: string; payload: any }) => {
  try {
    const { action, payload } = data;
    if (action === ContractAction.pluginRefund) {
      const refund = async () => {
        const questId = payload?.questId;
        const response = await pluginApi.contracts.deek.refundQuest(questId);
        console.log("get pluginRefund contract data:", response);
        pluginApi.uiApi.postMessage({
          data: { type: "refund", data: response },
        });
      };
      refund();
    } else if (action === ContractAction.pluginCreated) {
      console.log("pluginCreated", payload);
      // 1、 approve  返回值
      // 2、 调用 build
      // 3、组装数据， post 出去
      // const approveResult =
      const approve = async () => {
        const approveResult =
          await pluginApi.tokenApproveUtils.ERC20ApproveUtils.approve(
            payload?.approveData?.spender,
            payload?.approveData?.tokenAddress,
            payload?.approveData?.amount
          );

        console.log("approveResult-->", approveResult);
        pluginApi.uiApi.postMessage({
          data: { type: "create_approve", data: approveResult },
        });
        // todo：  通知ui
        if (!approveResult?.success) {
          console.log("approve failed");
          return;
        }
        pluginApi.createOspPostData({
          id: "1",
          name: "quest",
          preview: payload.preview,
          extensionData: payload.extensionData,
          opensocial: {
            extensions: [
              {
                type: "object",
                key: payload?.preview?.type,
                value: payload?.preview,
              },
            ],
            locale: "en",
          },
          addition: {
            questId: payload?.approveData?.questId,
          },
        });
        console.log(
          "====createOspPostDat===>opensocial==>",
          JSON.stringify({
            type: "object",
            key: payload?.preview?.type,
            value: payload?.preview,
          })
        );
      };

      approve();
      //
    } else if (action === ContractAction.pluginVerify) {
      const doVerify = async () => {
        console.log(
          "openReaction-->",
          payload,
          pluginApi?.ospContracts?.createOpenReaction
        );
        const verifyResult = await pluginApi.ospContracts.createOpenReaction({
          communityId: payload?.communityId,
          profileId: payload?.profileId,
          referencedProfileId: payload?.referencedProfileId, // 目标用户
          referencedContentId: payload?.referencedContentId, // 目标帖子id
          reactionValue: 0, // 0
          reactionAndData: payload?.reactionAndData,
          referenceConditionData: "0x",
          ctx: payload?.ctx,
        });
        // TODO:  通知ui  loading false,ui refetch
        console.log("doVerify,response-->", verifyResult);
        pluginApi.uiApi.postMessage({
          data: { type: "verify", data: verifyResult },
        });
      };
      doVerify();
    } else {
      // ignore error
    }
  } catch (error) {
    console.error("pluginApi.uiApi.onMessage error: ", error);
  }
});
