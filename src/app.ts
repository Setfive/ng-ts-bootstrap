import * as angular from "angular";
import "angular-ui-router";
import "angular-translate";
import Api from "./libs/Api"
import UserModule from "./User/User";
import TranslationModule from "./Translations"

TranslationModule.configure();
UserModule.configure();

angular
    .module("MyApp", ["ui.router", "TranslationsModule", "UserModule"])
    .run(function MyAppRun($rootScope: ng.IScope, $state: ng.ui.IStateService){
        $state.go("user_login");
    })
    .config(function MyAppRunConfig($stateProvider: ng.ui.IStateProvider) {

    })
    .service("Api", Api)
;