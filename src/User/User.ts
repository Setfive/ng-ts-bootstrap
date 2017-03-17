import * as _ from "lodash";
import * as angular from "angular";
import Api from "../libs/Api";

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
    public templateUrl: string = "User/login.html";
    public controller : any = UserLoginComponentController;
    public bindings: any = {

    };
}

class UserLoginComponentController {
    static $inject = ["Api"];

    private api : Api;

    constructor(api: Api){
        this.api = api;
    }


}