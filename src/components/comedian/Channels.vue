<template>
<div>
  <v-data-table
  :headers="headers"
    :items="channels"
    class="elevation-1"
  >
   <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.id }}</td>
      <td class="text-xs-left">{{ props.item.team_id }}</td>
      <td class="text-xs-left">{{ props.item.channel_name }}</td>
      <td class="text-xs-left">{{ props.item.channel_id }}</td>
      <td class="text-xs-left">{{ props.item.channel_standup_time }}</td>
      <td class="text-xs-left">
      <router-link :to="{ name: 'edit', params: { id: props.item.id } }" target="_blank"><i class="material-icons option-btn">edit</i> </router-link>   <i class="material-icons option-btn" @click="deleteChannel(props.item.id)">delete</i></td>
    </template>   
  </v-data-table>
</div>  
</template>

<script>
import axios from  'axios'
  export default {   
    data () {
      return {
        errors:[],
         headers: [
          { 
            text:'Channels',
            align: 'center'
          },
          { text: 'ID', value: 'id' },
          { text: 'Team_id', value: 'team_id' },
          { text: 'Channel_name', value: 'channel_name' },
          { text: 'Channel_id', value: 'channel_id' },
          { text: 'Channel_standup_time', value: 'channel_standup_time' },
          { text: 'Options', value: '' }
        ],
        channels:[],
      }
    },
    methods: {
      deleteChannel(id) {
        const url='https://staging.comedian.maddevs.co/v1/channels/'+id;
        axios.delete(url)
        .then((response)=>{
          console.log(response);
          alert('Удаление прошло успешно')
          location.reload();
        })
         .catch((error) =>{
          console.log(error);
        });
      }
    },
    beforeCreate() {
     axios.get('https://staging.comedian.maddevs.co/v1/channels').then((response) => {
      this.channels = response.data
    })
      .catch((e) => {
        this.errors.push(e);
      })
    }
  }
</script>
<style lang="scss" scoped>
.option-btn {
  color:grey;
  font-size: 18px;
  &:hover {
    color:#42b983;
    cursor: pointer;
  }
}
</style>
