"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe = void 0;
var BLACKLIST_TAGS = ['script', 'iframe'];
var WHITELIST_ATTRS = ['src', 'alt'];
var R_TAG = /<(\w+)\s?(.*?)>.*?(<\/(.*?)>)?/;
var R_ATTRIBUTES = /(\w+\s*)=(\s*".*?")/g;
function safe(unsafeString) {
    return unsafeString
        .replace(R_TAG, function (match, m1) {
        return BLACKLIST_TAGS.includes(m1) ? '' : match;
    })
        .replace(R_ATTRIBUTES, function (match, m1) {
        return WHITELIST_ATTRS.includes(m1) ? match : '';
    });
}
exports.safe = safe;
//# sourceMappingURL=safe.js.map