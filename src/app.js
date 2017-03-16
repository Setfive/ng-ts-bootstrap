"use strict";
exports.__esModule = true;
var angular = require("angular");
require("angular-ui-router");
var Test = (function () {
    function Test() {
    }
    return Test;
}());
angular
    .module("MyApp", ["ui.router"])
    .run(function MyAppRun($rootScope, $state) {
    console.log("it worked!");
    var l = new Test();
    console.log(l);
})
    .config(function MyAppRunConfig($stateProvider) {
    console.log("in config!");
});
