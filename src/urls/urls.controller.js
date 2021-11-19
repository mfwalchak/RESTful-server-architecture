const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));
const uses = require(path.resolve("src/data/uses-data"));

function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1,
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function destroy(req, res) {
  const { urlId } = req.params;
  const index = urls.findIndex((url) => url.id === Number(urlId));
  if (index > -1) {
    urls.splice(index, 1);
  }
  res.sendStatus(204);
}

function hasHref(req, res, next) {
  const { data: { href } = {} } = req.body;

  if (href) {
    return next();
  }
  next({ status: 400, message: "A 'href' property is required." });
}

function list(req, res) {
  res.json({ data: urls });
}

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id === urlId);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `url id not found: ${req.params.urlId}`,
  });
}

function read(req, res) {
  res.status(200).json({ data: res.locals.url });
  const { data: { time } = {} } = req.body;
  const urlParam = Number(req.params.urlId);
  const newUse = {
    id: uses.length + 1,
    urlId: urlParam,
    time: Date.now()
  };
  uses.push(newUse);
}

function update(req, res) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id === urlId);

  const { data: { href } = {} } = req.body;

  foundUrl.href = href;

  res.json({ data: foundUrl });
}

module.exports = {
  urlExists,
  create: [hasHref, create],
  list,
  read: [urlExists, read],
  update: [urlExists, hasHref, update],
  delete: destroy,
};
