if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./models/employee");
require("./models/ticket");
require("./models/admin");
const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const Admin = mongoose.model("Admin");
const MongoDBStore = require("connect-mongo");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const employeeRoutes = require("./routes/employee");
const ticketRoutes = require("./routes/ticket");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/auth");
const ExpressError = require("./utils/ExpressError");
const cors = require("cors");
const wrapAsync = require("./utils/wrapAsync");

// Varibales
const PORT = process.env.PORT;
const mongoURi = process.env.MONGODB_URI;

const secret = "thisisnotagoodsecret";

const store = MongoDBStore.create({
  mongoUrl: mongoURi,
  secret,
  touchAfter: 24 * 60 * 60,
});

const sessionConfig = {
  store,
  secret,
  name: "session",
  resave: false,
  saveUninitialized: false,
};

const corsOptions = {
  origin: process.env.DOMAIN_FRONTEND,
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Using the app
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// inititalizing Passport
passport.use("local", new LocalStrategy(Employee.authenticate()));
passport.use("admin", new LocalStrategy(Admin.authenticate()));
passport.serializeUser((user, done) => {
  if (user instanceof Admin) {
    done(null, { type: "admin", id: user._id });
  } else if (user instanceof Employee) {
    done(null, { type: "employee", id: user._id });
  } else {
    done(new Error("Invalid user type"), null);
  }
});

passport.deserializeUser(async (data, done) => {
  try {
    let user;

    if (data.type === "admin") {
      user = await Admin.findById(data.id);
    } else if (data.type === "employee") {
      user = await Employee.findById(data.id);
    } else {
      return done(new Error("Unknown user type"), null);
    }

    if (!user) {
      return done(new Error("User not found"), null);
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Route handler
app.use(employeeRoutes);
app.use(ticketRoutes);
app.use("/api/auth", adminRoutes);
app.use("/api/auth", authRoutes);

// Logout route for every user
app.get(
  "/logout",
  wrapAsync(async (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.clearCookie("connect.sid", { path: "/" });
        return res.status(200).json({ success: "Logged out successfully" });
      });
    });
  })
);

// initializing Mongoose
mongoose
  .connect(mongoURi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongoose is connected");
  })
  .catch((e) => {
    console.log(e);
  });

// handling the error message
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(status).json({ error: err.message });
});

// Listen for the port Number
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
