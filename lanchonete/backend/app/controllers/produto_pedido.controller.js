const produtoPedidoModel = require("../models/produto_pedido.model.js");

exports.create = (req, res) => {
    if (!req.body.produtos_idprodutos && !req.body.pedidos_idpedidos && !req.body.observacao) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    } else {
        const produtoPedido = new produtoPedidoModel({
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos,
            observacao: req.body.observacao
        });

        produtoPedidoModel.create(produtoPedido, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            } else {
                res.send(data);
            }
        })
    }

}

exports.findAll = (req, res) => {
    produtoPedidoModel.getAll((err, data) =>{
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro"
            })
        }else
            res.send(data);
    })
}

exports.findOne = (req, res) => {
    produtoPedidoModel.findById(req.params.produtoPedidoId, (err, data) => {
        if(err){
            if(err.king == "not_found"){
                res.status(404).send({
                    massage : "Registro não encontrado"
                });
            }else {
                res.status(500).send({
                    message: "Erro ao retornar os itens relacionados ao ID:" + req.params.produtoPedidoId
                });
            }
        }else
            res.send(data);
    })
}

exports.findByPedido = (req, res) => {
    produtoPedidoModel.getByPedido(req.params.pedidoId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({
                    massage: "Registro não encontrado"
                });
            }else{
                res.status(500).send({
                    message: "Erro ao retornar os itens relacionados ao ID:" + req.params.pedidoId
                })
            }
        }else
            res.send(data);
    })
}

exports.findByProduto = (req, res) => {
    produtoPedidoModel.getByProduto(req.params.produtoId, (err, data) => {
        if(err){
            if(err.kind = "not_found"){
                res.status(404).send({
                    massage: "Registro não encontrado"
                })
            }else{
                res.status(500).send({
                    message: "Erro ao retornar os pedidos relacionados ao produto ID:" + req.params.produtoId
                })
            }
        }else
            res.send(data);
    })
}

exports.update = (req, res) => {
    if (!req.body.observacao) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    } else {
        produtoPedidoModel.updateById(req.params.produtoPedidoId, req.body.observacao, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Produto Pedido não encontrado."
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar produto."
                    })
                }
            } else {
                res.send(data);
            }
        })
    }
}

exports.delete = (req, res) => {
    produtoPedidoModel.delete(req.params.produtoPedidoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Produto_Pedido não encontrado." })
            } else {
                res.status(500).send({ message: "Erro ao deletar Produto_Pedido." })
            }
        } else {
            res.send({ messsage: "Produto_Pedido deletado com sucesso" });
        }
    })

}

exports.deleteAll = (req, res) => {
    produtoPedidoModel.delete((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todos os produtos." })
        } else {
            res.send({ messsage: "Todos os produtos deletados com sucesso" });
        }
    })
}

exports.deleteByPedido = (req, res) => {
    produtoPedidoModel.deleteByPedido(req.params.pedidoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Pedido não encontrado." })
            } else {
                res.status(500).send({ message: "Erro ao deletar Pedido." })
            }
        } else {
            res.send({ messsage: "Produto_Pedido deletado com sucesso" });
        }
    })

}
exports.deleteByProduto = (req, res) => {
    produtoPedidoModel.deleteByProduto(req.params.produtoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Produto não encontrado." })
            } else {
                res.status(500).send({ message: "Erro ao deletar Produto." })
            }
        } else {
            res.send({ messsage: "Produto_Pedido deletado com sucesso" });
        }
    })

}