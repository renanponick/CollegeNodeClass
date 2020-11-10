const sql = require("./db.js");

const ProdutoPedidoModel = function(produtoPedido) {
    this.produtos_idprodutos = produtoPedido.hora;
    this.pedidos_idpedidos = produtoPedido.status;
    this.observacao = produtoPedido.observacao;
}

ProdutoPedidoModel.create = (pedido, result) => {
    sql.query("INSERT INTO pedidos_pedidos SET ? ", produtoPedido, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { idprodutopedido: res.insertId, ...produtoPedido });
    });
};
ProdutoPedidoModel.getAll = (result) => {
    sql.query(`SELECT * FROM pedidos_pedidos prods_peds
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
    sql.query(`SELECT * FROM pedidos_pedidos prods_peds
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
    sql.query(`SELECT * FROM pedidos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)
    WHERE peds.idpedidos = ${pedidoId}`,
    (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res[0]);
    })
}

ProdutoPedidoModel.getByProoduto = (produtoId, result) => {
    sql.query(`SELECT * FROM pedidos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)
    WHERE prods.idproduto = ${produtoId}`,
    (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res[0]);
    })
}

module.exports = PedidoModel;