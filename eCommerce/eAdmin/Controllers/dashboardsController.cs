using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using eAdmin.Models;

namespace eAdmin.Controllers
{
    public class dashboardsController : Controller
    {
        private eAdminDBEntities db = new eAdminDBEntities();

        // GET: dashboards
        public ActionResult Index()
        {
            return View(db.dashboards.ToList());
        }

        // GET: dashboards/Details/5
        public ActionResult Info()
        {
            int id = 1;         
            dashboard dashboard = db.dashboards.Find(id);
            if (dashboard == null)
            {
                return HttpNotFound();
            }
            return View(dashboard);
        }

        // GET: dashboards/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: dashboards/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,about,customer,return_policy,how,faq,phone,email,background,header,logo")] dashboard dashboard)
        {
            if (ModelState.IsValid)
            {
                db.dashboards.Add(dashboard);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(dashboard);
        }

        // GET: dashboards/Edit/5
        public ActionResult Edit()
        {
            int id = 1;
            dashboard dashboard = db.dashboards.Find(id);
            if (dashboard == null)
            {
                return HttpNotFound();
            }
            return View(dashboard);
        }

        // POST: dashboards/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,about,customer,return_policy,how,faq,phone,email,background,header,logo")] dashboard dashboard)
        {
            if (ModelState.IsValid)
            {
                db.Entry(dashboard).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Info");
            }
            return View(dashboard);
        }

        // GET: dashboards/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            dashboard dashboard = db.dashboards.Find(id);
            if (dashboard == null)
            {
                return HttpNotFound();
            }
            return View(dashboard);
        }

        // POST: dashboards/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            dashboard dashboard = db.dashboards.Find(id);
            db.dashboards.Remove(dashboard);
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

        public class order
        {
            public string type;
            public string label;
        }
        class xaxis
        {
            string type;
        }

        public JsonResult Statistic()
        {
            eAdminDBEntities shop = new eAdminDBEntities();
            string state = "year";
            order o = new order();
            o.type = "order";
            o.label = "bal";

            List<List<int>> customer = new List<List<int>> { };
            for(int i = 0; i < 12; i++)
            {
                List<int> c = new List<int> { };
                c.Add(i);
                c.Add(shop.visitors.Where(cstmr => cstmr.created.Month == i).Count());
                customer.Add(c);
            }
            Array order = shop.order_num.Where(ordr => ordr.created.Year==DateTime.Now.Year).ToArray();
            return Json(o, JsonRequestBehavior.AllowGet);

        }
    }
}
