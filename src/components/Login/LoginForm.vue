<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6>
      <v-text-field
        v-model="userName"
        label="대화명"
        required
        v-on:keyup.enter="joinSubmit"
      ></v-text-field>
      <div class="text-xs-center">
        <v-btn @click="joinSubmit" round color="primary" dark>JOIN</v-btn>
      </div>
      <div class="text-xs-center">
        <v-btn @click="goCreatID" round color="primary" dark>goCreatID</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'LoginForm',
  props: ['join'],   // 상위 템플릿에서 하위 템플릿으로 어떤 값을 전달할지 명시
  data() {
    return {
      userName: '',
    };
  },
  methods: {
    joinSubmit() {
      this.$emit('joinSubmit', this.userName); // 상위의 컴포넌트인 Login.vue로 joinSubmit 이벤트를 보낸다.
    },
    goCreatID(){
      this.$emit('goCreatID', this.userName);
    },
  },
};
</script>