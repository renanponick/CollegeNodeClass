<template>
    <div class="form-produto mt-3 mx-auto">
        <p class="headline">Adicionar Produto</p>

        <div>
            <v-form v-model="formValidate">
                <v-text-field
                v-model="produto.nome"
                :rules="[(v) => !!v || 'Nome é um campo obrigatório']"
                label="Nome"
                required>
                </v-text-field>

                <v-text-field
                v-model="produto.valor"
                :rules="[(v) => !!v || 'Valor é um campo obrigatório']"
                type="number"
                label="Valor"
                required>
                </v-text-field>

                <v-divider class="my-5"></v-divider>

                <v-btn color="error" small class="mr-2" @click="deletarProduto">
                    Excluir
                </v-btn>

                <v-btn color="success" small @click="updateProdutc">
                    Atualizar 
                </v-btn>

                <v-alert text
                    v-if="msgSucesso != ''"
                    color="teal"
                    icon="mdi-account-check">
                    {{ msgSucesso }}
                </v-alert>

                <v-alert v-if="msgErro != ''" text type="error" icon="mdi-account-remove">
                    {{ msgErro }}
                </v-alert>
            </v-form>
        </div>
    </div>
</template>


<script>
import ProductService from "../../services/ProductService.js"

export default {
    data(){
        return{
            produto: null,
            msgSucesso: "",
            msgErro: ""
        }
    },
    mounted(){
        this.getProdutc(this.$route.params.id);
    },
    methods: {
        getProdutc(id){
            ProductService.get(id)
            .then(response => {
                this.produto = response.data;
            })
            .catch(e=>console.log(e));
        },
        updateProdutc(){
            console.log(this.produto)
            ProductService.update(this.produto.idprodutos, this.produto)
            .then(response => {
                this.msgSucesso - response.data;
                this.$router.push({name: "ListProducts"});
            })
            .catch(e =>{
                this.msgErro = e;
                console.log(e);
            })
        }
    }
}
</script>