<template>
  <div>
    <v-layout>
      <v-alert v-model="alert" dismissible type="success">Successfully saved</v-alert>
    </v-layout>
    <v-layout>
      <v-alert v-model="errorStatus" dismissible type="error">
        <span class>{{errorText}}</span>
      </v-alert>
    </v-layout>
  </div>
</template>
