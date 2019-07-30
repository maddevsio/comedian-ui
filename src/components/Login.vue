<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-form >
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="text-md-center text-xs-center" style="width:100%">Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <v-btn icon large target="_blank" slot="activator"></v-btn>
                  </v-tooltip>
                </v-toolbar>              
                <v-card-text>
                  <v-card-actions style="display: block;">
                    <v-spacer></v-spacer>
                 <a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=579011601457.710538164775"><img alt='Sign in with Slack' height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
                    <!-- <v-btn type="submit" color="primary">Sign in with slack</v-btn> -->
                  </v-card-actions>
                </v-card-text>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
