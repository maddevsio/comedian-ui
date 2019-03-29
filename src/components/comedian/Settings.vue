<template lang="html">
  <v-card class="mt-3 mx-auto" max-width="900">
  <v-form method="post">
    <v-container>
      <v-layout>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.team_name"
            label="Team Name"
            required
          />
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="newPassword"
            label="Password"
            type="password"
            required
          />
        </v-flex>

        <v-flex
          xs12
          md4
        >
        <v-select
      v-model="bot.language"
      :items="languages"
      label="Language"
      data-vv-name="select"
      required
    ></v-select>
      </v-flex>      
      </v-layout>
      <v-layout>
      <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.notifier_interval"
            label="Notifier Interval"
            type="number"
            required
          />
        </v-flex>
         <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.reminder_time"
            label="Reminder Time"
            type="number"
            required
          />
        </v-flex>
         <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.reminder_repeats_max"
            label="Reminder Repeats"
            type="number"
            required
          />
        </v-flex>
        </v-layout>
    </v-container>
    <v-btn @click='Save'
    >
     Save
    </v-btn>
  </v-form>
  </v-card>
</template>

<script>
import transform from "../../helpers/transform";
import { mapState } from "vuex";

export default {
  computed: mapState({
    bot: state => state.bots.bot || {}
  }),
  data() {
    return {
      languages: ["ru_RU", "en_EN"],
      newPassword: ""
    };
  },
  methods: {
    async Save() {
      const url = `bots/${this.$route.params.id}`;
      this.bot.password = this.newPassword;
      const transformedValues = transform(this.bot, {
        notifier_interval: "int",
        reminder_repeats_max: "int",
        reminder_time: "int"
      });

      await this.$store.dispatch("UPDATE_BOT", {
        url,
        data: transformedValues
      });
    }
  },
  beforeCreate() {
    const url = `bots/${this.$route.params.id}`;
    this.$store.dispatch("GET_BOT", url);
  }
};
</script>

<style lang="scss" scoped>
</style>
