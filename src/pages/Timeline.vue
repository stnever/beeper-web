<template>
  <div class="row" style="padding-top: 15px;">
    <div class="col-md-3 sidebar">
      <timeline-sidebar
        v-on:reload="fetchData"
        :cloud="cloud"
        :current-query="currentQuery"></timeline-sidebar>
    </div>
    <div class="col-md-9">
      <beeps-list :beeps="beeps"></beeps-list>
      <pager :total-count="count" :offset="currentQuery.offset"
        @paginate="fetchPage($event)"></pager>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import {Beep, Tag} from '../models'
import {s2a, rebuildQuery} from '../utils'
import BeepsList from './BeepsList.vue'
import TimelineSidebar from './TimelineSidebar.vue'

function getParams($route) {
  var q = $route.query
  var ps = _.chain(q)
    .pick('tags', 'sources', 'withoutTags', 'withoutSources')
    .mapValues( s => s2a(s) ).value()
  ps.offset = q.offset ? +q.offset : 0
  return ps
}

export default {
  components: {BeepsList, TimelineSidebar},
  data() {
    return {
      count: 0,
      beeps: [],
      cloud: {}
    }
  },
  computed: {
    currentQuery() {
      return getParams(this.$route)
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchPage(event) {
      // Trocar a querystring do $router causa um
      // reload da página
      console.log('Fetching page', event)
      var q = this.currentQuery
      q.offset = event.offset
      this.$router.push({query: rebuildQuery(q)})
    },
    fetchData() {
      console.log('Route changed', this.$route.query)

      var ps = getParams(this.$route)
      Beep.findAll(_.assign({limit: 20}, ps)).then( data => {
        this.beeps = data.rows
        this.count = data.count

        // Para a busca da tag-cloud, considera apenas
        // os últimos 30d.
        var tagCloudPs = _.assign(ps, {
          fromDate: moment().add(-30, 'd').format('YYYY-MM-DD')
        })

        return Tag.findAll(tagCloudPs).then( cloud => {
          this.cloud = cloud
        })
      })
    }
  }
}
</script>

<style>
.sidebar {
  /*background-color: #ccc;*/
}
</style>
