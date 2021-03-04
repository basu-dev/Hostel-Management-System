export class Url {
    // rootUrl= 'http=//192.168.100.12=5000';
   public static rootUrl= 'https://murmuring-bayou-32937.herokuapp.com';
   // public static rootUrl= 'http://192.168.0.3:5000';

   // public static rootUrl= 'http://localhost:5000';

   public static registerAdmin=Url.rootUrl+`/auth/register/administration`;
   public static registerStudent=Url.rootUrl+'/students';
   public static filterStudent = Url.rootUrl+'/filterStudents';
   public static login=Url.rootUrl+'/auth/login';
   public static resetPasswordUser=Url.rootUrl+'/auth/initialpasswordreset';
   public static resetPasswordByAdmin=Url.rootUrl+'/auth/resetpassword';//:id is required


   public static students=Url.rootUrl+'/students';
   public static allStaffs=Url.rootUrl+'/auth/findall/staff';
   public static registerStaff=Url.rootUrl+'/auth/register/staff';
   public static updateStaff=Url.rootUrl+'/auth/update/staff';

   public static rooms=Url.rootUrl+'/rooms';
   public static availableRooms=Url.rooms+'/vacant';

   public static notices= Url.rootUrl+'/notice';
   public static addNotice=Url.notices+'/add';
   public static getNotices=Url.notices+'/search/latest';
   public static loginCredentials=Url.rootUrl+'/auth/logindetails';
   public static loginCredentialSingle=Url.loginCredentials+'/search';

   public static getMessages=Url.rootUrl+'/message/get';
   public static setMessages=Url.rootUrl+'/message/add';
   public static studentquery=Url.rootUrl+'/studentquery';

   public static mess=Url.rootUrl+'/mess';
   public static enrollStudentMess=Url.mess+'/enrollremove';


}