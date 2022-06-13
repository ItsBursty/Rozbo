"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCount = exports.setName = void 0;
function setName(name, element) {
    element.innerText = name;
}
exports.setName = setName;
function setCount(count, element) {
    element.innerText = count;
}
exports.setCount = setCount;
