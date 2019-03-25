<template>
  <div class= "team">
    <h2 class="teamPage">{{ title }}</h2> 
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="team in teams" :key="team.id">
              <router-link :to="{ name: 'comedian', params: {id: team.id }}">
              <v-card class="team-image">
                <v-img :src="team.img" />
                <v-card-title>
                  <span>{{ team.team_name }}</span>
                </v-card-title>
              </v-card>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import axios from  'axios'

export default {
  name: 'Team',
  data() {
    return {
      title: 'Choose your Comedian to enter/login',
      teams: [],
    }
  },
  async created () {
    try {
      const response = await axios.get('https://staging.comedian.maddevs.co/v1/bots')
      this.teams = response.data.map(team => {
        team.img = require('../assets/logo/madLogo.png')
        return team
      })
      console.log(this.teams)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
.team-image {
  width: 220px;
  cursor: pointer; 
}
a {
  display: inline-block;
  text-decoration: none;
}
</style>
