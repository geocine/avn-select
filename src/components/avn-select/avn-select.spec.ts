import { TestWindow } from '@stencil/core/testing';
import { AvnSelect } from './avn-select';
import { AvnOption } from '../avn-option/avn-option';

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

  describe('options', () => {
    let element;
    beforeEach(async () => {
      window = new TestWindow();
      element = await window.load({
        components: [AvnSelect, AvnOption],
        html: `<avn-select>
          <avn-option value="OR">Orange</avn-option>
          <avn-option value="MAN">Mango</avn-option>
          <avn-option value="STR">Strawberry</avn-option>
          <avn-option value="APP">Apple</avn-option>
        </avn-select>`
      });
    });

    it('should have 4 options', async () => {
      await window.flush();
      expect(element.options).toHaveLength(4);
    });

  });


});