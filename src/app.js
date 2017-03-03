"use strict";
exports.__esModule = true;
var angular = require("angular");
require("angular-ui-router");
angular
    .module("MyApp", ["ui.router"])
    .run(function MyAppRun($rootScope, $state) {
    console.log("it worked!");
})
    .config(function MyAppRunConfig($stateProvider) {
});
