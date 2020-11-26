<template>
  <v-layout flex align-center justify-center fill-height>
    <v-flex xs12 sm4 align-center justify-center>
      <v-card>
        <v-card-text class="pt-2">
          <v-form v-model="formValido">
            <v-text-field
              label="E-mail"
              v-model="email"
              required
            ></v-text-field>
            <v-text-field
              label="Senha"
              v-model="senha"
              min="8"
              counter
              type="password"
              required
            ></v-text-field>

            <v-btn
              :disabled="!formValido"
              @click="login"
              color="primary"
              >Login</v-btn
            >
          </v-form>
        </v-card-text>
        <v-alert 
        v-if="msgErro != ''" 
        text 
        prominent 
        type="error" 
        icon="mdi-account-remove">
        {{msgErro}}
        </v-alert>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>

import AuthService from "../services/AuthService.js"

export default {
    data(){
        return{
            email:"",
            senha:"",
            msgErro:"",
            formValido:""
        }
    },
    methods:{
        login(){
            this.msgErro = "";

            let dadosUsuario = {
                email: this.email,
                senha: this.senha
            }
            
            AuthService.signIn(dadosUsuario)
            .then(response=> {
                AuthService.setUserData(response.data);
            })
            .catch(e => {
                this.msgErro = e;
                console.log(e);
            })
        }
    }
}
</script>