<template lang="html">

  <sui-form @submit="checkForm"
  action=""
  method="post"
  class="form">


<sui-grid>
    <sui-grid-row>
      <sui-grid-column :width="8">
        <sui-form-field class="form__field">
          <label class="form__label">Project Name</label>
          <input id="id" name="name" v-model="name"
        type="text">
      </sui-form-field>
      </sui-grid-column>
      <sui-grid-column :width="8">
        <sui-form-field class="form__field">
          <label  class="form__label">Password</label>
          <input id="password" name="password" v-model="password"
          type="password">
        </sui-form-field>
      </sui-grid-column>
    </sui-grid-row>

    <sui-grid-row>
      <sui-grid-column :width="8">
        <sui-form-field class="form__field">
          <label class="form__label">Language</label>
          <select
            id="language"
            v-model="language"
            name="language"
          >
          <option value="en_US">English</option>
          <option value="ru">Russian</option>
        </select>      
       </sui-form-field>
      </sui-grid-column>
      <sui-grid-column :width="8">
        <sui-form-field class="form__field">
          <label class="form__label">Notifier Interval</label>
          <select
            id="notifier_interval"
            v-model="notifier_interval"
            name="notifier_interval"
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>      
      </sui-form-field>
     </sui-grid-column>
    </sui-grid-row>
     <sui-grid-row>
      <sui-grid-column :width="8">
        <sui-form-field class="form__field">
      <label class="form__label">Reminder Time</label>
       <select
        id="reminder_time"
        v-model="reminder_time"
        name="reminder_time"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>      
    </sui-form-field>
      </sui-grid-column>
      <sui-grid-column :width="8">
        <sui-form-field class="form__field">
      <label class="form__label">Notifiction Attempts</label>
       <select
        id="reminder_repeat_max "
        v-model="reminder_repeat_max"
        name="reminder_repeat_max "
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>      
    </sui-form-field>
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>  
    <sui-button type="submit" class="form__field">Save</sui-button>
  </sui-form>
</template>

<script>
export default {
  data () {
    return {
      errors: [],
      name: 'Mad Devs',
      password: null,
      language:'en_US',
      notifier_interval:'2',
      reminder_time:'2',
      reminder_repeat_max:'1',
      }
    },
  methods: {
    checkForm: function (e) {
      if (this.name && this.password) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Требуется указать название.');
      }
      if (!this.password) {
        this.errors.push('Требуется указать пароль.');
      }

      e.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
/*
.form {
  display:flex;
  width: 100%;
  flex-direction:column ;
  &__item {
    display:flex;
    width: 30%;
    justify-content: space-between;
  } 
  &__field {
    display: block;
     width: 30%;
  }
}
.form__field.field {
    width: 30%;
    margin: 0;
  }
  */
</style>


