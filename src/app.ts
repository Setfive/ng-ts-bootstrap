import * as angular from "angular";
import "angular-ui-router";

angular
    .module("MyApp", ["ui.router"])
    .run(function MyAppRun($rootScope: ng.IScope, $state: ng.ui.IStateService){
        console.log("it worked!");
    })
    .config(function MyAppRunConfig($stateProvider: ng.ui.IStateProvider) {

    })
;
