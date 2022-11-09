exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
}

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
}

exports.getCoursesPage = (req, res) => {
  res.status(200).render("courses", {
    page_name: "courses",
  });
}

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
}

exports.getDashboardPage = (req, res) => {
  res.status(200).render("dashboard", {
    page_name: "dashboard",
  });
}
