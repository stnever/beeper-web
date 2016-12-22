<template>
  <navbar placement="top" type="default">
    <router-link slot="brand" class="navbar-brand" to="/">
      Beeper
    </router-link>

    <ul class="nav navbar-nav">
      <li>
        <router-link to="/sources">Sources</router-link>
      </li>

      <dropdown text="Timeline">
        <li v-for="s in sources" :key="s.name">
          <router-link
            :to="{path: '/timeline', query: {sources: s.name}}">
            {{s.name}}
          </router-link>
        </li>

        <li class="divider"></li>

        <li>
          <router-link to="/timeline">All</router-link>
        </li>
      </dropdown>

      <li>
        <router-link to="/accounts">Accounts</router-link>
      </li>
    </ul>

    <ul slot="right" class="nav navbar-nav" style="margin-right: 0px;">
      <li><a @click="doLogout">Logout</a></li>
    </ul>
  </navbar>
</template>

<script>
import {dropdown, navbar} from 'vue-strap'
import {Source} from './models'

export default {
  components: {dropdown, navbar},
  data() {
    return {sources: []}
  },
  created() {
    Source.findAll().then( (rows) => {
      this.sources = rows
    })
  },
  methods: {
    doLogout() {
      localStorage.removeItem('beeper_web_token')
      window.location.href = '/login.html'
    }
  }
}
</script>
