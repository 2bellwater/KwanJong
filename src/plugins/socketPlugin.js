import Vue from 'vue';
import io from 'socket.io-client';

const socket = io();

var TAG = '[socketPlugin]';

const SocketPlugin = {
  install(vue) {
    vue.mixin({
    });

    vue.prototype.$sendMessage = ($payload) => {
      console.log(TAG+'sendMessage is called');
      socket.emit('chat', {
        msg: $payload.msg,
        name: $payload.name,
      });
    };

    vue.prototype.$creatUser = ($payload) =>{
      console.log(TAG+'creatUser is called');
      socket.emit('crateuser',{
        msg: $payload.msg,
        name: $payload.name,
      });
    };
    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  },
};

Vue.use(SocketPlugin);