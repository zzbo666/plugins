// import { Input } from "antd";
// import { useEffect, useContext, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { StoryboardContext, ACTIONTYPE, IActionContext } from "../../context";
// import { useLocation } from "react-router-dom";
// import SubmitButton from "../../component/Button/Button";

// export default function EditAction() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location?.state?.from;
//   console.log("from-->", from);

//   const {
//     storyboard,
//     updateStoryboard,
//     currentAction,
//     currentActionNexteAction,
//     updateCurrentAction,
//     updateCurrentActionNextAction,
//   } = useContext(StoryboardContext);
//   console.log("currenActionNextAction", currentActionNexteAction);

//   const title = !!currentActionNexteAction
//     ? currentActionNexteAction?.title
//     : currentAction?.title;

//   const restartStatus = !!currentActionNexteAction
//     ? currentActionNexteAction?.restart?.restartCompletedStatus
//     : currentAction?.restart?.restartCompletedStatus;

//   const [inputValue, setInputValue] = useState(title);
//   const [restartSelected, setRestartSelected] = useState(restartStatus);

//   useEffect(() => {
//     document.body.style.backgroundColor = "#0a0a0a";
//     console.log("=======", inputValue);
//   }, []);

//   const gotoEditMintNft = () => {
//     navigate("/mintNft", { state: { from: from } });
//     console.log("gotoEditMintNft");
//   };

//   const checkAction =
//     currentAction?.nextSence?.actions.every(
//       (action) => action?.title && (action?.mintNft || action?.restart)
//     ) ?? false;

//   const gotoEditNextSence = () => {
//     const nextSenceActions = () => {
//       if (!currentAction?.nextSence) {
//         // add next sence actions
//         return [
//           {
//             title: null,
//             mintNft: null,
//             id: 0,
//           },
//           {
//             title: null,
//             mintNft: null,
//             id: 1,
//           },
//         ];
//       } else {
//         return [...currentAction?.nextSence?.actions];
//       }
//     };
//     updateCurrentAction({
//       ...currentAction,
//       nextSence: {
//         imgUrl: "",
//         actions: nextSenceActions(),
//       },
//     });
//     navigate("/index", { state: { from: ACTIONTYPE.NEXT_SENCE } });
//   };

//   const handleChange = (input) => {
//     setInputValue(input);
//   };

//   const actionStatus =
//     (currentAction?.mintNft || currentAction?.nextSence || restartSelected) &&
//     !!inputValue;

//   const updateActionData = () => {
//     if (currentActionNexteAction) {
//       updateCurrentAction({
//         ...currentAction,
//         nextSence: {
//           ...currentAction?.nextSence,
//           actions: currentAction?.nextSence?.actions?.map((action, index) => {
//             if (index === currentActionNexteAction?.id) {
//               return {
//                 ...currentActionNexteAction,
//                 title: inputValue,
//                 restart: {
//                   restartCompletedStatus: restartSelected,
//                 },
//               };
//             } else {
//               return action;
//             }
//           }),
//         },
//       });
//       updateCurrentActionNextAction(null);
//       navigate("/index", { state: { from: from } });
//     } else {
//       const newAction: IActionContext = {
//         ...currentAction,
//         title: inputValue,
//         restart: {
//           restartCompletedStatus: restartSelected,
//         },
//       };
//       const newActions = storyboard.actions.map((action) =>
//         action.id === newAction.id ? newAction : action
//       );
//       console.log("data-->", newAction, currentAction);
//       updateStoryboard({
//         ...storyboard,
//         actions: newActions,
//       });
//       updateCurrentAction(null);
//       navigate("/index");
//     }
//   };

//   const restartClickable = !!currentActionNexteAction
//     ? currentActionNexteAction?.restart?.restartCompletedStatus
//     : currentAction?.mintNft?.ntfCompletedStatus
//     ? false
//     : currentAction?.nextSence?.nextCompletedStatus
//     ? false
//     : true;

//   const setRestart = () => {
//     console.log("setRestart");
//     setRestartSelected(true);
//   };

//   const nftLabelStatus = !!currentActionNexteAction
//     ? !!currentActionNexteAction?.mintNft?.zoraUrl
//     : !!currentAction?.mintNft?.zoraUrl;

//   const nftClickable = !!currentActionNexteAction
//     ? !currentActionNexteAction?.restart?.restartCompletedStatus
//     : !currentAction?.nextSence?.nextCompletedStatus ||
//       !currentAction?.restart?.restartCompletedStatus;

//   const nftSelected = (): boolean => {
//     if (currentActionNexteAction) {
//       return Boolean(currentActionNexteAction?.mintNft?.zoraUrl);
//     }
//     return Boolean(currentAction?.mintNft?.zoraUrl);
//   };

