import * as _ from "lodash";
import * as angular from "angular";
import Api from "../libs/Api";
import {Credentials} from "../libs/Api";

export default class DashboardModule {

    public static configure() : void {
        angular
            .module("DashboardModule", ['ui.router'])
            .config(function DashboardModuleConfig($stateProvider: ng.ui.IStateProvider) {
                $stateProvider
                    .state('dashboard', <ng.ui.IState> {
                        url: '/dashboard',
                        component: 'dashboardComponent'
                    })
                ;
            })
            .component('dashboardComponent', new DashboardComponent())
        ;
    }

}

class DashboardComponent implements ng.IComponentOptions {
    public transclude: boolean = true;
    public templateUrl: string = "Dashboard/main.html";
    public controller : any = DashboardComponentController;
    public bindings: any = {};
}

class DashboardComponentController {

}