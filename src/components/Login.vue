<template>
<v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-form v-on:submit.prevent="submit">
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
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="teamname"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
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

export default {
  name: 'Login',
  data() {
    return {
        teamname: '',
        password: '',
        error: ''
    }
  },

  methods: {
  clear () {
    this.$refs.login.reset()
  },
  submit() {
      const payload = {
        teamname: this.teamname,
        password: this.password
      }

      this.$store
        .dispatch('LOGIN', payload)
        .then(() => {
          this.$router.push({ path: '/home/teams/:id'})
        })
        .catch(() => {
          this.error = 'User not authenticated'
        })
    }
  } 
}
</script>