import * as _ from "lodash";
import * as angular from "angular";
import "angular-translate";

export default class TranslationsModule {

    public static configure() : void {
        angular
            .module("TranslationsModule", ["pascalprecht.translate"])
            .config(function TranslationsModuleConfig($translateProvider: any) {
                $translateProvider.translations('en', {
                    'pleaseLogin': 'Please Login',
                    'login': 'Login',
                    'forgotPassword': 'Forgot your password?'
                });

                // TODO: Need to add ngSanitize to support this
                // $translateProvider.useSanitizeValueStrategy('sanitize');
                $translateProvider.useSanitizeValueStrategy("escape");
                $translateProvider.preferredLanguage('en');
            });
    }

}