module.exports = app => {
    const produtoController = require("../controllers/produto.controller.js");
    const authJwt = require("../middlewares/auth_jwt.middleware.js")
    /*
    app.post("/produtos", [authJwt.verifyToken, authJwt.isAdmin], produtoController.create);

    app.get("/produtos", [authJwt.verifyToken, authJwt.isAdmin], produtoController.findAll);

    app.get("/produtos/:produtoId", [authJwt.verifyToken, authJwt.isAdmin], produtoController.findOne);

    app.put("/produtos/:produtoId", [authJwt.verifyToken, authJwt.isAdmin], produtoController.update);

    app.delete("/produtos/:produtoId", [authJwt.verifyToken, authJwt.isAdmin], produtoController.delete);

    app.delete("/produtos", [authJwt.verifyToken, authJwt.isAdmin], produtoController.deleteAll);
*/

    app.post("/produtos", produtoController.create);

    app.get("/produtos", produtoController.findAll);

    app.get("/produtos/:produtoId", produtoController.findOne);

    app.put("/produtos/:produtoId", produtoController.update);

    app.delete("/produtos/:produtoId", produtoController.delete);

    app.delete("/produtos", produtoController.deleteAll);
}