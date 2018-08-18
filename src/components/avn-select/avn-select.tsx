import { Component, Element, Event, EventEmitter, Listen, Prop, Watch, State} from '@stencil/core';

@Component({
  tag: 'avn-select',
  styleUrl: 'avn-select.scss',
  shadow: true
})
export class AvnSelect {

  selectedItemIndex: number = -1;
  savedSelectedItemindex: number = -1;

  @Event({eventName: 'change'}) onChange: EventEmitter;

  @Element() host: HTMLElement;
  dropdownItems: HTMLElement;

  @State() optionList: any = [];
  @Prop({ mutable: true }) options: any = [];
  @Watch('options')
  watchItemList(value) {
    this.loadItems(value);
  }
  
  @Prop({ mutable: true }) selectedValue: string;

  @Prop() placeholder = 'Select';
  @Prop() disabled: boolean;


  @State() isEditable: boolean = false;
  @Prop({ mutable: true }) value: any = { label: '', value: '' };
  @State() toggle = false;

  @Listen('document:click')
  onClick(e: any) {
    const path = e.path || (e.composedPath && e.composedPath()) || this.propagationPath(e);
    let nativeElement = this.host.shadowRoot;
    let elementToggle = nativeElement !== path[0];
    let containedToggle = !nativeElement.contains(path[0]) ? false : !this.toggle;
    this.toggle = elementToggle && containedToggle;
  }

  propagationPath(e) {
    var element = e.target || null;
    var pathArr = [element];

    if (!element || !element.parentElement) {
        return [];
    }

    while (element.parentElement) {
        element = element.parentElement;
        pathArr.push(element);
    }

    return pathArr;
  }

  componentDidLoad(){
    this.dropdownItems = this.host.querySelector('.avn-select-content');
    if (!this.host.hasAttribute('tabindex') && !this.disabled) {
      this.host.tabIndex = 0;
    }
    if(this.options.length < 1) {
      let options: any[] = Array.from(this.host.querySelectorAll('avn-option'));
      this.options = options.map(option => ({ label: option.label, value: option.value }));
    }
    if(this.selectedValue){
      this.setSelectedValue(this.selectedValue);
    }
  }

  selectItem(item) {
    this.onChange.emit(item);
    this.setSelectedValue(item.value);
  }

  setSelectedValue(value) {
    let selectedItem = { label: '', value: '' };
    this.optionList = this.optionList.map((item, i) => {
      item.selected = false;
      if (item.value == value) {
        this.value = { ...item };
        item.selected = true;
        this.selectedItemIndex = i;
        selectedItem = item;
      }
      return item;
    }, []);
    this.selectedValue = selectedItem.value;
  }

  resetSelectedValue() {
    this.selectedItemIndex = -1;
    this.value = { label: '', value: '' };
    this.optionList = this.optionList.map(item => {
      item.selected = false;
      return item;
    });
    this.onChange.emit(this.value);
  }

  loadItems(value = []) {
    this.optionList = value;
    this.value = { label: '', value: '' };
    this.isEditable = false;
    this.toggle = false;
    if(this.optionList.length < 1) return;
    let selectedValue = this.optionList.find(r => r.selected);
    if (selectedValue) {
      this.setSelectedValue(selectedValue.value);
      this.toggle = false;
    }
  }

  get showList() {
    let itemLength: boolean = this.optionList.length > 0;
    return this.toggle && itemLength && !this.disabled;
  }


  @Listen('keydown')
  onKeydown(event) {
    switch (event.which) {
      //down
      case 40:
        if (!this.toggle) {
          this.toggle = true;
        }
        else {
          if (this.selectedItemIndex !== -1) {
            let nextItemIndex = this.selectedItemIndex + 1;
            if (nextItemIndex != (this.optionList.length)) {
              this.setSelectedValue(this.optionList[nextItemIndex].value);
              this.scrollToItem(nextItemIndex);
            }
          }
          else if (this.optionList) {
            this.setSelectedValue(this.optionList[0].value);
            this.scrollToItem(0);
          }
        }

        event.preventDefault();

        break;

      //up
      case 38:
        if (this.selectedItemIndex > 0) {
          let prevItemIndex = this.selectedItemIndex - 1;
          this.setSelectedValue(this.optionList[prevItemIndex].value);
          this.scrollToItem(prevItemIndex, false);
        }

        event.preventDefault();
        break;

      //space
      case 32:
        if (!this.toggle) {
          this.toggle = true;
          event.preventDefault();
        }
        break;

      //enter
      case 13:
        this.toggle = false;

        event.preventDefault();
        break;

      //escape and tab
      case 27:
      case 9:
        this.resetSelectedValue();
        this.toggle = false;
        break;
    }
  }

