/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";

export class CloudChatIframe extends Component {}
CloudChatIframe.template = "cloudchat.CloudChatIframe";

registry.category("actions").add("cloudchat.empty", CloudChatIframe);
