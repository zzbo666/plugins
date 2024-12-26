"use client";

import "../questDetail/detail.css";

import { OspStore, useStore } from "@app/pluginUi/stores";
import { TQuestEnum, TQuestType } from "@app/pluginUi/stores/types";
import {
  formatKMBNumber,
  formatNumberPrecision,
} from "@app/pluginUi/utils/parse/commonUtils";

import { Progress } from "antd";
import bigDecimal from "js-big-decimal";
import { cn } from "@app/pluginUi/utils";
import { transformIpfs } from "@app/pluginUi/utils/transformIpfs";
import { useOspProfileList } from "../hooks/useOspProfileList";
import { useRef } from "react";

export interface QCardProps {
  // 标题
  title: string;
  //   获得币种
  coinName: string;
  //   获得币种图标
  coinIcon?: string;
  //   总金额
  coinTotal: string;
  // 获得金额
  gainCoin: string;
  //   进度
  progress?: number;
  // 参与人数
  verified?: number;
  //   百分比
  claimed?: string;
  // 隐藏类型
  btnHid?: boolean;
  // verify 的人handle 数组
  verifiers?: string[];

  btn?: "GO" | "VERIFY" | "HIDE";

  loading: boolean;

  cardType: "install" | "end" | "refund" | "hide" | "verified";

  islogin: boolean;
  // 是否结束
  isEnded: boolean;
  onGo?(): void;
  onVerify?(): void;
  onRefund?(): void;
}

