require("dotenv").config();

const express = require("express");
const path = require("path");
const errorHandler = require("errorhandler");
const logger = require("morgan");
const methodOverride = require("method-override");

const port = 3000;
const app = express();

app.use(logger("dev"));
app.use(methodOverride());
app.use(errorHandler());
app.use(express.static(__dirname + "/dist"));

// Prismic Setup
const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");

function initApi(req) {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req: req
  });
}

const handleLinkResolver = (doc) => {
  return "/";
};

app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver
  };

  res.locals.PrismicDOM = PrismicDOM;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const api = await initApi(req);
  const home = await api.getSingle("home", {
    fetchLinks: ["album.title", "album.color"]
  });

  console.log(home.data.albums);

  res.render("pages/home", {
    home
  });
});

app.get("/album/:id", async (req, res) => {
  const api = await initApi(req);
  const album = await api.getByUID("album", req.params.id, {});

  console.log(album.data.description);

  res.render("pages/album", {
    album
  });
});

app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
