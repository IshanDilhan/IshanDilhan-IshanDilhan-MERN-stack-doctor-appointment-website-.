
const controller = require("./controller");


app.use(
  // data comes in different type here we should enocode that
  express.urlencoded({
    extended: true, // if false can get only string and arrys
  })
);


// // //create REST api
// // app.get("/users", (req, res) => {
// //   controller.getUsers((users) => {
// //     res.send(users);
// //   });
// // });

// // app.get("/user", (req, res) => {
// //     const id = req.query.id;
// //     controller.getUserById(id,(users) => {
// //       res.send(users);
// //     });
// //   });


// app.get('/users', (req, res) => {
//   controller.getUsers((req, res, next) => {
//     res.send();
//   });
// });

// app.post('/createUser', (req, res) => {
//   controller.addUser(req.body, (callback) => {
//     res.send();
//   });
// });

// app.post('/updateUser', (req, res) => {
//   controller.addUser(req.body, (callback) => {
//     res.send(callback);
//   });
// });

// app.post('/deleteUser', (req, res) => {
//   controller.addUser(req.body, (callback) => {
//     res.send(callback);
//   });
// });

// module.exports = app;
