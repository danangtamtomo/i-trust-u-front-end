<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in menuItems"
          :key="i"
          value="true"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-xs-and-up"></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link :to="homeOrDashboard" tag="span" style="cursor: pointer">{{ title }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        class="hidden-sm-and-down"
      >
        <v-btn flat
        v-for="(item, i) in menuItems"
        :key="i"
        :to="item.link">{{ item.title }}
        </v-btn>
        <v-btn flat v-if="!isLoggedIn" to="/login">LogIn</v-btn>
        <v-btn flat v-if="isLoggedIn" @click="onLogout">LogOut</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer :fixed="fixed">
      <span>&copy; 2017 : {{ title }} - {{ isLoggedIn }} </span>
    </v-footer>
  </v-app>
</template>

<script>
import { isLoggedIn, getIdToken } from './utils/auth'

let defaultMenuItems = [
  { icon: 'bubble_chart', title: 'Reviews', link: '/reviews' },
  { icon: 'bubble_chart', title: 'Perusahaan', link: '/insurance-company' }
]

  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: true,
        menuItems: defaultMenuItems,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Si Slamet'
      }
    },
    mounted() {
      isLoggedIn()
    },
    computed: {
      isLoggedIn() {
        return this.logInChecker()
      },
      userDetail() {
        let userDetail = null
        if (this.logInChecker()) {
          userDetail = this.$store.getters.userDetail
        }
        return userDetail
      },
      homeOrDashboard() {
        console.log("jalan kan ?");
        this.reArrangeMenus()
        if (this.logInChecker()) {
          // set home button to /dashboard when already logIn
          this.$store.commit('setHomeButtonToDashBoard', '/dashboard')

          // re arrange the menu

        } else {
          this.$store.commit('setHomeButtonToDashBoard', '/')
        }

        return this.$store.getters.homeOrDashboardUrl
      }
    },
    methods: {
      logInChecker() {
        return this.$store.getters.token !== null && this.$store.getters.token !== undefined
      },
      onLogout() {
        this.$store.dispatch('signOut').then(() => {

          this.$router.push('/')
        })
      },
      goToHomepage() {
        console.log('clicked goToHomepage');
      },
      reArrangeMenus() {
        if (this.logInChecker()) {
          switch (this.$store.getters.userDetail.roles[0].name) {
            case "admin":
              this.menuItems = [
                { icon: 'bubble_chart', title: 'Reviews', link: '/reviews' },
                { icon: 'bubble_chart', title: 'Perusahaan', link: '/insurance-company' }
              ]
              break;
            case "paramedic":
            this.menuItems = [
                { icon: 'bubble_chart', title: 'Reviews', link: '/reviews' },
                { icon: 'bubble_chart', title: 'Perusahaan', link: '/insurance-company' }
              ]
              break;
            default:
              this.menuItems = defaultMenuItems
          }
        } else {
          // set menuItems back to default if not authecticated
          this.menuItems = defaultMenuItems
        }

      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
