// Menu Class and Structure
// Charles Cliff
// 3 - 31 - 2017

export class MenuOption {

  name : string;
  icon : string;
  selected : boolean;
  
  constructor(data = {}) {
    this.name = data["name"];
    this.icon = data["icon"];
    this.selected = data["selected"];
  }
}

export class Menu {

  options : MenuOption[];
  selectedOption : string;
  
  constructor(data = {}) {
    this.options = new Array();
    var options = data["options"] as any[];
    for (var i = 0; options.length > i; i++) {
      var optionData = options[i];
      var newOption = new MenuOption(optionData);
      this.options.push(newOption);
    }
    this.selectedOption = data["selectedOption"];
  }

  selectOption(optionName) {
    for (var i = this.options.length - 1; i >= 0; i--) {
      var option = this.options[i] as MenuOption;
      if(option.name == optionName) {
        option.selected = true;
        this.selectedOption = option.name;
      } else {
        option.selected = false;
      }
    }
  }
}