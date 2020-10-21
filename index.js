const path = require("path");
const hbs = require("hbs");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const staticDir = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(staticDir));

app.get("", (req, res) => {
  res.render("index", {
    name: "NVC",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "NVC",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "NVC",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address not provided",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(data.latitude, data.longitude, (error, weatherdata) => {
      console.log(data);
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        location: data.location,
        forecast: weatherdata.forecastdata,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found",
  });
});

app.listen(port);
