// import { Image } from "antd";
// import { useNavigate } from "react-router-dom";

// import { Upload } from "antd";
// import { useContext, useEffect, useRef, useState } from "react";
// import { NextSence, StoryboardContext } from "../../context";
// import { useLocation } from "react-router-dom";
// import { isMobile } from "../../utils/parse/commonUtils";
// import SubmitButton from "../../component/Button/Button";
// import ActionButtonGroup from "../../component/Action/ActionButtonGroup";

// export const SourceType = {
//     Canvas: "canvas",
//     Album: "album",
// };

// export default function PluginUi() {
//     const location = useLocation();
//     const from = location?.state?.from;
//     const imgSource = location?.state?.source;

//     const navigate = useNavigate();
//     const {
//         storyboard,
//         updateStoryboard,
//         updateCurrentActionNextAction,
//         updateCurrentAction,
//         currentAction,
//     } = useContext(StoryboardContext);

//     const url = from ? currentAction?.nextSence?.imgUrl : storyboard?.imgUrl;

//     // (): string | null => {
//     //   if (from) {
//     //     return currentAction?.nextSence?.imgUrl;
//     //   }
//     //   return storyboard?.imgUrl;
//     // };
//     const [content, setContent] = useState(url);
//     const [source, setSource] = useState(imgSource);
//     const uploadRef = useRef<typeof Upload>(null);
//     console.log("from", from, storyboard);
//     useEffect(() => {
//         document.body.style.backgroundColor = "#0a0a0a";
//     }, []);

//     const handleChange = ({ file }) => {
//         if (file.status === "uploading") {
//             const url = URL.createObjectURL(file.originFileObj);
//             setContent(url);
//             setSource(SourceType.Album);
//             if (!from) {
//                 updateStoryboard({
//                     ...storyboard,
//                     imgUrl: url,
//                 });
//             }
//         }
//     };

//     const gotoCanvas = () => {
//         navigate("/canvas", { state: { from: from } });
//         setSource(SourceType.Canvas);
//     };

//     const clearEdit = () => {
//         setContent(null);
//     };

//     const isShowAddButton = from
//         ? Object.keys(currentAction?.nextSence.actions).length < 4
//         : Object.keys(storyboard.actions).length < 4;

//     const addAction = () => {
//         if (from) {
//             console.log("addAction", currentAction, !currentAction);

//             const length = currentAction?.nextSence?.actions.length;
//             if (length >= 4) {
//                 return;
//             }
//             const newActionData = {
//                 title: null,
//                 mintNft: null,
//                 id: length,
//                 restart: null,
//             };
//             const newData = {
//                 ...currentAction,
//                 nextSence: {
//                     ...currentAction?.nextSence,
//                     actions: [...currentAction?.nextSence.actions, newActionData],
//                 },
//             };
//             console.log("line 104", newData);
//             updateCurrentAction(newData);
//             return;
//         }
//         const length = storyboard.actions.length;
//         if (Object.keys(storyboard.actions).length >= 4) {
//             return;
//         }
//         const newActionData = {
//             title: null,
//             nextSence: null,
//             mintNft: null,
//             id: length,
//         };

//         const newData = {
//             imgUrl: content,
//             actions: [...storyboard.actions, newActionData],
//         };
//         console.log("line 128", newData);
//         updateStoryboard(newData);
//     };

//     const gotoEditAction = (id: number) => {
//         if (from) {
//             updateCurrentActionNextAction(currentAction?.nextSence.actions[id]);
//         } else {
//             updateCurrentAction(storyboard.actions[id]);
//         }
//         navigate("/action", { state: { from: from } });
//     };

//     const checkNextSenceAction = (nextSence: NextSence): boolean => {
//         return (
//             nextSence?.actions?.every(
//                 (action) =>
//                     Boolean(action?.title) &&
//                     (Boolean(action?.mintNft) || Boolean(action?.restart))
//             ) ?? false
//         );
//     };

//     const checkAction =
//         storyboard.actions?.every((action) => {
//             if (!action?.title) {
//                 return false;
//             }
//             if (action?.mintNft || action?.restart) {
//                 return true;
//             }
//             if (action?.nextSence) {
//                 return checkNextSenceAction(action?.nextSence);
//             }
//             return true;
//         }) ?? false;

//     // button done status update
//     const handleDoneStatus = from
//         ? checkNextSenceAction(currentAction?.nextSence) && !!content
//         : !!storyboard?.imgUrl && checkAction;

//     const createStoryboard = () => {
//         console.log("createStoryboard");
//         if (currentAction) {
//             // update action, when submit nextSence data,delete currentActionNextAction
//             updateCurrentAction({
//                 ...currentAction,
//                 nextSence: {
//                     ...currentAction?.nextSence,
//                     imgUrl: content,
//                     nextCompletedStatus: true,
//                 },
//                 mintNft: null,
//                 restart: null,
//             });
//             updateCurrentActionNextAction(null);
//             navigate("/action");
//             return;
//         }
//         console.log(" back to post page");
//     };

//     const previewStoryboard = () => {
//         console.log("previewStoryboard");
//         navigate("/preview");
//     };

