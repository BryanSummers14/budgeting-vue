<template>
  <v-app>
    <v-navigation-drawer
      v-if="authState"
      persistent
      :mini-variant="miniVariant"
      clipped
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.route"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-side-icon v-if="authState" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!authState" flat to="/login">
        <v-icon>person</v-icon>
        Login
      </v-btn>
      <v-menu v-if="authState" open-on-hover bottom offset-y>
      <v-btn slot="activator" flat>
        <v-icon>person</v-icon>
          {{ user }}
      </v-btn>
      <v-list>
        <v-list-tile @click="logout">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
      <router-view/>
      </v-slide-y-transition>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          route: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Dashboard',
          route: '/dashboard'
        },
        {
          icon: 'bubble_chart',
          title: 'Add New Item',
          route: '/add-item'
        },
        {
          icon: 'bubble_chart',
          title: 'Set Monthly Budget',
          route: '/set-budget'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Expense Tracker',
      name: 'App'
    }
  },
  computed: {
    ...mapGetters([
      'authState',
      'user'
    ])
  },
  methods: {
    logout () {
      this.$http.post('http://localhost:3000/api/auth/logout', {}, { headers: { 'Authorization': this.$store.state.authToken } })
        .then(_res => {
          if (_res.status === 201) {
            this.$store.dispatch('logout')
              .then(_ => { this.$router.push({ path: '/' }) })
          }
        })
    }
  }
}
</script>

<style>
@media (max-width: 1263px) {
  aside.navigation-drawer {
    max-height: none !important;
    margin-top: 0 !important;
  }
}
</style>