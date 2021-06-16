import Swatch from '../src';

describe('swatches', () => {
  it('it is readable', () => {
    const swatch = Swatch.create('red');

    expect(swatch.color.toName()).toEqual('red');
    expect(swatch.bodyTextColor.toHex8String()).toEqual('#000000ff');
    expect(swatch.titleTextColor.toHex8String()).toEqual('#330000ff');
  });

  it('it is readable as hex', () => {
    const swatch = Swatch.createHex8String('red');

    expect(swatch.color).toEqual('#ff0000ff');
    expect(swatch.bodyTextColor).toEqual('#000000ff');
    expect(swatch.titleTextColor).toEqual('#330000ff');
  });
});
