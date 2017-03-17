import * as _ from "lodash";
import * as angular from "angular";
import Api from "../libs/Api";
import {Credentials} from "../libs/Api";

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
            })
            .component('userLoginComponent', new UserLoginComponent())
        ;
    }

}

class UserLoginComponent implements ng.IComponentOptions {
    public transclude: boolean = true;
    public templateUrl: string = "User/login.html";
    public controller : any = UserLoginComponentController;
    public bindings: any = {};
}

class UserLoginComponentController {
    static $inject = ["Api"];

    private api : Api;

    public credentials : Credentials = new Credentials();

    public errorClasses : { [name: string]: string } = {
        username: "",
        password: ""
    };

    public isLoading : boolean = false;

    constructor(api: Api){
        this.api = api;
    }

    public submit() : void {
        let error = false;

        this.errorClasses["username"] = "";
        this.errorClasses["password"] = "";

        ["username", "password"].forEach(f => {
            if(this.credentials.get(f).length == 0){
                error = true;
                this.errorClasses[f] = "has-error";
            }
        });

        if(error == false){
            this.isLoading = true;
            this.api.login(this.credentials);
        }
    }

}