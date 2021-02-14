export class Url {
    // rootUrl= 'http=//192.168.100.12=5000';
   public static rootUrl= 'http://45.76.147.177:5000';
   public static registerAdmin=Url.rootUrl+`/auth/register/administration`;
   public static registerStudent=Url.rootUrl+'/auth/register/student';
   public static login=Url.rootUrl+'/auth/login';
   public static students=Url.rootUrl+'/students';
   public static rooms=Url.rootUrl+'/rooms';

}