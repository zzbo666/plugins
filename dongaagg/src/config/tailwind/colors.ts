const colors = {
  content_primary: "#ffffff",
  content_disabled: "#ffffff66",
  content_secondary: "#ffffffcc",
  feedback_error: "#ff6868",
  feedback_warning: "#ffc068",
  feedback_success: "#c5fd66",
  accent_accent2: "#e64173",
  accent_backup1: "#b5ff3c",
  accent_backup2: "#fff5a0",
  content_inverse_primary: "#0a0a0a",
  content_inverse_disabled: "#0a0a0a66",
  background_primary: "#0a0a0a",
  background_secondary: "#161616",
  background_tertiary: "#232323",
  background_inverse_overlay10: "#0a0a0a1a",
  background_blurredcover: "#0a0a0a80",
  border_transparent: "#ffffff33",
  accent_accent1: "#1ed1e9",
  content_tertiary: "#ffffff99",
  background_disabled: "#ffffff4d",
  background_inverse_blurredcover: "#ffffff80",
  content_inverse_secondary: "#0a0a0acc",
  content_inverse_tertiary: "#0a0a0a99",
  background_inverse_overlay20: "#0a0a0a33",
  accent_backup3: "#87878700",
  accent_backup4: "#87878700",
  feedback_inverse_error: "#f65a5a",
  feedback_inverse_warning: "#fd9300",
  feedback_inverse_success: "#79c000",
  background_overlay5: "#ffffff0d",
  background_overlay10: "#ffffff1a",
  background_inverse_primary: "#ffffff",
  background_inverse_secondary: "#f3f3f3",
  background_inverse_tertiary: "#e6e6e6",
  background_inverse_overlay5: "#0a0a0a0d",
  border_solid: "#232323",
  border_inverse_solid: "#e6e6e6",
  border_inverse_transparent: "#0a0a0a33",
  background_inverse_disabled: "#0a0a0a4d",
  background_overlay20: "#ffffff33",
  background_clearcover: "#0a0a0acc",
  background_inverse_clearcover: "#ffffffcc",

  button_accent1: "#00e0ff",
  button_contentcol: "#ffffff",

  button_contentcol_fill20: "#ffffff33",
  button_backgroundcol: "#0a0a0a",

  button_pri_default_bg: "#1ed1e9",
  button_pri_hover_bg: "#1cbdd3",
  button_pri_pressed_bg: "#1895a6",
  button_pri_disabled_bg: "#ffffff1a",
  button_pri_default_border: "#87878700",
  button_pri_default_con: "#0a0a0a",
  button_pri_hover_border: "#87878700",
  button_pri_hover_con: "#0a0a0a",
  button_pri_pressed_border: "#87878700",
  button_pri_pressed_con: "#0a0a0a",
  button_pri_disabled_border: "#87878700",
  button_pri_disabled_con: "#ffffff33",
  button_sec_default_bg: "#87878700",
  button_sec_default_border: "#1ed1e9",
  button_sec_disabled_border: "#ffffff33",
  button_sec_disabled_con: "#ffffff33",
  button_sec_default_con: "#1ed1e9",
  button_sec_hover_bg: "#ffffff1a",
  button_sec_hover_border: "#1ed1e9",
  button_sec_hover_con: "#1ed1e9",
  button_sec_pressed_bg: "#ffffff33",
  button_sec_pressed_border: "#1ed1e9",
  button_sec_pressed_con: "#1ed1e9",
  button_sec_disabled_bg: "#87878700",
  button_ton_default_bg: "#ffffff33",
  button_ton_default_border: "#87878700",
  button_ton_disabled_border: "#87878700",
  button_ton_disabled_con: "#ffffff33",
  button_ton_default_con: "#ffffff",
  button_ton_hover_bg: "#ffffff40",
  button_ton_hover_border: "#87878700",
  button_ton_hover_con: "#ffffff",
  button_ton_pressed_bg: "#ffffff66",
  button_ton_pressed_border: "#87878700",
  button_ton_pressed_con: "#ffffff",
  button_ton_disabled_bg: "#ffffff1a",
  button_text_default_bg: "#87878700",
  button_text_default_border: "#87878700",
  button_text_disabled_border: "#87878700",
  button_text_disabled_con: "#ffffff33",
  button_text_default_con: "#ffffffcc",
  button_text_hover_bg: "#87878700",
  button_text_hover_border: "#87878700",
  button_text_hover_con: "#ffffffb2",
  button_text_pressed_bg: "#87878700",
  button_text_pressed_border: "#87878700",
  button_text_pressed_con: "#ffffff80",
  button_text_disabled_bg: "#87878700",
  button_inverse_pri_default_bg: "#0a0a0a",
  button_inverse_pri_default_border: "#87878700",
  button_inverse_pri_default_con: "#ffffff",
  button_inverse_pri_hover_bg: "#0a0a0ae5",
  button_inverse_pri_hover_border: "#87878700",
  button_inverse_pri_hover_con: "#ffffff",
  button_inverse_pri_pressed_bg: "#0a0a0ab2",
  button_inverse_pri_pressed_border: "#87878700",
  button_inverse_pri_pressed_con: "#ffffff",
  button_inverse_pri_disabled_bg: "#0a0a0a80",
  button_inverse_pri_disabled_border: "#87878700",
  button_inverse_pri_disabled_con: "#ffffff33",
  button_inverse_sec_default_bg: "#87878700",
  button_inverse_sec_default_border: "#0a0a0a",
  button_inverse_sec_default_con: "#0a0a0a",
  button_inverse_sec_hover_bg: "#0a0a0a1a",
  button_inverse_sec_hover_border: "#0a0a0a",
  button_inverse_sec_hover_con: "#0a0a0a",
  button_inverse_sec_disabled_border: "#0a0a0a33",
  button_inverse_sec_disabled_con: "#0a0a0a33",
  button_inverse_sec_pressed_bg: "#0a0a0a33",
  button_inverse_sec_pressed_border: "#0a0a0a",
  button_inverse_sec_pressed_con: "#0a0a0a",
  button_inverse_sec_disabled_bg: "#87878700",
  button_inverse_ton_default_bg: "#0a0a0a33",
  button_inverse_ton_default_border: "#87878700",
  button_inverse_ton_default_con: "#0a0a0a",
  button_inverse_ton_hover_bg: "#0a0a0a40",
  button_inverse_ton_hover_border: "#87878700",
  button_inverse_ton_hover_con: "#0a0a0a",
  button_inverse_ton_pressed_bg: "#0a0a0a66",
  button_inverse_ton_pressed_border: "#87878700",
  button_inverse_ton_pressed_con: "#0a0a0a",
  button_inverse_ton_disabled_bg: "#0a0a0a1a",
  button_inverse_ton_disabled_border: "#87878700",
  button_inverse_ton_disabled_con: "#0a0a0a33",
  button_inverse_text_default_bg: "#87878700",
  button_inverse_text_default_border: "#87878700",
  button_inverse_text_default_con: "#0a0a0acc",
  button_inverse_text_hover_bg: "#87878700",
  button_inverse_text_hover_border: "#87878700",
  button_inverse_text_hover_con: "#0a0a0ab2",
  button_inverse_text_pressed_bg: "#87878700",
  button_inverse_text_pressed_border: "#87878700",
  button_inverse_text_pressed_con: "#0a0a0a80",
  button_inverse_text_disabled_bg: "#87878700",
  button_inverse_text_disabled_border: "#87878700",
  button_inverse_text_disabled_con: "#0a0a0a33",

  // old theme
  primitives_core_white: "#fefefe",
  primitives_core_black: "#0a0a0a",
  primitives_grey_50: "#f5f5f5",
  primitives_grey_100: "#ececec",
  primitives_grey_200: "#e0e0e0",
  primitives_grey_300: "#c6c6c6",
  primitives_grey_400: "#a1a1a1",
  primitives_grey_500: "#6d6d6d",
  primitives_grey_600: "#4d4d4d",
  primitives_grey_700: "#3a3a3a",
  primitives_grey_800: "#252525",
  primitives_red_50: "#ffecec",
  primitives_red_100: "#ffc4c4",
  primitives_red_200: "#ffa8a8",
  primitives_red_300: "#ff8080",
  primitives_red_400: "#ff6868",
  primitives_red_500: "#ff4242",
  primitives_red_600: "#e83c3c",
  primitives_red_700: "#b52f2f",
  primitives_orange_50: "#fff7ec",
  primitives_orange_100: "#ffe7c4",
  primitives_orange_200: "#ffdba8",
  primitives_orange_300: "#ffca80",
  primitives_orange_400: "#ffc068",
  primitives_orange_500: "#ffb042",
  primitives_orange_600: "#e8a03c",
  primitives_orange_700: "#b57d2f",
  primitives_yellow_50: "#fffeec",
  primitives_yellow_100: "#fffbc5",
  primitives_yellow_200: "#fff9a9",
  primitives_yellow_300: "#fff569",
  primitives_yellow_400: "#ffe000",
  primitives_yellow_500: "#fff344",
  primitives_yellow_600: "#e8dd3e",
  primitives_yellow_700: "#b5ad30",
  primitives_green_50: "#f7ffed",
  primitives_green_100: "#e5ffc6",
  primitives_green_200: "#d9ffaa",
  primitives_green_300: "#c7ff84",
  primitives_green_400: "#bdff6c",
  primitives_green_500: "#acff47",
  primitives_green_600: "#9de841",
  primitives_green_700: "#7ab532",
  primitives_teal_50: "#edfbff",
  primitives_teal_100: "#c6f4ff",
  primitives_teal_200: "#aaeeff",
  primitives_teal_300: "#84e6ff",
  primitives_teal_400: "#6ce1ff",
  primitives_teal_500: "#47daff",
  primitives_teal_600: "#41c6e8",
  primitives_teal_700: "#329bb5",
  primitives_blue_50: "#edf6ff",
  primitives_blue_100: "#c6e3ff",
  primitives_blue_200: "#aad6ff",
  primitives_blue_300: "#84c3ff",
  primitives_blue_400: "#6cb8ff",
  primitives_blue_500: "#47a6ff",
  primitives_blue_600: "#4197e8",
  primitives_blue_700: "#3276b5",
  primitives_purple_50: "#f7ecff",
  primitives_purple_100: "#e5c4ff",
  primitives_purple_200: "#d8a8ff",
  primitives_purple_300: "#c680ff",
  primitives_purple_400: "#bb68ff",
  primitives_purple_500: "#aa42ff",
  primitives_purple_600: "#9b3ce8",
  primitives_purple_700: "#792fb5",
  primitives_pink_50: "#ffecf6",
  primitives_pink_100: "#ffc4e4",
  primitives_pink_200: "#ffa8d7",
  primitives_pink_300: "#ff80c4",
  primitives_pink_400: "#ff68b9",
  primitives_pink_500: "#ff42a7",
  primitives_pink_600: "#e83c98",
  primitives_pink_700: "#b52f77",
  primitives_pink_800: "#8c245c",
  primitives_pink_900: "#6b1c46",
  primitives_purple_800: "#5e248c",
  primitives_purple_900: "#471c6b",
  primitives_blue_800: "#275b8c",
  primitives_blue_900: "#1e466b",
  primitives_teal_800: "#27788c",
  primitives_teal_900: "#1e5c6b",
  primitives_green_800: "#5f8c27",
  primitives_green_900: "#486b1e",
  primitives_yellow_800: "#8c8625",
  primitives_yellow_900: "#6b661d",
  primitives_orange_900: "#6b4a1c",
  primitives_orange_800: "#8c6124",
  primitives_red_900: "#6b1c1c",
  primitives_red_800: "#8c2424",
  primitives_grey_900: "#121212",
  button_4: "#0a0a0a0a",
  button_8: "#0a0a0a14",
  button_12: "#0a0a0a1f",
  button_80: "#0a0a0acc",
  button_white: "#fefefe0a",
  transparent: "transparent",

  button_accent1_masked10: "#01cbe6",
  button_accent1_masked30: "#03a0b5",
  button_contentcol_fill80: "#ffffffcc",
  button_contentcol_fill70: "#ffffffb2",
  button_contentcol_fill50: "#ffffff80",
  button_contentcol_fill40: "#ffffff66",
  button_contentcol_fill25: "#ffffff40",
  button_contentcol_fill10: "#ffffff1a",
  button_backgroundcol_fill90: "#0a0a0ae5",
  button_backgroundcol_fill80: "#0a0a0acc",
  button_backgroundcol_fill70: "#0a0a0ab2",
  button_backgroundcol_fill50: "#0a0a0a80",
  button_backgroundcol_fill40: "#0a0a0a66",
  button_backgroundcol_fill25: "#0a0a0a40",
  button_backgroundcol_fill20: "#0a0a0a33",
  button_backgroundcol_fill10: "#0a0a0a1a",
  buttonplanning_pri_default_bg: "#00e0ff",
  buttonplanning_pri_hover_bg: "#01cbe6",
  buttonplanning_pri_pressed_bg: "#03a0b5",
  buttonplanning_pri_disabled_bg: "#ffffff1a",
  buttonplanning_pri_default_border: "#87878700",
  buttonplanning_pri_default_con: "#0a0a0a",
  buttonplanning_pri_hover_border: "#87878700",
  buttonplanning_pri_hover_con: "#0a0a0a",
  buttonplanning_pri_pressed_border: "#87878700",
  buttonplanning_pri_pressed_con: "#0a0a0a",
  buttonplanning_pri_disabled_border: "#87878700",
  buttonplanning_pri_disabled_con: "#ffffff33",
  buttonplanning_sec_default_bg: "#87878700",
  buttonplanning_sec_default_border: "#00e0ff",
  buttonplanning_sec_disabled_border: "#ffffff33",
  buttonplanning_sec_disabled_con: "#ffffff33",
  buttonplanning_sec_default_con: "#00e0ff",
  buttonplanning_sec_hover_bg: "#ffffff1a",
  buttonplanning_sec_hover_border: "#00e0ff",
  buttonplanning_sec_hover_con: "#00e0ff",
  buttonplanning_sec_pressed_bg: "#ffffff33",
  buttonplanning_sec_pressed_border: "#00e0ff",
  buttonplanning_sec_pressed_con: "#00e0ff",
  buttonplanning_sec_disabled_bg: "#87878700",
  buttonplanning_ton_default_bg: "#ffffff33",
  buttonplanning_ton_default_border: "#87878700",
  buttonplanning_ton_disabled_border: "#87878700",
  buttonplanning_ton_disabled_con: "#ffffff33",
  buttonplanning_ton_default_con: "#ffffff",
  buttonplanning_ton_hover_bg: "#ffffff40",
  buttonplanning_ton_hover_border: "#87878700",
  buttonplanning_ton_hover_con: "#ffffff",
  buttonplanning_ton_pressed_bg: "#ffffff66",
  buttonplanning_ton_pressed_border: "#87878700",
  buttonplanning_ton_pressed_con: "#ffffff",
  buttonplanning_ton_disabled_bg: "#ffffff1a",
  buttonplanning_text_default_bg: "#87878700",
  buttonplanning_text_default_border: "#87878700",
  buttonplanning_text_disabled_border: "#87878700",
  buttonplanning_text_disabled_con: "#ffffff33",
  buttonplanning_text_default_con: "#ffffffcc",
  buttonplanning_text_hover_bg: "#87878700",
  buttonplanning_text_hover_border: "#87878700",
  buttonplanning_text_hover_con: "#ffffffb2",
  buttonplanning_text_pressed_bg: "#87878700",
  buttonplanning_text_pressed_border: "#87878700",
  buttonplanning_text_pressed_con: "#ffffff80",
  buttonplanning_text_disabled_bg: "#87878700",
  buttonplanning_inverse_pri_default_bg: "#0a0a0a",
  buttonplanning_inverse_pri_default_border: "#87878700",
  buttonplanning_inverse_pri_default_con: "#ffffff",
  buttonplanning_inverse_pri_hover_bg: "#0a0a0ae5",
  buttonplanning_inverse_pri_hover_border: "#87878700",
  buttonplanning_inverse_pri_hover_con: "#ffffff",
  buttonplanning_inverse_pri_pressed_bg: "#0a0a0ab2",
  buttonplanning_inverse_pri_pressed_border: "#87878700",
  buttonplanning_inverse_pri_pressed_con: "#ffffff",
  buttonplanning_inverse_pri_disabled_bg: "#0a0a0a80",
  buttonplanning_inverse_pri_disabled_border: "#87878700",
  buttonplanning_inverse_pri_disabled_con: "#ffffff33",
  buttonplanning_inverse_sec_default_bg: "#87878700",
  buttonplanning_inverse_sec_default_border: "#0a0a0a",
  buttonplanning_inverse_sec_default_con: "#0a0a0a",
  buttonplanning_inverse_sec_hover_bg: "#0a0a0a1a",
  buttonplanning_inverse_sec_hover_border: "#0a0a0a",
  buttonplanning_inverse_sec_hover_con: "#0a0a0a",
  buttonplanning_inverse_sec_disabled_border: "#0a0a0a33",
  buttonplanning_inverse_sec_disabled_con: "#0a0a0a33",
  buttonplanning_inverse_sec_pressed_bg: "#0a0a0a33",
  buttonplanning_inverse_sec_pressed_border: "#0a0a0a",
  buttonplanning_inverse_sec_pressed_con: "#0a0a0a",
  buttonplanning_inverse_sec_disabled_bg: "#87878700",
  buttonplanning_inverse_ton_default_bg: "#0a0a0a33",
  buttonplanning_inverse_ton_default_border: "#87878700",
  buttonplanning_inverse_ton_default_con: "#0a0a0a",
  buttonplanning_inverse_ton_hover_bg: "#0a0a0a40",
  buttonplanning_inverse_ton_hover_border: "#87878700",
  buttonplanning_inverse_ton_hover_con: "#0a0a0a",
  buttonplanning_inverse_ton_pressed_bg: "#0a0a0a66",
  buttonplanning_inverse_ton_pressed_border: "#87878700",
  buttonplanning_inverse_ton_pressed_con: "#0a0a0a",
  buttonplanning_inverse_ton_disabled_bg: "#0a0a0a1a",
  buttonplanning_inverse_ton_disabled_border: "#87878700",
  buttonplanning_inverse_ton_disabled_con: "#0a0a0a33",
  buttonplanning_inverse_text_default_bg: "#87878700",
  buttonplanning_inverse_text_default_border: "#87878700",
  buttonplanning_inverse_text_default_con: "#0a0a0acc",
  buttonplanning_inverse_text_hover_bg: "#87878700",
  buttonplanning_inverse_text_hover_border: "#87878700",
  buttonplanning_inverse_text_hover_con: "#0a0a0ab2",
  buttonplanning_inverse_text_pressed_bg: "#87878700",
  buttonplanning_inverse_text_pressed_border: "#87878700",
  buttonplanning_inverse_text_pressed_con: "#0a0a0a80",
  buttonplanning_inverse_text_disabled_bg: "#87878700",
  buttonplanning_inverse_text_disabled_border: "#87878700",
  buttonplanning_inverse_text_disabled_con: "#0a0a0a33",
  base_bg: "#0027F4",
  opbnb_bg: "#FFC91D",
  content_error: "#ff6868",
  content_warning: "#ffc068",
  content_success: "#c5fd66",
  content_overlay20: "#ffffff33",
  content_overlay: "#FFFFFF",
  content_overlay50: "#ffffff80",
  content_overlay80: "#ffffffcc",
  content_accent1: "#bbfd97",
  content_inverse_inverse_primary: "#0a0a0a",
  content_inverse_inverse_secondary: "#4d4d4d",
  content_inverse_inverse_tertiary: "#6d6d6d",
  content_inverse_inverse_disabled: "#a1a1a1",
  content_inverse_inverse_overlay20: "#0a0a0a33",
  content_inverse_inverse_overlay50: "#0a0a0a80",
  content_inverse_inverse_overlay80: "#0a0a0acc",
  content_inverse_inverse_error: "#e83c3c",
  content_inverse_inverse_warning: "#FD9300",
  content_inverse_inverse_success: "#a7e63a",
  background_accent1: "#bbfd97",
  background_inverse_inverse_primary: "#ffffff",
  background_inverse_inverse_secondary: "#f5f5f5",
  background_inverse_inverse_tertiary: "#ececec",
  background_inverse_inverse_disabled: "#c6c6c6",
  background_inverse_inverse_overlay10: "#0a0a0a1a",
  background_inverse_inverse_overlay20: "#0a0a0a33",
  border_error: "#ff6868",
  border_accent1: "#bbfd97",
  border_inverse_inverse_solid: "#ececec",
  border_inverse_inverse_transparent: "#0a0a0a4d",
  border_inverse_inverse_error: "#e83c3c",
  content_accent2: "#0BD639",
  background_accent2: "#8075ff",
  border_accent2: "#8075ff",
  background_overlay50: "#ffffff80",
  background_inverse_inverse_overlay50: "#0a0a0a80",
  background_inverse_inverse_overlay5: "#0a0a0a0d",
  content_backup1: "#92f3e9",
  content_backup2: "#ffc1d4",
  background_backup1: "#92f3e9",
  border_backup1: "#92f3e9",
  background_backup2: "#ffc1d4",
  border_backup2: "#ffc1d4",
};
export { colors };
