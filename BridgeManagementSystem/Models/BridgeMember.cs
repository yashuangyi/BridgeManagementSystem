using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeManagementSystem.Models
{
    [SugarTable("bridge_member")]
    public class BridgeMember
    {
        public BridgeMember()
        {

        }

        /// <summary>
        /// Desc:左幅
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string LeftPart { get; set; }

        /// <summary>
        /// Desc:右幅
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string RightPart { get; set; }

        /// <summary>
        /// Desc:上部结构
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string TopPart { get; set; }

        /// <summary>
        /// Desc:下部结构
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string BottomPart { get; set; }

        /// <summary>
        /// Desc:桥梁构件编号
        /// Default:
        /// Nullable:False
        /// </summary>           
        [SugarColumn(IsPrimaryKey = true)]
        public int Id { get; set; }

        /// <summary>
        /// Desc:桥梁编号
        /// Default:
        /// Nullable:True
        /// </summary>           
        public int? BridgeId { get; set; }
    }
}