import { TestWindow } from '@stencil/core/testing';
import { AvnSelect } from './avn-select';
import { AvnOption } from '../avn-option/avn-option';

describe('avn-select', () => {
  let window: TestWindow;

  it('should build', () => {
    expect(new AvnSelect()).toBeTruthy();
  });

  describe('basic', () => {
    let element;
    beforeEach(async () => {
      window = new TestWindow();
      element = await window.load({
        components: [AvnSelect, AvnOption],
        html: '<avn-select></avn-select>'
      });
    });

    it('should render without attributes', async () => {
      await window.flush();
      expect(element).toBeTruthy();
    });

    it('should add options via attribute', async () => {
      await window.flush();
      element.options = [
        {label: 'Orange', value: 'OR'},
        {label: 'Mango', value: 'MAN'}
      ]
      expect(element.options).toHaveLength(2);
    });

  });

  describe('static options', () => {
    let element;
    beforeEach(async () => {
      window = new TestWindow();
      element = await window.load({
        components: [AvnSelect, AvnOption],
        html: `<avn-select>
          <avn-option value="OR" selected>Orange</avn-option>
          <avn-option value="MAN">Mango</avn-option>
          <avn-option value="STR">Strawberry</avn-option>
          <avn-option value="APP">Apple</avn-option>
        </avn-select>`
      });
    });

    it('should set selected to option with selected', async () => {
      await window.flush();
      const selected = element.options.find(options => options.selected); 
      expect(selected.value).toBe('OR');
    });

    it('should have 4 options', async () => {
      await window.flush();
      expect(element.options).toHaveLength(4);
    });

    it('should have initialized all options', async () => {
      // TODO https://github.com/ionic-team/stencil/issues/995
      await window.flush();
      // expect(element.options[0].label).toBe('Orange');
      expect(element.options[0].value).toBe('OR');
      // expect(element.options[1].label).toBe('Mango');
      expect(element.options[1].value).toBe('MAN');
      // expect(element.options[2].label).toBe('Strawberry');
      expect(element.options[2].value).toBe('STR');
      // expect(element.options[3].label).toBe('Apple');
      expect(element.options[3].value).toBe('APP');
    });

    it('should select using arrow keys', async () => {
      await window.flush();
      element.focus();
      let arrowDownKey: any = new window.Event('keydown');
      arrowDownKey.which = 40;
      element.dispatchEvent(arrowDownKey);
      element.dispatchEvent(arrowDownKey);
      element.dispatchEvent(arrowDownKey);
      let enterKey: any = new window.Event('keydown');
      enterKey.which = 13;
      element.dispatchEvent(enterKey);
      const selected = element.options.find(options => options.selected);   
      expect(selected.value).toBe('STR'); 
    });

  });


});