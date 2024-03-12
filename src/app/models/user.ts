export class User{

    constructor( 
         public fname : string ,
         public lname: string ,
         public email: string ,
         public role: string ,
         private _token: string ,
         private tokenExpireDate: Date
         ){}
    
        get Token(){
            if( this.tokenExpireDate && new Date() < this.tokenExpireDate){
                return  this._token
            }
            else return null
        }
 
    
}