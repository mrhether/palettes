import tinycolor from 'tinycolor2';

// interface Palette<T = tinycolor.Instance> {
//   lightVibrant: Swatch<T>
//   darkVibrant: Swatch<T>
//   vibrant: Swatch<T>
//   lightMuted: Swatch<T>
//   darkMuted: Swatch<T>
//   muted: Swatch<T>
// }

export interface Swatch<T = tinycolor.Instance> {
  color: T;
  bodyTextColor: T;
  titleTextColor: T;
}

namespace Swatch {
  export const create = (color: tinycolor.Instance | string): Swatch => {
    return new SwatchImp(color);
  };

  export const createRgbString = (
    color: tinycolor.Instance | string
  ): Swatch<string> => {
    const swatch = new SwatchImp(color);
    return {
      color: swatch.color.toRgbString(),
      bodyTextColor: swatch.bodyTextColor.toRgbString(),
      titleTextColor: swatch.titleTextColor.toRgbString(),
    } as Swatch<string>;
  };

  export const createHex8String = (
    color: tinycolor.Instance | string
  ): Swatch<string> => {
    const swatch = new SwatchImp(color);
    return {
      color: swatch.color.toHex8String(),
      bodyTextColor: swatch.bodyTextColor.toHex8String(),
      titleTextColor: swatch.titleTextColor.toHex8String(),
    } as Swatch<string>;
  };
}

class SwatchImp implements Swatch<tinycolor.Instance> {
  private readonly STANDARDS = { level: 'AAA' } as const;
  private readonly ALPHA_COUNT = 20;

  readonly color: tinycolor.Instance;
  readonly titleTextColor: tinycolor.Instance;
  readonly bodyTextColor: tinycolor.Instance;

  constructor(color: tinycolor.Instance | string) {
    color = tinycolor(color);
    if (!color.isValid()) {
      throw new Error('Invalid color');
    }

    const alphaColors = [
      ...Array.from({ length: this.ALPHA_COUNT }, (_, index) =>
        tinycolor.mix(
          color,
          tinycolor.names.white,
          (((index + 1) * 1.0) / this.ALPHA_COUNT) * 100
        )
      ),
      ...Array.from({ length: this.ALPHA_COUNT }, (_, index) =>
        tinycolor.mix(
          color,
          tinycolor.names.black,
          (((index + 1) * 1.0) / this.ALPHA_COUNT) * 100
        )
      ),
    ];
    const fallbackColor = tinycolor.mostReadable(color, ['white', 'black'], {
      includeFallbackColors: true,
    });

    this.color = color;
    this.titleTextColor =
      alphaColors.find((alphaColor) =>
        tinycolor.isReadable(color, alphaColor, {
          ...this.STANDARDS,
          size: 'large',
        })
      ) ?? fallbackColor;
    this.bodyTextColor =
      alphaColors.find((alphaColor) =>
        tinycolor.isReadable(color, alphaColor, {
          ...this.STANDARDS,
          size: 'small',
        })
      ) ?? fallbackColor;
  }
}

export default Swatch;
