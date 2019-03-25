<template>
<v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-form v-on:submit.prevent="onSubmit">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    target="_blank"
                    slot="activator"
                  >                  
                  </v-btn>                 
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary">Login</v-btn>
              </v-card-actions>
               </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Checkin',
methods: {
  clear () {
    this.$refs.login.reset()
  },
  onSubmit: async function () {
    console.log('?>>>>>>>>>>>>>>>>>>>>>>>.')
    try {
      const resp = await Axios.post('https://staging.comedian.maddevs.co/login', {
        login: this.teamname,
        password: this.password
      })
      console.log('Ответ сервера:', res)
      this.$router.replace(this.$route.query.redirect || '/tamam')
    } catch (err) {
      console.log('err', err)
    }
  },
}

  //  computed: mapState({
  //       checkin: state => state.login.checkin
  //   }),
    
  // beforeCreate() {
  //   this.$store.dispatch('CREATE_CHECKIN')
  //   }
}
</script>