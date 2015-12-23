using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using eCommerce.Models;
using eCommerce.Logic;
using System.Collections.Specialized;
using System.Collections;
using System.Web.ModelBinding;


namespace eCommerce.Controllers
{
    public class ShopController : Controller
    {


        // GET: Shop
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Category(long id,long start=0)
        {
            eCommerceDBEntities context = new eCommerceDBEntities();
            page cat = context.pages.SingleOrDefault(p => p.id == id);
            

            return View(cat);
        }

        public ActionResult Product(long id)
        {
            eCommerceDBEntities context = new eCommerceDBEntities();
            product prod = context.products.SingleOrDefault(p => p.id == id);

            return View(prod);
        }

        
        [HttpGet]
        public ActionResult Cart(string rawId)
        {
            return View();
        }

        [HttpPost]
        [ActionName("Cart")]
        public ActionResult UpdateCart()
        {
            int id = Convert.ToInt32(Request.Form["product_id"]);
            ShoppingCartActions.Instance.AddItem(id);
            return View();
        }
    }
}