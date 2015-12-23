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
    public class slide_imageController : Controller
    {
        private eAdminDBEntities db = new eAdminDBEntities();

        // GET: slide_image
        public ActionResult Index()
        {
            return View(db.slide_image.ToList());
        }

        // GET: slide_image/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            slide_image slide_image = db.slide_image.Find(id);
            if (slide_image == null)
            {
                return HttpNotFound();
            }
            return View(slide_image);
        }

        // GET: slide_image/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: slide_image/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,image,C_sort,slider_num,title1,title2")] slide_image slide_image)
        {
            if (ModelState.IsValid)
            {
                db.slide_image.Add(slide_image);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(slide_image);
        }

        // GET: slide_image/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            slide_image slide_image = db.slide_image.Find(id);
            if (slide_image == null)
            {
                return HttpNotFound();
            }
            return View(slide_image);
        }

        // POST: slide_image/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,image,C_sort,slider_num,title1,title2")] slide_image slide_image)
        {
            if (ModelState.IsValid)
            {
                db.Entry(slide_image).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(slide_image);
        }

        // GET: slide_image/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            slide_image slide_image = db.slide_image.Find(id);
            if (slide_image == null)
            {
                return HttpNotFound();
            }
            return View(slide_image);
        }

        // POST: slide_image/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            slide_image slide_image = db.slide_image.Find(id);
            db.slide_image.Remove(slide_image);
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
