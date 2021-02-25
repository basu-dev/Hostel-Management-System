export class Url {
    // rootUrl= 'http=//192.168.100.12=5000';
   public static rootUrl= 'https://murmuring-bayou-32937.herokuapp.com';
//    public static rootUrl= 'http://localhost:5000';

   public static registerAdmin=Url.rootUrl+`/auth/register/administration`;
   public static registerStudent=Url.rootUrl+'/students';
   public static filterStudent = Url.rootUrl+'/filterStudents';
   public static login=Url.rootUrl+'/auth/login';
   public static students=Url.rootUrl+'/students';
   public static staffs=Url.rootUrl+'/staffs';

   public static rooms=Url.rootUrl+'/rooms';
   public static notices= Url.rootUrl+'/notice';
   public static addNotice=Url.notices+'/add';
   public static getNotices=Url.notices+'/search/latest'

}