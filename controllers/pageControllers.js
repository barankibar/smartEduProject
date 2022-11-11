const getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

const getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

const getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};


const getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

const getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

module.exports = {
  getRegisterPage,
  getIndexPage,
  getAboutPage,
  getContactPage,
  getLoginPage,
};
