<template>
    <v-card class="mx-auto">
        <v-card-title>Produtos</v-card-title>

        <v-data-table
            :headers="header"
            :items="products"
            disable-pagination
        >
        <template v-slot:[`item.acoes`]="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="updateProduct(item.id)"
            >mdi-pencil</v-icon>
            <v-icon
                small
                class="mr-2"
                @click="deleteProduct(item.id)"
            >mdi-delete</v-icon>
        </template>

        </v-data-table>
    </v-card>
</template>

<script>
import ProductService from "../../services/ProductService.js"

export default {
    data(){
        return{
            products: [],
            header:[
                { text: "Nome", align: "start", sortable: true, value: "nome" },
                { text: "Valor", sortable: true, value: "valor" },
                { text: "Ações", sortable: true, value: "acoes" }
            ]
        }
    },
    mounted(){
        this.getProdutcs();
    },
    methods: {
        getProdutcs(){
            ProductService.getAll()
            .then(response => {
                this.products = response.data.map(this.formatProduct);
            })
            .catch(e=>console.log(e));
        },

        formatProduct(product){
            return{
                id: product.idprodutos,
                nome: product.nome,
                valor: product.valor
            }
        },

        deleteProduct(id){
            console.log(id)
            ProductService.delete(id)
            .then((response)=> {
                console.log(response);
                this.getProdutcs();
            })
            .catch(e => {
                console.log(e);
            })
        },
        updateProduct(id){
            this.$router.push({name: "DetailProducts", params: {id: id}});
        }
    }
}
</script>