//     const editButton = () => {
//         if (source === SourceType.Canvas) {
//             return (
//                 <div
//                     className="absolute bottom-8 right-8  bg-[#0a0a0a33] rounded-36 flex flex-col justify-center items-center w-78 h-36"
//                     onClick={gotoCanvas}
//                 >
//                     <div className="rounded-36 px-16 py-8 flex flex-col justify-center items-center w-78 h-36">
//                         <div className="flex flex-row justify-center items-center w-46 h-20">
//                             <Image
//                                 src={require("../../../assets/edit-alt-gray.png")}
//                                 className="h-full w-20"
//                                 preview={false}
//                             />
//                             <div className="text-left align-top text-12 font-SF Pro Display font-bold leading-18 whitespace-nowrap text-[#fdfdfd] ml-4">
//                                 Edit
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }
//         return (
//             <div className="absolute bottom-8 right-8  bg-[#0a0a0a33] rounded-36 flex flex-col justify-center items-center w-78 h-36">
//                 <Upload
//                     className="rounded-36 px-16 py-8 flex flex-col justify-center items-center w-78 h-36"
//                     action="/upload-endpoint"
//                     accept={isMobile ? "image/*" : ""}
//                     onChange={handleChange}
//                     showUploadList={false}
//                 >
//                     <div className="flex flex-row justify-center items-center w-46 h-20">
//                         <Image
//                             src={require("../../../assets/edit-alt-gray.png")}
//                             className="h-full w-20"
//                             preview={false}
//                         />
//                         <div className="text-left align-top text-12 font-SF Pro Display font-bold leading-18 whitespace-nowrap text-[#fdfdfd] ml-4">
//                             Edit
//                         </div>
//                     </div>
//                 </Upload>
//             </div>
//         );
//     };

//     return (
//         <div className="flex flex-col w-full h-full px-16">
//             <div className="flex flex-1 w-full flex-col">
//                 <div className="flex-1  rounded-tl-24 rounded-tr-24">
//                     <div className="w-full bg-[#252525] rounded-16 p-12 flex flex-col ">
//                         <div className="w-full flex flex-col ">
//                             <div className="w-full flex flex-col">
//                                 <div className="text-left align-middle text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap text-[#c5c5c5]">
//                                     Choose your image
//                                 </div>
//                                 <div className="w-full flex mt-8 rounded-12">
//                                     {content ? (
//                                         <div className="w-full flex-col rounded-12 overflow-hidden aspect-w-1 aspect-h-1 relative h-345 bg-[#111111] ">
//                                             <div className="w-full h-345">
//                                                 <Image
//                                                     src={content}
//                                                     preview={false}
//                                                     className="object-cover w-full h-full"
//                                                 />
//                                             </div>
//                                             <div
//                                                 className="absolute top-0 right-0  m-8 object-cover rounded-36 w-24 h-24 inline-flex justify-center items-center"
//                                                 style={{
//                                                     zIndex: 1,
//                                                     backgroundColor: "rgba(10, 10, 10, 0.2)",
//                                                 }}
//                                                 onClick={clearEdit}
//                                             >
//                                                 <Image
//                                                     src={require("../../../assets/icon-close.png")}
//                                                     preview={false}
//                                                     className="w-24 h-24  object-cover"
//                                                 />
//                                             </div>
//                                             {editButton()}
//                                         </div>
//                                     ) : (
//                                         <div className="w-full bg-[#111111]  pt-32 flex flex-col justify-center items-center  h-182 rounded-12">
//                                             <div
//                                                 className="flex flex-col justify-center items-center w-full h-65"
//                                                 onClick={gotoCanvas}
//                                             >
//                                                 <img
//                                                     className="w-40 h-40"
//                                                     src={require("../../../assets/draw-canvas.png")}
//                                                 />
//                                                 <div className="text-left align-top text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap text-[#a0a0a0] mt-4">
//                                                     Draw with Canvas
//                                                 </div>
//                                             </div>
//                                             <Upload
//                                                 ref={uploadRef}
//                                                 className="w-full bg-[#0a0a0a] rounded-bl-12 rounded-br-12 py-16 flex flex-row justify-center items-center mt-32 h-53"
//                                                 action="/upload-endpoint"
//                                                 accept={isMobile ? "image/*" : ""}
//                                                 onChange={handleChange}
//                                             >
//                                                 <div className="text-14 font-SF Pro Display font-normal text-color_A1A1A1">
//                                                     or
//                                                 </div>
//                                                 <div className="text-14 font-SF Pro Display font-normal text-color_97DE44 ml-4">
//                                                     Upload
//                                                 </div>
//                                             </Upload>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="w-full flex flex-col mt-24 ">
//                                 <div className="text-left align-middle text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap text-[#c5c5c5]">
//                                     Set up the actions
//                                 </div>
//                                 <ActionButtonGroup
//                                     mode="edit"
//                                     actions={
//                                         from
//                                             ? currentAction?.nextSence?.actions
//                                             : storyboard?.actions
//                                     }
//                                     onActionClick={(index) => gotoEditAction(index)}
//                                     onAddActionClick={addAction}
//                                     addButtonText="Add Action"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="py-24 w-full flex-row fixed-bottom">
//                 <div className="flex flex-row  h-56 space-x-9  ">
//                     {!from && (
//                         <SubmitButton
//                             enable={handleDoneStatus}
//                             content="Preview"
//                             type="gray"
//                             onClick={previewStoryboard}
//                         />
//                     )}
//                     <SubmitButton
//                         enable={handleDoneStatus}
//                         onClick={createStoryboard}
//                         content="Done"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }
