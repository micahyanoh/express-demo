import express from "express";

const app = express();
//enabling app to accept json input
app.use(express.json());
//courses object

const courses = [
  { id: 1, name: "CS" },
  { id: 2, name: "IT" },
  { id: 3, name: "DSA" },
];

//home endpoinyt
app.get("/", (req, res) => {
  res.send(`Hello Express`);
});

//courses endpoint
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//courses/id endpoint
app.get("/api/courses/:id", (req, res) => {
  //let is used to name a variable that you intend to reset later
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send(`Course with id not found`);
  res.send(course);
});
// using more than one parameters
app.get("/api/courses/:id/:name", (req, res) => {
  res.send(req.params);
});
// using query parameters
app.get("/api/courses/:id/:name", (req, res) => {
  res.send(req.query);
});
// post endpoint

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
