<template>
  <nav>
    <v-main>
      <v-app-bar color="primary" elevation="3">
        <v-toolbar-title class="text-uppercase">
          <v-layout align-center>
            <v-flex>
              <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
            </v-flex>
            <v-flex>
              <span class="font-weight-light white--text">
                <strong>
                  <span style="font-size: 30px;">B</span>ookCase
                </strong>
              </span>
            </v-flex>
          </v-layout>
        </v-toolbar-title>
        <v-spacer />
        <v-menu bottom left offset-y v-if="logged">
          <template v-slot:activator="{on, attrs}">
            <v-btn icon v-bind="attrs" v-on="on" class="mr-10 white--text">
              <v-icon>mdi-chevron-down</v-icon>Menu
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
              <v-list-item-icon>
                <v-icon color="primary">{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text--darken-1">{{link.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-if="logged" small color="error" @click="logout">
          <span>Logout</span>
        </v-btn>
        <v-btn v-if="!logged" small color="primary">
          <span>Sign Up</span>
        </v-btn>
      </v-app-bar>
    </v-main>
    <v-navigation-drawer v-if="logged" app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="../assets/logo.png" alt="Image 1" />
          </v-avatar>
          <p class="white--text text-center subheading mt-2" style="font-size: 20px">
            {{ user.name }}
          </p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 text-center">
          <v-btn small class="caption" color="error">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    links: [
      { icon: 'mdi-book', text: 'Books', route: '/book' },
      { icon: 'mdi-shape', text: 'Categories', route: '/category' },
      { icon: 'mdi-card-account-details', text: 'Borrowers', route: '/borrower' },
      { icon: 'mdi-monitor-dashboard', text: 'Loan', route: '/loan' }
    ],
    drawer: false,
    snackbar: true
  }),
  computed: {
    logged () {
      return this.$store.state.loggedIn
    },
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.$store.dispatch('getAuth')
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
