import * as angular from "angular";
import "angular-ui-router";

class Test {
    prop: string;
}

angular
    .module("MyApp", ["ui.router"])
    .run(function MyAppRun($rootScope: ng.IScope, $state: ng.ui.IStateService){

    })
    .config(function MyAppRunConfig($stateProvider: ng.ui.IStateProvider) {
        console.log("in config!");
    })
;
