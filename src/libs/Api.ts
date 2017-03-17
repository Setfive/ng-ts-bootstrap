import * as angular from "angular";

enum Routes {
    Login,
};

export default class Api {
    static $inject = ["$http", "$q"];

    private $http: ng.IHttpService;
    private $q: ng.IQService;
    private baseUrl : string = (<any>window).baseUrl;

    constructor($http: ng.IHttpService, $q: ng.IQService) {
        this.$http = $http;
        this.$q = $q;
    }

    public login(credentials: Credentials) : ng.IPromise<LoginResult> {
        const df = this.$q.defer();

        this.$http({
            method: 'POST',
            url: this.route(Routes.Login),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: ""
        })
        .then((response) => {
            const result = response.data;

        })
        .catch((response) => {
            console.log(response);
        });

        return df.promise;
    }

    private handleHttpError() : void {
        alert("Sorry! Something went wrong. Please try again.");
    }

    private route(name : Routes) : string {
        let url = this.baseUrl;

        switch(name){
            case Routes.Login:
                url += "/api/login_check";
                break;
        }

        return url;
    }
}

export class LoginResult {
    isSuccess : boolean;
    msg : string;
}

export class Credentials {
    username: string = "";
    password: string = "";

    public get(key:string) : string {
        if(key == "username"){
            return this.username;
        }else if(key == "password"){
            return this.password;
        }
        return "";
    }
}