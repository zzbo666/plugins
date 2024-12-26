import "./style.css";
import "./drawing-board.js";
import "./antd.css";

import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createMemoryRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ModalView, PopupView } from "./pluginUi/utils";
// import { QuestDetail } from "./pluginUi/pages/detail";
import {
  OspClientIniter,
  PluginIniter,
  TUIMsgEnum,
} from "./pluginUi/component/Init";
import { QuestCreate, QuestPreview } from "./pluginUi/pages/quest";
import React, { useEffect, useMemo, useState } from "react";

import { ConfigManager } from "./config/configManager";
import KeepAlive from "./pluginUi/component/KeepAlive";
import { NotFound } from "./pluginUi/pages/notFound";
import { QueryClientProvider } from "@tanstack/react-query";
import { QuestDetail } from "./pluginUi/pages/questDetail";
import ReactDOM from "react-dom/client";
import { TPluginUrlParams } from "@open-social-protocol/osp-plugin-api-types";
import { axiosInstance } from "./modules/client";
import { axiosInstanceForQuestsAPI } from "./modules/client.quests";
import dayjs from "dayjs";
import qs from "qs";
import { queryClient } from "./modules/queryClient";
import utc from "dayjs/plugin/utc";
import classNames from "classnames";

dayjs.extend(utc);

const UI = () => {
  // onmessage = async (event: MessageEvent) => {
  //   const pluginMessage = event.data;
  //   console.log("pluginMessage", pluginMessage);
  //   if (pluginMessage.type === TUIMsgEnum.Refund) {
  //     JsPluginUIEventEmitInstance.emitEvent(pluginMessage.type, {});
  //   } else {
  //     console.log("unknown pluginMessage");
  //   }
  // };

  const pluginParams = useMemo(() => {
    const params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    return params as TPluginUrlParams;
    // deps不要写 window.location.search
  }, []);

  const initData = {
    aaAddr: pluginParams?.ospInfo?.userInfo?.address,
    env: pluginParams?.ospInfo?.env,
    accessToken: pluginParams?.ospInfo?.accessToken,
    appId: pluginParams?.ospInfo?.appId,
    chainId: pluginParams?.ospInfo?.chainId,
    eoaAddr: pluginParams?.ospInfo?.eoaAddress,
    idToken: pluginParams?.ospInfo?.idToken,
  };
  ConfigManager.getInstance().initEnv(pluginParams?.ospInfo?.env, pluginParams.mode);
  if (!process.env.PROXY_TARGET_ENV) {
    axiosInstanceForQuestsAPI.defaults.baseURL =
      ConfigManager.getInstance().deepApi;
    axiosInstance.defaults.baseURL = ConfigManager.getInstance().deepApi;
  }
  console.log(
    "ConfigManager",
    ConfigManager.getInstance().ipfsApi,
    axiosInstanceForQuestsAPI.defaults.baseURL
  );

  const defaultRouter = {
    create: "/quest",
    detail: "/questDetail",
    popview: "/questDetail",
  }[pluginParams.type];

  const browserRouters = useMemo(() => {
    return createMemoryRouter(
      createRoutesFromElements(
        <Route
          element={
            <KeepAlive
              pluginParams={pluginParams}
              defaultRouter={defaultRouter}
            />
          }
        >
          <Route path="/quest" element={<QuestCreate />} />
          <Route path="/questPreview" element={<QuestPreview />} />
          <Route
            path="/questDetail"
            element={
              <QuestDetail
                profileId={pluginParams.ospInfo?.userInfo?.profileId}
                referencedProfileId={pluginParams?.ospInfo?.feedInfo?.profileId}
                referencedContentId={pluginParams?.ospInfo?.feedInfo?.contentId}
                communityId={pluginParams?.ospInfo?.tribeInfo?.id}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      )
    );
  }, [
    pluginParams,
    pluginParams?.ospInfo?.feedInfo?.contentId,
    pluginParams?.ospInfo?.tribeInfo?.id,
    pluginParams?.ospInfo?.feedInfo?.profileId,
    defaultRouter,
  ]);

  return (
    <div className={
      classNames( {
        "px-16" : pluginParams.mode === "page",
        "bg-background_primary": pluginParams.mode === "page",
        "bg-background_tertiary": pluginParams.mode === "card" && pluginParams.type !== "detail",
      })
    }>
      <PluginIniter>
        <OspClientIniter {...initData}>
          <QueryClientProvider client={queryClient}>
            {/* <BrowserRouter>
            <Routes>

            </Routes>
          </BrowserRouter> */}
            <RouterProvider router={browserRouters} />
          </QueryClientProvider>
          <ModalView />
          <PopupView />
        </OspClientIniter>
      </PluginIniter>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("react-page")).render(<UI />);
