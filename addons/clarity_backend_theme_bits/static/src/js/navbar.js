/** @odoo-module **/

import { NavBar } from "@web/webclient/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { useEnvDebugContext } from "@web/core/debug/debug_context";
import { useState } from "@odoo/owl";
import { rpc } from "@web/core/network/rpc";
import { session } from "@web/session";  // <-- direct session import

patch(NavBar.prototype, {
    setup() {
        super.setup();
        this.debugContext = useEnvDebugContext();
        this.rpc = rpc;

        // ✅ No useService("company") — we get it directly from session
        this.currentCompany = {
            id: session.company_id,
            name: session.company_name,
        };

        // Menu service is still fine to use
        this.menuService = this.env.services.menu;

        this.state = useState({
            ...this.state,
            isSidebarOpen: false,
        });
        this.getMenuItemHref = this.getMenuItemHref.bind(this);
    },

    onNavBarDropdownItemSelection(menu) {
        if (menu) {
            this.menuService.selectMenu(menu);
        }
    },

    get currentApp() {
        return this.menuService.getCurrentApp();
    },

    getMenuItemHref(payload) {
        if (!payload || (!payload.actionPath && !payload.actionID)) {
            return "#";
        }
        return `/odoo/${payload.actionPath || "action-" + (payload.actionID || "")}`;
    },

    toggleSidebar(ev) {
        this.state.isSidebarOpen = !this.state.isSidebarOpen;
        const toggleEl = ev.currentTarget;
        toggleEl.classList.toggle("visible");
        toggleEl.classList.toggle("sidebar-open");
        const navWrapper = document.querySelector(".nav-wrapper-bits");
        if (navWrapper) {
            navWrapper.classList.toggle("toggle-show");
        }
    },

    BackMenuToggle() {
        const subMenu = document.querySelector(".sub-menu-dropdown.show");
        if (subMenu) {
            subMenu.classList.remove("show");
        }
    },

    get appsMenuProps() {
        return {
            getMenuItemHref: this.getMenuItemHref,
            onNavBarDropdownItemSelection: this.onNavBarDropdownItemSelection.bind(this),
            isSmall: this.state.isSmall,
        };
    },
});
