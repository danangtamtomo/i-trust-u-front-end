<template lang="html">
  <div>

       <v-layout row v-if="error">
          <v-flex xs12>
             <v-alert warning value="true" dismissible>
                {{ error.message }}
              </v-alert>
            </v-flex>
          </v-layout>
         <v-card>
           <v-card-title primary-title>
             <img src="/public/logo-si-slamet.png" alt="logo si slamet" width="100px">
                <h3 class="headline mb-0">Masuk Si Slamet</h3>
            </v-card-title>
           <v-card-text>
             <v-container grid-list-md fluid>
               <form @submit.prevent="signIn">
                 <v-layout row wrap>
                   <v-flex xs12>
                     <v-text-field
                       name="email"
                       label="Email"
                       id="email"
                       v-model="email"
                       type="email"
                       required></v-text-field>
                   </v-flex>
                 </v-layout>
                 <v-layout row>
                   <v-flex xs12>
                     <v-text-field
                       name="password"
                       label="Password"
                       id="password"
                       v-model="password"
                       type="password"
                       required></v-text-field>
                   </v-flex>
                 </v-layout>
                 <v-layout row>
                   <v-flex xs12>
                     <v-btn type="submit" :disabled="loading" :loading="loading" primary>
                       Login
                        <span slot="loader" class="custom-loader">
                         <v-icon light>cached</v-icon>
                        </span>
                     </v-btn>
                   </v-flex>
                 </v-layout>
               </form>
             </v-container>
           </v-card-text>
         </v-card>
 </div>

</template>

<script>
import {
  isLoggedIn
} from '../../utils/auth'


export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  mounted() {
    // check is need to login again ?
    this.isNeedToSignIn()
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    error() {
      console.log('why : ', this.$store.getters.error);
      return this.$store.getters.error
    }
  },
  methods: {
    signIn() {
      let self = this
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      }).then(() => {
        // oke ? redirect it to dashboard page
        self.$router.push('/dashboard')
      }).catch(err => {
        console.log('error when sign in : ', err);
      })
    },
    isNeedToSignIn() {
      // is this user need to re-login ?
      if (isLoggedIn()) {
        this.$router.push({
          path: '/dashboard'
        })
      }
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
