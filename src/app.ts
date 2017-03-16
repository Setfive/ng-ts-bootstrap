import * as angular from "angular";
import "angular-ui-router";
import UserModule from "./User/User";

UserModule.configure();

angular
    .module("MyApp", ["ui.router", "UserModule"])
    .run(function MyAppRun($rootScope: ng.IScope, $state: ng.ui.IStateService){
        $state.go("user_login");
    })
    .config(function MyAppRunConfig($stateProvider: ng.ui.IStateProvider) {

    })
;