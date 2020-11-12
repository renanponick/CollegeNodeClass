const sql = require("./db.js");

const ProdutoPedidoModel = function(produtoPedido) {
    this.produtos_idprodutos = produtoPedido.produtos_idprodutos;
    this.pedidos_idpedidos = produtoPedido.pedidos_idpedidos;
    this.observacao = produtoPedido.observacao;
}

ProdutoPedidoModel.create = (produtoPedido, result) => {
    sql.query("INSERT INTO produtos_pedidos SET ? ", produtoPedido, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { idprodutopedido: res.insertId, ...produtoPedido });
    })
}

ProdutoPedidoModel.getAll = (result) => {
    sql.query(`SELECT * FROM produtos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)`,
    (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    })
}

ProdutoPedidoModel.findById = (produtoPedidoId, result) => {
    sql.query(`SELECT * FROM produtos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)
    WHERE prods_peds.idprodutos_pedidos = ${produtoPedidoId}`,
    (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if(res.length){
            result(null, res[0]);
        }
        else{
            result({kind: "not_found"}, null)
        }
    })
}

ProdutoPedidoModel.getByPedido = (pedidoId, result) => {
    sql.query(`SELECT * FROM produtos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)
    WHERE peds.idpedidos = ${pedidoId}`,
    (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if(res.length){
            result(null, res);
        }else
            result({kind: "not_found"}, null);
    })
}

ProdutoPedidoModel.getByProduto = (produtoId, result) => {
    sql.query(`SELECT * FROM produtos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)
    WHERE prods.idprodutos = ${produtoId}`,
    (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if(res.length){
            result(null, res);
        }else
            result({kind: "not_found"}, null);
    })
}

ProdutoPedidoModel.updateById = (pedidoProdutoId, observacao, result) => {
    sql.query("UPDATE produtos_pedidos SET observacao = ? WHERE idprodutos_pedidos = ? ", [observacao, pedidoProdutoId], (err, res) => {
        if (err) {
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, { idprodutos_pedidos: pedidoProdutoId, observacao });
        }
    })
}

ProdutoPedidoModel.delete = (produtoPedidoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE idprodutos_pedidos = "+ produtoPedidoId, (err, res) => {
        if(err){
            result(err, null);
        } else if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
        }else{
            result(null, res);
        }
    })
}

ProdutoPedidoModel.delete = (result) => {
    sql.query("DELETE FROM produtos_pedidos", (err, res) => {
        if(err){
            result(err, null);
        }else{
            result(null);
        }
    })
}

ProdutoPedidoModel.deleteByPedido = (pedidoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE pedidos_idpedidos = "+ pedidoId, (err, res) => {
        if(err){
            result(err, null);
        } else if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
        }else{
            result(null, res);
        }
    })
}

ProdutoPedidoModel.deleteByProduto = (produtoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE produtos_idprodutos = "+ produtoId, (err, res) => {
        if(err){
            result(err, null);
        } else if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
        }else{
            result(null, res);
        }
    })
}

module.exports = ProdutoPedidoModel;