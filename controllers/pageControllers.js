const nodeMailler = require("nodemailer");

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

const emailService = (req, res) => {
  try{
    const transporter = nodeMailler.createTransport({
      service: "gmail",
      auth: {
        user: "barankibarr@outlook.com",
        pass: "1234",
      },
    });
  
    const mailOptions = {
      from: "barankibarr@gmail.com",
      to: "barankibarr@gmail.com",
      subject: "",
      html: `
        <h1> ${req.body.first_name} ${req.body.last_name}</h1>
        <div>
          email: ${req.body.email}
          phone: ${req.body.phone}
          comment : ${req.body.comment}
        </div>
      `,
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
  
      console.log("Email sent: ");
    });
  
    res.status(200).redirect("/contact");
  }catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

module.exports = {
  getRegisterPage,
  getIndexPage,
  getAboutPage,
  getContactPage,
  getLoginPage,
  emailService,
};
