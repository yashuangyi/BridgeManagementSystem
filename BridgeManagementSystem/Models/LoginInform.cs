using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeManagementSystem.Models
{
    ///<summary>
    ///
    ///</summary>
    [SugarTable("login")]
    public partial class LoginInform
    {
        public LoginInform()
        {

        }
        //指定主键和自增列
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Account { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Password { get; set; }

    }
}