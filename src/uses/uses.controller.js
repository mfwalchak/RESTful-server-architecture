const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));

// function create(req, res) {
// const { data: { time } = {} } = req.body;
// const { urlParam } = req.params;
// const newUse = {
//     id: uses.length + 1,
//     urlId: urlParam, //**TODO** still not working ask group how they solved */
//     time,
//   };
//   uses.push(newUse);
//   res.status(201).json({ data: newUse });
// }

function destroy(req, res) { //throwing NaN
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

// function hasInfo(req, res, next) {
//     const { data: { time } = {} } = req.body;

//   if (time) {
//     return next();
//   }
//   next({ status: 400, message: "Time property is required." });
// }

function list(req, res) {
    const { urlId } = req.params;
    const byuseId = urlId ? use => use.urlId === Number(urlId) : ()=> true;
  res.json({ data: uses.filter(byuseId) });
}

function useExists(req, res, next) {
  const useId = req.params.useId;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({
    status: 404,
    message: `${useId}`
  });
}

function read(req, res) {
  res.json({ data: res.locals.use });
}

function update(req, res) {
    // const use = res.locals.use;
    const { data: { time } = {} } = req.body;

    use.time = time;

    res.json({ data: use });
}

module.exports = {
//create: [hasInfo, create],
  list,
  read: [useExists, read],
  //update: [useExists, hasInfo, update],
  delete: [useExists, destroy],
};
