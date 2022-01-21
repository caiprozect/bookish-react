const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const _ = require("underscore");

const relations = {
  books: "reviews",
};

const buildRewrite = (relations) => {
  return _.reduce(
    relations,
    (sum, embed, resources) => {
      sum[`/${resources}/:id`] = `/${resources}/:id?_embed=${embed}`;
      return sum;
    },
    {}
  );
};

// server.use(
//   jsonServer.rewriter({
//     "/books/:id": "/books/:id?_embed=reviews",
//   })
// );

server.use(jsonServer.rewriter(buildRewrite(relations)));

server.use((req, res, next) => {
  console.log(req);
  if (req.method === "DELETE" && req.query["_cleanup"]) {
    const db = router.db;
    db.set("reviews", []).write();

    if (relations[req.entity]) {
      db.set(relations[req.entity], []).write();
    }

    res.sendStatus(204);
  } else {
    next();
  }
});

server.use(middlewares);
server.use(router);

server.listen(8080, () => {
  console.log("JSON Server is running");
});
