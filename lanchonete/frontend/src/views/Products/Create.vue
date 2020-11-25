<template>
    <div class="form-product mt-3 mx-auto">
        <p class="headline">Adicionar Produto</p>

        <div>
            <v-form v-model="formValidate">
                <v-text-field
                    v-model="name"
                    :rules="[(V)=> !!v || 'Nome é um campo obrigatório']"
                    label="Nome"
                    required>
                </v-text-field>

                <v-text-field
                    v-model="value"
                    :rules="[(V)=> !!v || 'Valor é um campo obrigatório']"
                    label="Valor"
                    required>
                </v-text-field>

                <v-btn 
                    :disabled="!formValidate"
                    color="primary"
                    class="mt-3"
                    @click="addProduct"
                >Salvar</v-btn>
            </v-form>
            
            <v-alert
                text
                v-if="msgSuccess"
                color="teal"
                icon="mdi-account-check"
            >{{msgSuccess}}</v-alert>

            <v-alert
                text
                v-if="msgSuccess"
                color="teal"
                icon="mdi-account-check"
            >{{msgSuccess}}</v-alert>

            <v-alert
                v-if="msgErro!=''"
                text
                type="error"
                icon="mdi-account-remove"
            >{{ msgErr }}</v-alert>

        </div>
    </div>
</template>

<script>
import ProductService from '../../services/ProductService.js'

export default {
    name:"create-product",
    data(){
        return{
            name: "",
            value: "",
            formValidate: "",
            msgSuccess: "",
            msgErr: ""
        }
    },
    methods:{
        addProduct(){
            var product = {
                nome: this.name,
                valor: this.value
            }

            ProductService.create(product)
            .then(response => {
                this.msgSuccess = response.data;
            })
            .catch(e => {
                this.msgErr = e;
                console.log(e);
            })
        }
    }
}
</script>