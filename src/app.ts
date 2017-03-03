import * as angular from "angular";
import "angular-ui-router";

class Test {
    prop: string;
}

angular
    .module("MyApp", ["ui.router"])
    .run(function MyAppRun($rootScope: ng.IScope, $state: ng.ui.IStateService){
        console.log("it worked!");
        const l = new Test();
        console.log(l);
    })
    .config(function MyAppRunConfig($stateProvider: ng.ui.IStateProvider) {

    })
;
