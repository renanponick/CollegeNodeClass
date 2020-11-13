const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const usuarioModel = require('../models/usuario.model.js');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            massage: "Sem Token"
        })
    }else{
        jwt.verify(token, config.secret, (err, decoded) =>{
            if(err){
                res.status(401).send({
                    message: "Não Autorizado"
                })
            }else{
                req.usuarioId = decoded.id;
                next();
            }
        })
    }
}
isAdmin = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err,data) => {
        if(data.tipo == 1){
            next();
        }else
            res.status(403).send({
                message: "Somente Admin"
            })
    })
}

isBalc = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err,data) => {
        if(data.tipo == 2){
            next();
        }else
            res.status(403).send({
                message: "Somente balconista"
            })
    })
}

isCozi = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err,data) => {
        if(data.tipo == 3){
            next();
        }else
            res.status(403).send({
                message: "Somente da Cozinha"
            })
    })
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isCozi: isCozi,
    isBalc: isBalc
}