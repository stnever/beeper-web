<template>
  <div v-if="critItems.length < 1">(Empty)</div>
  <table v-else>
    <colgroup>
      <col>
      <col width="50">
    </colgroup>
    <tr v-for="i in critItems">
      <td>
        <span v-if="i.type == 'tags'"                class="tag-name">{{i.name}}</span>
        <span v-else-if="i.type == 'withoutTags'"    class="tag-name">not: {{i.name}}</span>
        <span v-else-if="i.type == 'sources'"        class="source-name">{{i.name}}</span>
        <span v-else-if="i.type == 'withoutSources'" class="source-name">not: {{i.name}}</span>
      </td>
      <td class="text-right actions">
        <a @click="$emit('removeCrit', i.type, i.name)"
          title="Remove this criteria">
          <span class="fa fa-fw fa-times"></span>
        </a>
      </td>
    </tr>
  </table>
</template>

<script>
import _ from 'lodash'
// import {s2a} from '../utils'
// import omitEmpty from 'omit-empty'

function breakQuery(q) {
  return _.chain([
    _.map(q.sources, t => ({type: 'sources', name: t})),
    _.map(q.withoutSources, t => ({type: 'withoutSources', name: t})),
    _.map(q.tags, t => ({type: 'tags', name: t})),
    _.map(q.withoutTags, t => ({type: 'withoutTags', name: t}))
  ]).flatten().compact().value()
}

export default {
  props: ['currentQuery'],
  computed: {
    critItems() { var r = breakQuery(this.currentQuery) ; console.log(r) ; return r }
  }
}
</script>

<style>
</style>
