<template>
  <div class="row" style="padding-top: 15px;">
    <div class="col-md-3 sidebar">
      <timeline-sidebar :cloud="cloud" :current-query="currentQuery"></timeline-sidebar>
    </div>
    <div class="col-md-9">
      <beeps-list :beeps="beeps"></beeps-list>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {Beep, Tag} from '../models'
import {s2a} from '../utils'
import BeepsList from './BeepsList.vue'
import TimelineSidebar from './TimelineSidebar.vue'

function getParams($route) {
  var q = $route.query
  return _.chain(q).pick('tags', 'sources', 'withoutTags', 'withoutSources')
    .mapValues( s => s2a(s) ).value()
}

export default {
  components: {BeepsList, TimelineSidebar},
  data() {
    return {
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
    fetchData() {
      console.log('Route changed', this.$route.query)

      var ps = getParams(this.$route)
      Beep.findAll(_.assign({limit: 20}, ps)).then( data => {
        this.beeps = data.rows
        return Tag.findAll(ps).then( cloud => {
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
