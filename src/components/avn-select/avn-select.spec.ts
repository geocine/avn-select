import { TestWindow } from '@stencil/core/testing';
import { AvnSelect } from './avn-select';

describe('avn-select', () => {
  let window: TestWindow;

  it('should build', () => {
    expect(new AvnSelect()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      window = new TestWindow();
      element = await window.load({
        components: [AvnSelect],
        html: '<avn-select></avn-select>'
      });
    });

    it('test sample', async () => {
      //element.attr = '';
      await window.flush();
      expect(element).toBeTruthy();
    });

  });
});