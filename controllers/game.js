const Student = require("../models/Student");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.render("layout.ejs");
  });

  app.post("/signup", async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, age } = req.body;
      console.log(name, email, age);
      if (!name || !email || !age) {
        res.status(400).send({ error: "Missing fields" });
        return;
      }
      const student = new Student({
        name,
        email,
        age,
        account: "",
        isPaid: false,
      });
      student.save().then((data) => {
        if (!data) {
          res.status(500).send({ error: "Can't add data" });
        } else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  });
};
