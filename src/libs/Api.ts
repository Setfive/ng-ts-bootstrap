import * as angular from "angular";
import * as $ from "jquery";

enum Routes {
    Login,
};

export default class Api {
    static $inject = ["$http", "$q"];

    private $http: ng.IHttpService;
    private $q: ng.IQService;
    private baseUrl : string = (<any>window).baseUrl;

    private jwtToken : JWTToken = null;

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
            data: $.param(credentials)
        })
        .then((response) => {
            const result = response.data;
            this.jwtToken = new JWTToken((<any> result).expires_in_seconds, (<any> result).refresh_token, (<any> result).token);
            df.resolve(new LoginResult(true, ""));
        })
        .catch((response) => {
            if(response.status == 401){
                df.resolve( new LoginResult(false, response.data.message) );
            }else{
                this.handleHttpError();
            }
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
    constructor(isSuccess : boolean, msg : string){
        this.isSuccess = isSuccess;
        this.msg = msg;
    }
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

class JWTToken {
    expiresInSeconds: number;
    refreshToken: string;
    token: string;
    constructor(expiresInSeconds: number, refreshToken: string, token: string){
        this.expiresInSeconds = expiresInSeconds
        this.refreshToken = refreshToken;
        this.token = token;
    }
}