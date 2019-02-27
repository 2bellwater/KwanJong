<template>
  <div class="inner-wrap" fluid fill-height>
    <CreatIDform-component v-on:goLogin="goLogin" v-on:creatUser="creatUser"></CreatIDform-component>
  </div>

</template>
<script>
import CreatIDForm from '@/components/CreatID/CreatIDForm.vue';
//import Constant from '@/Constant';

export default {
  name: 'CreatID',
  data() {
    return {
        datas:[],
    };
  },
  components: {
    'CreatIDform-component': CreatIDForm,
  },
  created() {
    const $ths = this;
    this.$socket.on('creatuser', (data) => {
      $ths.datas.push(data);
    });
  },
  methods: {
    goLogin(){
      this.$router.push(`/`);
    },
    creatUser(userid, userpw){
        this.$creatUser({
            name: this.$route.params.username,
            userid,
            userpw,
        });
    },
  },
};
</script>