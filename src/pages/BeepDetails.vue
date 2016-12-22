<template>
  <div>
    <ul class="nav nav-tabs" style="margin-bottom: 15px;">
      <li :class="tab == 'email'? 'active' : ''"><a @click="tab = 'email'">Email</a></li>
      <li :class="tab == 'beep' ? 'active' : ''"><a @click="tab = 'beep'">Beep</a></li>
      <li :class="tab == 'json' ? 'active' : ''"><a @click="tab = 'json'">JSON</a></li>
    </ul>

    <div v-if="tab == 'beep'">
      <label>ID:</label>
      <p>{{beep._id}}</p>

      <label>Received:</label>
      <p>{{beep.timestamp | moment}}</p>

      <label>Contents</label>
      <p>{{beep.contents}}</p>

      <label>Tags</label>
      <p>
        <span v-for="t in beep.tags">#{{t}} </span>
      </p>
    </div>

    <div v-else-if="tab == 'email'"
      style="max-height: calc(100vh - 300px); overflow-y: auto;">
      <div class="well well-sm">
        <h4>{{beep.data.emailSubject || '(no subject)'}}</h4>
        <h5>from: {{beep.data.emailFrom}}</h5>
      </div>

      <div v-html="beep.data.emailHtml"></div>
    </div>

    <div v-else-if="tab == 'json'">
      <pre>{{beep | prettyJson}}</pre>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['beep'],
  data() { return {tab: 'email'} },
  filters: {
    moment: function(dt) { return dt == null ? '-' : moment(dt).format('YYYY-MM-DD HH:mm:ss ZZ') },
    prettyJson: function(x) { return JSON.stringify(x, null, ' ')}
  }
}
</script>

<style>
ul.nav.nav-tabs li a { cursor: pointer; }
</style>