  scrollToItem(index, down = true) {
    if (this.dropdownItems) {
      const itemHeight = 35;
      if (!this.isScrolledIntoView(index)) {
        if (down) {
          this.dropdownItems.scrollTop += itemHeight;
        } else {
          this.dropdownItems.scrollTop -= itemHeight;
        }
      }
    }
  }

  isScrolledIntoView(index) {
    let item: HTMLElement = this.dropdownItems.querySelector(`.item-${index}`);
    let ctrlViewTop = this.dropdownItems.scrollTop;
    let ctrlViewBottom = ctrlViewTop + this.dropdownItems.offsetHeight;

    let elemTop = item.offsetTop;
    let elemBottom = elemTop + item.offsetHeight;
    return ((elemBottom <= ctrlViewBottom) && (elemTop >= ctrlViewTop));
  }

  render() {
    let clear = this.value.value && !this.disabled;

    let clearButton = <a class="avn-select-clear" onClick={this.resetSelectedValue.bind(this)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
        <path d="M170.08,151.07c-1.12-1.12-1.12-2.24,0-4.47l51.45-51.45a8.48,8.48,0,0,0,2.24-4.47,8.48,8.48,0,0,0-2.24-4.47l-8.95-8.95c-1.12-1.12-3.36-1.12-4.47-1.12-2.24,0-3.36,1.12-4.47,2.24l-51.45,51.45c-1.12,1.12-2.24,1.12-4.47,0L97.38,78.37c-2.24-2.24-3.36-2.24-5.59-2.24a8.48,8.48,0,0,0-4.47,2.24l-8.95,8.95a8.48,8.48,0,0,0-2.24,4.47,8.48,8.48,0,0,0,2.24,4.47l51.45,51.45c1.12,1.12,1.12,2.24,0,4.47L78.37,203.64c-1.12,1.12-2.24,2.24-2.24,4.47a8.48,8.48,0,0,0,2.24,4.47l8.95,8.95a8.48,8.48,0,0,0,4.47,2.24,8.48,8.48,0,0,0,4.47-2.24l51.45-51.45c1.12-1.12,2.24-1.12,4.47,0l51.45,51.45a8.48,8.48,0,0,0,4.47,2.24,8.48,8.48,0,0,0,4.47-2.24l8.95-8.95a8.48,8.48,0,0,0,2.24-4.47,8.48,8.48,0,0,0-2.24-4.47Z"/>
      </svg>
    </a>;

    let itemList = this.optionList.map((item, i) => {
      return <div class={`avn-select-content-item item-${i} ${item.selected ? 'active' : ''}`} onClick={() => this.selectItem(item)}>
        { item.label ? item.label : item}
      </div>
    });

    let list = <div class="avn-select-content">
      <div class="avn-select-items">
        {itemList}
      </div>
    </div>

    return (
      <div class={`avn-select ${this.disabled ? 'state-disabled' : ''}`}>
        {/* <div class='avn-select-container'> */}
          <input class={`avn-select-input ${this.disabled ? 'state-disabled' : ''}`}
              value={this.value.label}
              type="text"
              tabindex="-1"
              placeholder={this.placeholder}/>
          <div class='avn-select-overlay'></div>
        {/* </div>​ */}
        {clear ? clearButton : ''}
        <i class={`avn-select-icon ${this.disabled ? 'state-disabled' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"/>
            </svg>   
        </i>
        {this.showList ? list : ''}
      </div>
    );
  }
}
