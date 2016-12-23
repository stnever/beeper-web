<template>
  <div class="well timeline-sidebar">

    <h2>
      Current Filter

      <button @click="$emit('reload')">
        <span class="fa fa-refresh"></span>
      </button>
    </h2>
    
    <crit-list v-on:removeCrit="removeCrit" :current-query="currentQuery"></crit-list>

    <h2>Tag Cloud</h2>
    <tag-cloud v-on:addCrit="addCrit" :cloud="cloud" :current-query="currentQuery"></tag-cloud>

  </div>
</template>

<script>
import CritList from './CritList.vue'
import TagCloud from './TagCloud.vue'
import omitEmpty from 'omit-empty'

function rebuildQuery(q) {
  q = omitEmpty(_.mapValues(q, v => _.isArray(v) ? v.join(',') : v))
  console.log('rebuilt query', JSON.stringify(q))
  return q
}

export default {
  components: {CritList, TagCloud},
  props: ['cloud', 'currentQuery'],
  methods: {
    addCrit(where, what) {
      console.log('Adding crit', where, what)

      var q = this.currentQuery
      if ( q[where] == null ) q[where] = []
      q[where].push(what)

      this.$router.push({query: rebuildQuery(q)})
    },
    removeCrit(where, what) {
      console.log('Removing crit', where, what)

      var q = this.currentQuery
      _.pull(q[where], what)

      this.$router.push({query: rebuildQuery(q)})
    }
  }
}
</script>

<style>
.timeline-sidebar > h2 {
  font-size: 14px;
  text-transform: uppercase;
  color: #aaa;
  margin: 30px 0 10px 0;
  line-height: 28px;
}

.timeline-sidebar > h2:first-of-type {
  margin-top: 0px;
}

.timeline-sidebar > table { width: 100%; }
.timeline-sidebar > table tr td { padding: 2px 0; }

.timeline-sidebar .tag-name,
.timeline-sidebar .source-name {
  display: inline-block;
  margin: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  padding: 5px 10px;
  font-size: 16px;
  line-height: 18px;
  border-radius: 3px;
  color: white;
  background-color: #6c7a89;
}

.timeline-sidebar .tag-name     { color: cyan; }
.timeline-sidebar .source-name  { color: yellow; }

.timeline-sidebar .actions a {
  cursor: pointer;
  text-decoration: none !important;
  color: #ddd !important;
}

.timeline-sidebar tr:hover .actions a {
  color: #18bc9c !important;
}

.filter-item.source .filter-label { color: yellow; }
.filter-item.tag .filter-label {  color: lightgreen;}
.filter-item.all .filter-label {   color: white;}

.timeline-sidebar h2 button {
  border-width: 0;
  float: right;
  height: 28px;
  width: 28px;
  border-radius: 100px;
  transition: all .3s ease;
  background-color: transparent;
  color: #333;
}

.timeline-sidebar h2 button:hover,
.timeline-sidebar h2 button:active,
.timeline-sidebar h2 button:focus { background-color: #ccc; }
</style>
