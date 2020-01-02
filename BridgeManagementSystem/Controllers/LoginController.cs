using BridgeManagementSystem.Database;
using BridgeManagementSystem.Models;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BridgeManagementSystem.Controllers
{
    public class LoginController : Controller
    {
        public static SqlSugarClient db = DataBase.CreateClient();

        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Check(LoginInform user)//校验登录信息
        {
            var account = user.Account;
            var password = user.Password;
            if (string.IsNullOrEmpty(account) || string.IsNullOrEmpty(password))//输入框为空
            {
                return Json(new { code = 401 }, JsonRequestBehavior.AllowGet);
            }
            else{
                bool isLogin = false;
                //考虑加一个大小写敏感
                var login = db.Queryable<LoginInform>().InSingle(account);
                if (login!=null&&login.Password == password)
                {
                    isLogin = true;
                }
                if (!isLogin)//账号or密码错误
                {
                    return Json(new { code = 402 }, JsonRequestBehavior.AllowGet);
                }
                else//登录成功
                {
                    return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
                }
            }
        }
    }
}