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
    public class admin_permissions_profileController : Controller
    {
        private eAdminDBEntities db = new eAdminDBEntities();

        // GET: admin_permissions_profile
        public ActionResult Index()
        {
            return View(db.admin_permissions_profile.ToList());
        }

        // GET: admin_permissions_profile/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            admin_permissions_profile admin_permissions_profile = db.admin_permissions_profile.Find(id);
            if (admin_permissions_profile == null)
            {
                return HttpNotFound();
            }
            return View(admin_permissions_profile);
        }

        // GET: admin_permissions_profile/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: admin_permissions_profile/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "prof_id,prof_name,C_sort,modified,created")] admin_permissions_profile admin_permissions_profile)
        {
            if (ModelState.IsValid)
            {
                db.admin_permissions_profile.Add(admin_permissions_profile);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(admin_permissions_profile);
        }

        // GET: admin_permissions_profile/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            admin_permissions_profile admin_permissions_profile = db.admin_permissions_profile.Find(id);
            if (admin_permissions_profile == null)
            {
                return HttpNotFound();
            }
            return View(admin_permissions_profile);
        }

        // POST: admin_permissions_profile/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "prof_id,prof_name,C_sort,modified,created")] admin_permissions_profile admin_permissions_profile)
        {
            if (ModelState.IsValid)
            {
                db.Entry(admin_permissions_profile).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(admin_permissions_profile);
        }

        // GET: admin_permissions_profile/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            admin_permissions_profile admin_permissions_profile = db.admin_permissions_profile.Find(id);
            if (admin_permissions_profile == null)
            {
                return HttpNotFound();
            }
            return View(admin_permissions_profile);
        }

        // POST: admin_permissions_profile/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            admin_permissions_profile admin_permissions_profile = db.admin_permissions_profile.Find(id);
            db.admin_permissions_profile.Remove(admin_permissions_profile);
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
    }
}
