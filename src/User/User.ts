import * as _ from "lodash";
import * as angular from "angular";

export default class UserModule {

    public static configure() : void {
        angular
            .module("UserModule", ['ui.router'])
            .config(function UserModuleConfig($stateProvider: ng.ui.IStateProvider) {
                $stateProvider
                    .state('user_login', <ng.ui.IState> {
                        url: '/login',
                        component: 'userLoginComponent'
                    })
                ;

                console.log("in user configure!");
            })
            .component('userLoginComponent', new UserLoginComponent())
        ;
    }

}

class UserLoginComponent implements ng.IComponentOptions {
    public transclude: boolean = true;
    public templateUrl: string = "login.html.tpl";
    public controller : any = UserLoginComponentController;
    public bindings: any = {

    };
}

class UserLoginComponentController {

}