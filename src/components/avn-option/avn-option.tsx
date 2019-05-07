import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'avn-option',
  shadow: true
})
export class AvnOption {
  @Element() host: HTMLElement;
  @Prop() value: string;
  @Prop({ mutable: true }) label: string;
  @Prop({ mutable: true }) selected: boolean;

  componentDidLoad() {
    this.label = this.host.innerText;
  }
}
