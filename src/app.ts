import * as angular from "angular";
import "angular-ui-router";
import UserModule from "./User/User";
import "angular-translate";

UserModule.configure();

angular
    .module("MyApp", ["ui.router", "pascalprecht.translate", "UserModule"])
    .run(function MyAppRun($rootScope: ng.IScope, $state: ng.ui.IStateService){
        $state.go("user_login");
    })
    .config(function MyAppRunConfig($stateProvider: ng.ui.IStateProvider, $translateProvider: any) {
        $translateProvider.translations('en', {
            'pleaseLogin': 'Please Login',
        });

        $translateProvider.preferredLanguage('en');
    })
;