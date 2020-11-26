<template>
  <v-app>
    <v-app-bar v-if="$islogged" app dark v-model="select">
      <v-toolbar-side-icon>
        <v-img width="50px" src="https://logodownload.org/wp-content/uploads/2014/10/senac-logo-4.png" />
      </v-toolbar-side-icon>
      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text to="/createuser">
          <v-icon left dark>mdi-account</v-icon>
          Criar Usuário
        </v-btn>
        
        <v-btn text to="/createproduct">
          <v-icon left dark>mdi-food-fork-drink</v-icon>
          Criar Produto
        </v-btn>

        <v-btn text to="/listproducts">
          <v-icon left dark>mdi-clipboard-list</v-icon>
          Listar Produtos
        </v-btn>

        <v-btn text to="/listproducts">
          <v-icon left dark></v-icon>
        </v-btn>

      </v-toolbar-items>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import AuthService from './services/AuthService.js';

export default {
  name: "App",

  data(){
    return{
    }
  },

  mounted(){
    this.verifySingedIn()
  },
   
  methods:{
    logout() {
      AuthService.logOut();
      this.verifySingedIn();
    },

    verifySingedIn() {
      if(AuthService.isSignedIn())
        this.$islogged = true;
      else
        this.$islogged = false;
    }
    
  },

  components: {

  },

  
  
};
</script>