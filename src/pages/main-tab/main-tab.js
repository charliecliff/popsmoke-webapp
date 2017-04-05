var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Store } from '@ngrx/store';
import * as MenuConstants from '../../config/menuConstants';
import { PersonalInfoProfilePage } from '../../ux_user/personal-info-profile/personal-info-profile';
import { HomePage } from '../home/home';
import { DocumentsPage } from '../documents/documents';
import { PacketHistoryPage } from '../packet-history/packet-history';
import { InboxPage } from '../inbox/inbox';
var MainTabPage = (function () {
    function MainTabPage(store) {
        this.store = store;
        this.tab1 = PersonalInfoProfilePage;
        this.tab2 = DocumentsPage;
        this.tab3 = HomePage;
        this.tab4 = PacketHistoryPage;
        this.tab5 = InboxPage;
    }
    MainTabPage.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select("menu").subscribe(function (menu) {
            _this.showSelectedTabed(menu);
        });
    };
    MainTabPage.prototype.showSelectedTabed = function (menu) {
        switch (menu.selectedOption) {
            case MenuConstants.BIO_OPTION:
                this.tabRef.select(0);
                break;
            case MenuConstants.DOCUMENTS_OPTION:
                this.tabRef.select(1);
                break;
            case MenuConstants.HOLIDAYS_OPTION:
                this.tabRef.select(2);
                break;
            case MenuConstants.PACKETS_OPTION:
                this.tabRef.select(3);
                break;
            case MenuConstants.INBOX_OPTION:
                this.tabRef.select(4);
                break;
            default:
                this.tabRef.select(2);
                break;
        }
    };
    return MainTabPage;
}());
__decorate([
    ViewChild('myTabs'),
    __metadata("design:type", Tabs)
], MainTabPage.prototype, "tabRef", void 0);
MainTabPage = __decorate([
    Component({
        selector: 'page-main-tab',
        templateUrl: 'main-tab.html'
    }),
    __metadata("design:paramtypes", [Store])
], MainTabPage);
export { MainTabPage };
//# sourceMappingURL=main-tab.js.map