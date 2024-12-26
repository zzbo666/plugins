"use client";

import "./detail.css";

import { DetailStore, OspStore, useStore } from "@app/pluginUi/stores";
import { formatPow, trimTrailingZeros } from "@app/pluginUi/utils/calculate";

import { ContractAction } from "@app/pluginUi/utils/constance/contractAction";
import { JsPluginUIEventEmitInstance } from "@app/pluginUi/utils/common/JsSdkEventEmit";
import { PageMode } from "@open-social-protocol/osp-plugin-api-types";
import { QuestCard } from "../quest/questCard";
import { QuestRowStatus } from "@app/pluginUi/utils/parse/commonUtils";
import { TUIMsgEnum } from "@app/pluginUi/component";
import bigDecimal from "js-big-decimal";
import { cn } from "@app/pluginUi/utils";
import { ethers } from "ethers";
import { observer } from "mobx-react";
import { queryClient } from "@app/modules/queryClient";
import { toJS } from "mobx";
import { useDoQuestTask } from "../hooks/useDoQuestTask";
import { useEffect } from "react";
import useErrorMessage from "../hooks/useErrorMessage";
import useGetChainInfo from "../hooks/useGetChainInfo";
import usePostMessage from "@app/pluginUi/hook/usePostMessage";
import { useQuestDetailHook } from "@app/apis/quest";
import { useUserOpHashProcessHook } from "@app/apis/contract";
import classNames from "classnames";
import { ConfigManager } from "@app/config/configManager";

export interface QDetailProps {
  profileId: string;
  referencedProfileId: string;
  referencedContentId: string;
  communityId: string;
  onGo?(): void;
  onVerify?(): void;
  mode?: PageMode;
}

