<template>
  <div class="inner-wrap" fluid fill-height inner-wrap style="height: 100%">
    <section class='menu'>
      <Player class='player'/>
    </section>
    <section class='contents'>
      <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
      <Message-From v-on:submitMessage="sendMessage" class="msg-form" ></Message-From>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MessageList from '@/components/Chat/MessageList.vue';
import MessageForm from '@/components/Chat/MessageForm.vue';
import Player from '@/components/Chat/Player.vue';
import Constant from '@/Constant';

export default {
  name: 'ChatRoom',
  data() {
    return {
      datas: [],
    };
  },
  components: {
    'Player' : Player,
    'Message-List': MessageList,
    'Message-From': MessageForm,
  },
  computed: {
    ...mapState({
      'msgDatas': state => state.socket.msgDatas,
    }),
  },
  created() {
    const $ths = this;
    this.$socket.on('chat', (data) => {
      this.pushMsgData(data);
      $ths.datas.push(data);
    });
  },
  methods: {
    ...mapMutations({
      'pushMsgData': Constant.PUSH_MSG_DATA,
    }),
    sendMessage(msg) {
      this.pushMsgData({
        from: {
          name: '나',
        },
        msg,
      });
      this.$sendMessage({
        name: this.$route.params.username,
        msg,
      });
    },
  },
};
</script>

<style>
.menu {
  position: relative;
  left: 0;
  top:0;
  bottom: 0;
  max-width: 100%;
  padding-left: 15%;
  padding-right: 15%;
  height: auto;
}
.contents {
  position: relative;
  left: 0;
  max-width: 100%;
  height: 600px; 
}
.player {
  position: relative;
  left: 0;
  top:0;
  bottom: 0;
  max-width: 100%;
  height: auto;
}
.msg-list {
  position: absolute;
  bottom: 60px;
  top: 0;
  left: 0;
  right: 0;
  overflow-x: scroll;
}
.msg-form {
  bottom: -30px; 
  position: fixed;
  left: 0px;
  right: 0px;
}
</style>