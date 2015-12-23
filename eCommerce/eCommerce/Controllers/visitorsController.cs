using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using eCommerce.Models;
using System.Web.Script.Serialization;
using System.Web.Script.Services;

namespace eCommerce.Controllers
{
    public class visitorsController : Controller
    {
        private eCommerceDBEntities db = new eCommerceDBEntities();

        // GET: visitors
        public ActionResult Index()
        {
            return View(db.visitors.ToList());
        }

        // GET: visitors/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            visitor visitor = db.visitors.Find(id);
            if (visitor == null)
            {
                return HttpNotFound();
            }
            return View(visitor);
        }

        // GET: visitors/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: visitors/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,email,password,name,phone,ip,modified,created,active")] visitor visitor)
        {
            if (ModelState.IsValid)
            {
                db.visitors.Add(visitor);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(visitor);
        }

        // GET: visitors/Edit/5
        public ActionResult Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            visitor visitor = db.visitors.Find(id);
            if (visitor == null)
            {
                return HttpNotFound();
            }
            return View(visitor);
        }

        // POST: visitors/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,email,password,name,phone,ip,modified,created,active")] visitor visitor)
        {
            if (ModelState.IsValid)
            {
                db.Entry(visitor).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(visitor);
        }

        // GET: visitors/Delete/5
        public ActionResult Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            visitor visitor = db.visitors.Find(id);
            if (visitor == null)
            {
                return HttpNotFound();
            }
            return View(visitor);
        }

        // POST: visitors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(long id)
        {
            visitor visitor = db.visitors.Find(id);
            db.visitors.Remove(visitor);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }


        public ActionResult Shipping()
        {
            return View();
        }
        //[WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        [HttpGet]
        public JsonResult areas()
        {
            eCommerceDBEntities shop = new eCommerceDBEntities();
            int id = Convert.ToInt32(Request.QueryString["id"]);
            var area = shop.areas.Where(ar => ar.arID == id);
            return Json(area, JsonRequestBehavior.AllowGet);
        }

        public JsonResult cts()
        {
            eCommerceDBEntities shop = new eCommerceDBEntities();
            string id = Request.QueryString["id"];
            var cts = shop.cts.Where(ct => ct.cntId == id);
            return Json(cts, JsonRequestBehavior.AllowGet);
        }

    }
}
