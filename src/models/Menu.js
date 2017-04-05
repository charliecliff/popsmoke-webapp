// Menu Class and Structure
// Charles Cliff
// 3 - 31 - 2017
var MenuOption = (function () {
    function MenuOption(data) {
        if (data === void 0) { data = {}; }
        this.name = data["name"];
        this.icon = data["icon"];
        this.selected = data["selected"];
    }
    return MenuOption;
}());
export { MenuOption };
var Menu = (function () {
    function Menu(data) {
        if (data === void 0) { data = {}; }
        this.options = new Array();
        var options = data["options"];
        for (var i = 0; options.length > i; i++) {
            var optionData = options[i];
            var newOption = new MenuOption(optionData);
            this.options.push(newOption);
        }
        this.selectedOption = data["selectedOption"];
    }
    Menu.prototype.selectOption = function (optionName) {
        for (var i = this.options.length - 1; i >= 0; i--) {
            var option = this.options[i];
            if (option.name == optionName) {
                option.selected = true;
                this.selectedOption = option.name;
            }
            else {
                option.selected = false;
            }
        }
    };
    return Menu;
}());
export { Menu };
//# sourceMappingURL=Menu.js.map