const QuestDetailOrg = observer((props: QDetailProps) => {
  const {
    referencedProfileId,
    referencedContentId,
    communityId,
    profileId,
    mode,
  } = props;
  const { showError } = useErrorMessage();
  const bizId = `${referencedProfileId}_${referencedContentId}`;
  console.log("detail props:", props);
  const ospStore = useStore<OspStore>("ospStore");
  const store = useStore<DetailStore>("detailStore");
  const aaAddress = ospStore.aaAddress;
  const postMessage = usePostMessage();
  const zeekClient = ospStore?.zeekClient;
  const islogin = !!ospStore?.zeekClient;
  const { mutateAsync: speedMutateAsync } = useUserOpHashProcessHook();

  useEffect(() => {
    store.setInitLogin(islogin);
  }, [islogin]);

  const { data, isLoading, queryKey } = useQuestDetailHook(bizId, {
    biz_id: bizId,
  });

  useEffect(() => {
    store.setInitInfo(window.screen.availWidth, data?.obj);
    return () => {
      store.clear();
    };
  }, [data?.obj]);

  useEffect(() => {
    JsPluginUIEventEmitInstance.addEventListener(TUIMsgEnum.Refund, refundRes);
    JsPluginUIEventEmitInstance.addEventListener(TUIMsgEnum.Verify, verifyRes);
  }, []);

  const verifyRes = async (response: any) => {
    console.log("----verifyRes", response);
    if (!response.success) {
      updateLoading(false);
      console.log("pluginVerify failed");
      showError("Failed to received");
      return;
    }
    /**
    |--------------------------------------------------
    | 加速接口，提高后端处理速度
    |--------------------------------------------------
    */
    const speedResult = await speedMutateAsync({
      userOperationHash: response?.op_hash || "",
    });
    console.log("verifyRes--speedMutateAsync", speedResult);
    await refreshPage(5000);
    updateLoading(false);
  };
  const refundRes = async (response: any) => {
    console.log("----refundRes", response);
    if (!response.success) {
      console.log("pluginRefund failed");
      store.setRefundLoading(false);
      showError("Failed to received");
      return;
    }
    /**
    |--------------------------------------------------
    | 加速接口，提高后端处理速度
    |--------------------------------------------------
    */
    const result = await speedMutateAsync({
      userOperationHash: response?.op_hash || "",
    });
    console.log("refundRes--speedMutateAsync", result);
    await refreshPage(5000);
    store.setRefundLoading(false);
  };

  const refreshPage = async (timeout: number) => {
    console.log("==refreshPage==");
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
    }, timeout);
  };

  const chainInfo = useGetChainInfo({
    chainConfig: zeekClient?.config,
    address: data?.obj?.token,
  });

  const { doFollowTask, doVerify, loading, updateLoading } = useDoQuestTask(
    ospStore?.zeekEnvironment?.env,
    zeekClient
  );
  // // 总金额
  const total = formatPow(data?.obj?.value ?? 0, chainInfo?.decimals ?? 1);

  const reward = trimTrailingZeros(
    new bigDecimal(total)
      .divide(new bigDecimal(data?.obj?.quantity ?? 1))
      .round(chainInfo?.showDecimals, bigDecimal.RoundingModes.DOWN)
      .getValue()
  );

  // // 展示： 每份奖励
  const rewarFormatValue =
    new bigDecimal(reward).compareTo(new bigDecimal("99999999")) > 0
      ? "99999999+"
      : reward;
  // console.log("reward==>", total, reward, rewarFormatValue);
  // // 展示： 已参与人数百分比
  const progress =
    ((data?.obj?.participateCount ?? 0) / (data?.obj?.quantity ?? 1)) * 100;

  const isEnded = store.isEnded;

  const btnType = store.buttonType;

  console.log("----btnType", btnType, store.refundLoading);

  const onGoAction = () => {
    if (btnType !== "install") return;
    doFollowTask?.(data?.obj?.handle);
  };
  const onVerifyAction = async () => {
    if (btnType !== "install" || loading) return;
    await doVerify?.({
      questId: data?.obj?.questId,
      aaAddress: aaAddress,
      onSuccess({ extension }) {
        try {
          console.log("do verify 111", extension);
          const ctx = ethers.utils.defaultAbiCoder.encode(
            ["bytes2", "string", "uint256", "bytes32"],
            [
              "0x0001",
              zeekClient?.config?.osp?.appId, //这块需要替换成对应的ID
              communityId, //替换成社区ID
              "0x0000000000000000000000000000000000000000000000000000000000000000",
            ]
          );
          const reactionAndData = ethers.utils.concat([
            extension?.address,
            extension?.call_data,
          ]);
          console.log("do verify 222", reactionAndData, ctx);
          const verifyData = {
            profileId: profileId,
            appId: zeekClient?.config?.osp?.appId,
            communityId: communityId,
            referencedProfileId: referencedProfileId,
            referencedContentId: referencedContentId,
            reactionAndData: reactionAndData,
            ctx: ctx,
          };
          console.log("do verify 333");
          postMessage(ContractAction.pluginVerify, verifyData);
        } catch (err) {
          console.error("do verify error", err);
        }
      },
    });
  };

  const onRefundAction = () => {
    if (store.refundLoading || btnType === "end") return;
    store.setRefundLoading(true);
    const test = toJS(data);
    const prams = {
      questId: test.obj.onChainQuestId,
    };
    postMessage(ContractAction.pluginRefund, prams);
  };

  const DetailFootBtn = () => {
    if (btnType === "hide" || store.isH5 || isLoading) {
      return <></>;
    }
    if (data?.obj?.role === QuestRowStatus.OWNER) {
      const end_refund_c = isEnded
        ? "bg-button_pri_disabled_bg"
        : "bg-button_pri_hover_bg";
      return (
        <div className="flex flex-col">
          <div
            className={cn(
              "flex w-full h-44 rounded-12 items-center  justify-center headline-h8  font-obviously_variable",
              end_refund_c
            )}
            onClick={onRefundAction}
          >
            {store.refundLoading ? <div className="btn_loader" /> : null}
            {!store.refundLoading ? "Refund" : ""}
          </div>
        </div>
      );
    } else {
      if (btnType === "verified") {
        return (
          <div className="flex flex-col">
            <div
              className={cn(
                "flex w-full h-44 rounded-12 items-center  justify-center headline-h8  font-obviously_variable",
                "bg-button_pri_disabled_bg"
              )}
            >
              <img
                className="w-20 h-20"
                src={require("../../../../assets/icon/check_alt.svg")}
              ></img>
            </div>
          </div>
        );
      }
      const end_go_c = isEnded
        ? "border-button_sec_disabled_con text-button_sec_disabled_con"
        : "border-button_pri_default_bg text-content_primary bg-button_sec_hover_bg";
      const end_verify_c = isEnded
        ? "bg-button_pri_disabled_con text-pri_disabled_con"
        : "bg-button_pri_default_bg text-button_pri_default_con bg-button_pri_hover_bg";

      return (
        <div
          className={`flex ${
            ConfigManager.getInstance().mode == "page" ? "flex-col gap-4" : "flex-row items-center gap-3"
          }`}
        >
          <div
            className={cn(
              "flex  w-full h-44 rounded-12 items-center  justify-center  headline-h8 font-obviously_variable",
              "border-2 border-solid",
              end_go_c
            )}
            onClick={onGoAction}
          >
            Go
          </div>
          <div
            className={cn(
              "flex w-full h-44  rounded-12 items-center  justify-center headline-h8 font-obviously_variable",
              end_verify_c
            )}
            onClick={onVerifyAction}
          >
            {loading ? <div className="btn_loader" /> : null}
            {!loading ? "Verify" : ""}
          </div>
        </div>
      );
    }
  };
  const LoadingView = () => {
    return (
      <div className="p-16 flex flex-col w-full bg-background_secondary mt-14 rounded-16 ">
        <div className="flex flex-col w-full ">
          <div className="flex flex-row">
            <div className="loader1 mt-12" />
            <div className="ml-12">
              <div className="loader2  mt-12 " />
              <div className="loader3  mt-12" />
            </div>
          </div>
          <div className="loader4 mt-24" />
          <div className="loader5  mt-24" />
        </div>
      </div>
    );
  };
  // 
  return (
    <div className={
      classNames("p-16 flex flex-col w-full justify-between rounded-8", {
        'bg-background_secondary': ConfigManager.getInstance().mode === "card",
      })
    }>
      <div>
        {isLoading ? (
          <LoadingView />
        ) : (
          <QuestCard
            title={data?.obj?.handle ?? ""}
            coinName={chainInfo?.symbol ?? ""} //币种名称
            coinIcon={chainInfo?.icon}
            coinTotal={total ?? "0"} //   总金额s
            gainCoin={rewarFormatValue ?? "0"} //   获得金额s
            progress={progress >= 100 ? 100 : progress} //进度
            claimed={`${progress ?? "0"}%`} //百分比
            cardType={btnType}
            onGo={onGoAction}
            onVerify={onVerifyAction}
            onRefund={onRefundAction}
            btnHid={!store.isH5}
            isEnded={isEnded}
            verified={data?.obj?.participateCount ?? 0}
            verifiers={data?.obj?.verifiers}
            loading={loading}
            islogin={!islogin}
          />
        )}
      </div>
      <div className="mt-24">
        <DetailFootBtn />
      </div>
    </div>
  );
});
const QuestDetail = QuestDetailOrg;

export { QuestDetail };