//   return (
//     <div className="flex flex-col w-full h-full px-16">
//       <div className="flex flex-1 w-full flex-col">
//         <div className="w-full flex flex-col h-85">
//           <div className="text-left align-middle text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap text-[#c5c5c5]">
//             Add button text
//           </div>
//           <Input
//             className="w-full rounded-16 flex flex-col mt-8 h-56 bg-[#252525] text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap text-[#FEFEFE]  focus:bg-[#252525]"
//             placeholder="Button text"
//             maxLength={15}
//             value={inputValue}
//             onChange={(data) => handleChange(data.target.value)}
//             style={{
//               maxLines: 1,
//             }}
//           />
//         </div>
//         <div className="w-full flex flex-col mt-24 h-298">
//           <div className="w-full text-left align-middle text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap placeholder-[#c5c5c5] text-[#ffffff]">
//             Choose the action for the button
//           </div>
//           <div className="w-full flex flex-col mt-8 h-269">
//             {!from && (
//               <div
//                 className={`w-full ${
//                   checkAction ? "bg-[#FFF345]" : "bg-[#252525]"
//                 } rounded-16 p-16 flex flex-row items-center h-79 mb-16`}
//                 style={{
//                   pointerEvents:
//                     currentAction?.restart?.restartCompletedStatus ||
//                     currentAction?.mintNft?.ntfCompletedStatus
//                       ? "none"
//                       : "auto",
//                 }}
//                 onClick={gotoEditNextSence}
//               >
//                 <div className="flex-1 flex flex-col justify-center h-47">
//                   <div className="flex flex-col justify-center  h-47">
//                     <div
//                       className={`w-full text-left align-middle text-16 font-SF Pro Display font-bold leading-24 whitespace-nowrap ${
//                         checkAction ? "text-[#0A0A0A]" : "text-[#fdfdfd]"
//                       }`}
//                     >
//                       To next scene
//                     </div>
//                     <div
//                       className={`w-full text-left align-middle text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap mt-2 ${
//                         checkAction ? "text-[#0A0A0A]" : "text-[#fdfdfd]"
//                       }`}
//                     >
//                       Move to the next scene with an image
//                     </div>
//                   </div>
//                 </div>
//                 {currentAction?.nextSence && (
//                   <div className="ml-12 w-20 h-20 ">
//                     <img
//                       src={require("../../../assets/edit-alt-black.png")}
//                       className=" w-20 h-20"
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//             <div
//               className={`w-full ${
//                 nftLabelStatus ? "bg-[#FFF345]" : "bg-[#252525]"
//               } rounded-16 p-16 flex flex-row items-center  h-79`}
//               style={{
//                 pointerEvents: nftClickable ? "auto" : "none",
//               }}
//               onClick={gotoEditMintNft}
//             >
//               <div className="flex-1 flex flex-col justify-center h-47">
//                 <div
//                   className={`w-full text-left align-middle text-16 font-SF Pro Display font-bold leading-24 whitespace-nowrap ${
//                     nftSelected() ? "text-[#0A0A0A]" : "text-[#fdfdfd]"
//                   } `}
//                 >
//                   Mint NFT
//                 </div>
//                 <div
//                   className={`w-full text-left align-middle text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap ${
//                     nftSelected() ? "text-[#0A0A0A]" : "text-[#a0a0a0]"
//                   } mt-2`}
//                 >
//                   Select an NFT collection to mint using Zora
//                 </div>
//               </div>
//               {nftSelected() && (
//                 <div className="ml-12 w-20 h-20 ">
//                   <img
//                     src={require("../../../assets/edit-alt-black.png")}
//                     className=" w-20 h-20"
//                   />
//                 </div>
//               )}
//             </div>
//             <div
//               className={`w-full ${
//                 restartSelected ? "bg-[#FFF345]" : "bg-[#252525]"
//               } rounded-16 p-16 flex flex-row items-center mt-16 h-79`}
//               style={{ pointerEvents: restartClickable ? "auto" : "none" }}
//               onClick={setRestart}
//             >
//               <div className="flex-1 flex flex-col justify-center h-47">
//                 <div className="w-full flex flex-col justify-center h-47">
//                   <div
//                     className={`w-full text-left align-middle text-16 font-SF Pro Display font-bold leading-24 whitespace-nowrap ${
//                       restartSelected ? "text-[#0A0A0A]" : "text-[#fdfdfd]"
//                     }`}
//                   >
//                     Restart
//                   </div>
//                   <div
//                     className={`w-full text-left align-middle text-14 font-SF Pro Display font-normal leading-21 whitespace-nowrap ${
//                       restartSelected ? "text-[#0A0A0A]" : "text-[#a0a0a0]"
//                     } mt-2`}
//                   >
//                     Go back to the initial scene and start over
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mb-24">
//         <SubmitButton
//           content="Done"
//           onClick={updateActionData}
//           enable={actionStatus}
//         />
//       </div>
//     </div>
//   );
// }