const QuestCardOrg = (props: QCardProps) => {
  const {
    title,
    coinName,
    coinIcon,
    coinTotal,
    gainCoin,
    verified,
    claimed,
    btn,
    progress,
    btnHid,
    verifiers,
    isEnded,
    loading,
    cardType = TQuestEnum.Initial,
    islogin,
    onGo,
    onVerify,
    onRefund,
  } = props;

  console.log("btnHid", btnHid);
  const titleStr = islogin ? "Follow --- X" : `Follow @${title}'s X`;
  const gainCoinStr = islogin ? "---" : gainCoin;
  const coinTotalStr = islogin
    ? "from a --- prize pool"
    : `from a ${coinTotal} ${coinName} prize pool`;

  const progressNum = islogin ? 40 : progress;

  const claimedStr = islogin ? "---" : claimed;

  const previewRef = useRef(null);
  const ospStore = useStore<OspStore>("ospStore");

  const { data } = useOspProfileList(
    ospStore?.ospClient,
    verifiers?.slice(0, 3)
  );
  console.log("profile list-->", data, verifiers);
  const onGoAction = () => {
    console.log("onGoAction");
    onGo && onGo();
  };
  const onVerifyAction = () => {
    onVerify && onVerify();
  };
  const onRefundAction = () => {
    onRefund && onRefund();
  };

  const formatVerified = formatKMBNumber(
    formatNumberPrecision(
      verified,
      1,
      bigDecimal.RoundingModes.DOWN,
      true,
      false
    ),
    1
  );
  const verifiedStr = islogin ? "--" : formatVerified;

  const TopView = () => {
    console.log("questCard==TopView", islogin);
    return (
      <div className="flex relative  selection:w-full ">
        <div className="flex w-full flex-row items-center gap-2 ">
          <div className="flex p-10 bg-background_primary items-center justify-center rounded-8">
            <img
              src={require("../../../../assets/icon/twitter_icon.svg")}
              className="h-24 w-24"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-content_primary body-l-bold">{titleStr}</div>
            <div className="flex flex-row text-content_tertiary items-center whitespace-nowrap overflow-ellipsis overflow-hidden body-s-regular gap-2 ">
              Get
              <div className="flex whitespace-nowrap overflow-ellipsis overflow-hidden body-s-bold text-content_primary items-center flex-row">
                {!islogin ? (
                  <img
                    src={
                      coinIcon ||
                      require("../../../../assets/icon/USDC_test.svg")
                    }
                    className="h-12 w-12 mr-2"
                    // style={{ objectFit: "contain" }}
                  />
                ) : null}
                <div>{gainCoinStr}</div>
              </div>
              {coinTotalStr}
            </div>
          </div>
        </div>

        {isEnded ? (
          <div className=" absolute flex px-4 py-2 items-center h-17 bg-primitives_blue_900 text-primitives_teal_500 rounded-4 body-s-bold right-0">
            Ended
          </div>
        ) : null}
      </div>
    );
  };

  /**
  |--------------------------------------------------
  | 去掉 deek 标识
  |--------------------------------------------------
  */
  const EndDescView = () => {
    return (
      <div className="flex flex-row items-center mt-24 py-4 px-8 w-fit bg-background_tertiary rounded-6">
        <div>
          <img
            src={require("../../../../assets/icon/zeek.svg")}
            className="h-14 w-14"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="text-content_secondary ml-[8px] body-s-regular">
          Powered by Deek
        </div>
      </div>
    );
  };

  const ButtonView = () => {
    const isEnd = cardType === "end";
    const isRefund = cardType === "refund";
    console.log("questCard==ButtonView", cardType);
    if (cardType === "hide") {
      return null;
    }
    if (isRefund) {
      return (
        <div className="flex flex-row">
          <div
            className="flex bg-button_pri_default_bg w-full h-44 mt-14 rounded-12 items-center  justify-center headline-h8 font-obviously_variable"
            onClick={onRefundAction}
          >
            Refund
          </div>
        </div>
      );
    } else {
      const end_go_c = isEnd
        ? "border-button_sec_disabled_con text-button_sec_disabled_con"
        : "border-button_pri_default_bg text-button_pri_default_bg";
      const end_verify_c = isEnd
        ? "bg-button_pri_disabled_con text-pri_disabled_con"
        : "bg-button_pri_default_bg text-pri_defult_con";

      return (
        <div className="flex flex-row items-center justify-center mt-24">
          <div
            className={cn(
              "flex flex-1 h-44 rounded-12 items-center  justify-center  headline-h8 font-obviously_variable",
              "border-2 border-solid",
              end_go_c
            )}
            onClick={onGoAction}
          >
            Go
          </div>
          <div
            className={cn(
              "ml-12 flex flex-1 h-44 rounded-12 items-center  justify-center headline-h8 font-obviously_variable",
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

  interface ProgressProps {
    progress?: number;
  }
  const ProgressView = () => {
    return (
      <div className="flex flex-col w-full bg-background_overlay10 rounded-[6px] mt-[12px]">
        <div className="absolute left-0 top-0 h-[8px] bg-red-400 "></div>
        <Progress
          percent={progressNum}
          type="line"
          showInfo={false}
          strokeColor="#1ed1e9"
        />
      </div>
    );
  };
  const ProgressInfoView = (props: ProgressProps) => {
    const { progress } = props;
    if (btn === "GO") {
      return null;
    }

    const UsesAvartar = () => {
      return (
        <div className="flex flex-row justify-center items-center">
          {data?.map((profile) => {
            return (
              <div
                className="w-16 h-16 rounded-full ml--8"
                key={profile?.profile_id}
              >
                <img
                  src={transformIpfs(profile?.avatar)}
                  className="h-16 w-16"
                  style={{ objectFit: "contain" }}
                />
              </div>
            );
          })}
        </div>
      );
    };
    return (
      <div className="flex flex-col w-full mt-12">
        <ProgressView />
        <div className="flex justify-between mt-12">
          <div className="flex flex-row">
            <UsesAvartar />
            <div className="ml-4 text-content_secondary ">
              {verifiedStr} verified
            </div>
          </div>
          <div className="flex text-content_primary whitespace-nowrap overflow-ellipsis overflow-hidden body-s-bold">
            {claimedStr}
            <div className="ml-4 text-content_secondary whitespace-nowrap overflow-ellipsis overflow-hidden body-s-regular">
              Claimed
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={previewRef}
      className="p-16 flex flex-col w-full bg-background_secondary mt-14 rounded-16"
    >
      <TopView />
      <ProgressInfoView />
      {!btnHid ? <ButtonView /> : null}
      {/* <EndDescView /> */}
    </div>
  );
};
const QuestCard = QuestCardOrg;

export { QuestCard };

/**
   <QuestCard
        title="Follow @gaaaqi’s X"
        gainIcon={require("../../../../assets/icon/coin.svg")}
        //   获得金额
        gain="0.3"
        claimed="85.5%"
        btn="GO"
      />

      <QuestCard
        title="Follow @gaaaqi’s X"
        gainIcon={require("../../../../assets/icon/coin.svg")}
        //   获得金额
        gain="0.3"
        claimed="85.5%"
        btn="VERIFY"
      />

      <QuestCard
        title="Follow @gaaaqi’s X"
        gainIcon={require("../../../../assets/icon/coin.svg")}
        //   获得金额
        gain="0.3"
        claimed="85.5%"
        btn="HIDE"
      />
 */
