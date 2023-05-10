<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <h2 class="text-h4 mb-7">Messages</h2>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="text-right">
        <nav>
          <v-btn to="/messages/compose">Compose</v-btn>
        </nav>
      </v-col>
    </v-row>
    <v-row>
      <nav class="folders">
        <RouterLink to="/messages/inbox"> Messages <span>0</span> </RouterLink>
        <RouterLink to="/messages/sent"> Sent <span>0</span> </RouterLink>
        <RouterLink to="/messages/deleted"> Deleted <span>0</span> </RouterLink>
        <RouterLink to="/messages/drafts"> Draft <span>0</span> </RouterLink>
      </nav>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <table class="messages" width="100%">
          <tbody v-if="messages.length">
            <tr v-for="(message, index) in messages" :key="index">
              <td>
                <input type="checkbox" />
              </td>
              <td>
                {{ message.from }}
              </td>
              <td>
                <strong>{{ message.subject }}</strong> - {{ message.body | truncate(100) }}
              </td>
              <td>
                {{ message.date | shortDate }}
              </td>
              <td>
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-trash-can"></i>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5">There are no messages.</td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: "Yukon Student Financial Portal - Messages"
    };
  },
  computed: {
    messages() {
      return [];
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
nav.folders {
  width: 100%;
  display: flex;
  border-top: solid 1px #eee;

  > a {
    width: 100%;
    padding: 1rem;
    border-right: solid 1px #eee;
    text-decoration: none;

    line-height: 1;

    color: #666;

    border-bottom: solid 4px #ccc;

    > span {
      background: #ccc;
      padding: 0.25rem 0.5rem;
      font-size: 0.6rem;
      margin-left: 1rem;
    }

    &.nuxt-link-exact-active {
      background: #008392;
      color: #fff;
      border-bottom: solid 4px #008392;
      > span {
        background: #fff;
        color: #000;
      }
    }
  }
}
</style>
