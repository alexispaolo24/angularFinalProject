export interface User {
    id?:number,
    username: string,
    email: string,
    type: string,
    isActive : boolean,
    password : string,
    firstName : string,
    middleName : string,
    lastName : string,
    mobileNo : string,
    listOfInterests : []
}