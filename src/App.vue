<template>
  <v-app>
    <v-content>
      <!-- 라우터 -->
      <v-container fluid fill-height aacontainer style="padding: 0">
        <router-view></router-view>
      </v-container>
      <!-- 라우터 -->
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    };
  },
};
</script>
