export class Url {
    // rootUrl= 'http=//192.168.100.12=5000';
   public static rootUrl= 'https://fierce-dusk-57265.herokuapp.com';
//    public static rootUrl= 'http://localhost:5000';

   public static registerAdmin=Url.rootUrl+`/auth/register/administration`;
   public static registerStudent=Url.rootUrl+'/auth/register/student';
   public static filterStudent = Url.rootUrl+'/filterStudents';
   public static login=Url.rootUrl+'/auth/login';
   public static students=Url.rootUrl+'/students';
   public static rooms=Url.rootUrl+'/rooms';

}