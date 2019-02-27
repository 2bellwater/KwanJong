<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6>
      <v-text-field
        v-model="userID"
        label="Id"
        required
      ></v-text-field>
      <v-text-field
        v-model="userPW"
        label="Password"
        required
      ></v-text-field>
      <div class="text-xs-center">
        <v-btn @click="creatUser" round color="primary" dark>creat-User</v-btn>
      </div>
      <div class="text-xs-center">
        <v-btn @click="goLogin" round color="primary" dark>BACK-HOME</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'CreatIDForm',
  props: ['join'],   // 상위 템플릿에서 하위 템플릿으로 어떤 값을 전달할지 명시
  data() {
    return {
    };
  },
  methods: {
      goLogin(){
          this.$emit('goLogin');
      },
      creatUser(){
          this.$emit('creatUser', this.userID, this.userPW);
      },
  },
};
</script>