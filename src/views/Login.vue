<template>
  <div class="inner-wrap" fluid fill-height>
    <Loginform-component v-on:joinSubmit="joinSubmit"></Loginform-component>
  </div>
</template>
<script src=“https://unpkg.com/vue@2.3.2”></script>
<script>
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: 'Login',
  data() {
    return {
    };
  },
  components: {
    'Loginform-component': LoginForm,
  },
  created() {
  },
  methods: {
    joinSubmit(userName) {
      this.$router.push(`/char-room/${userName}`);
    },
  },
};
</script>