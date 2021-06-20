import type { PaletteColorOptions } from "@material-ui/core";
import type { TypeBackground } from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    dark?: PaletteColorOptions;
    muted?: PaletteColorOptions;
    light?: PaletteColorOptions;
    backgroundCounter?: Partial<TypeBackground>;
    footerBackGround?: Partial<TypeBackground>;
  }

  interface Palette {
    dark: PaletteColor;
    muted: PaletteColor;
    light: PaletteColor;
    backgroundCounter: TypeBackground;
    footerBackGround: TypeBackground;
  }
}
