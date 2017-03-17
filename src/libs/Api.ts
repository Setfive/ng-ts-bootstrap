import * as angular from "angular";

export default class Api {
    static $inject = ["$http", "$q"];

    private $http: ng.IHttpService;
    private $q: ng.IQService;

    constructor($http: ng.IHttpService, $q: ng.IQService) {
        this.$http = $http;
        this.$q = $q;
    }
}