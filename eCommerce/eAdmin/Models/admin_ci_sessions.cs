//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace eAdmin.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class admin_ci_sessions
    {
        public string session_id { get; set; }
        public string ip_address { get; set; }
        public string user_agent { get; set; }
        public long last_activity { get; set; }
        public string user_data { get; set; }
    }
}