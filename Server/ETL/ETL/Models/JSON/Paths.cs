using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETL.Models.JSON
{
    
    public class Paths:List<Path>
    {
        //public  _data { get; set; }
    }
    
    public class Path
    {
        public string recordId { get; set; }
        public string distanceMiles { get; set; }
        //public string[] location { get; set; }
        public string coordinates { get; set; }
        public string title { get; set; }
    }


    public class StateCountry
    {
        //public string state { get; set; }
        public string country { get; set; }

    }

}
