const sql = require("./db.js");

const PedidoModel = function(pedido) {
    this.hora = pedido.hora;
    this.status = pedido.status;
}

PedidoModel.create = (pedido, result) => {
    sql.query("INSERT INTO pedidos SET ? ", pedido, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { idpedidos: res.insertId, ...pedido });
    });
};

PedidoModel.getAll = (result) => {
    sql.query("SELECT * FROM pedidos", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    })
}


PedidoModel.findById = (pedidoId, result) => {
    sql.query("SELECT * FROM pedidos WHERE idpedidos = " + pedidoId, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        } else
            result({ kind: "not_found" }, null)
    })

};

PedidoModel.updateById = (pedidoId, pedido, result) => {
    sql.query("UPDATE pedidos SET status = ? WHERE idpedidos = ? ", [pedido.status, pedidoId], (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, { idpedido: pedidoId, ...pedido });
        }
    })
}

PedidoModel.remove = (pedidoId, result) => {
    sql.query("DELETE FROM pedidos WHERE idpedidos = ?", pedidoId, (err, res) => {
        if (err) {
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, res);
        }
    })
}

PedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM pedidos", (err, res) => {
        if (err) {
            console.log("erro:", err);
            result(err);
        } else {
            result(null);
        }
    })
}
module.exports = PedidoModel;