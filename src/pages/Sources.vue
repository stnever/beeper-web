<template>
  <div style="padding-top: 15px;">

    <div class="alert alert-info" v-if="sources.length == 0">
      <h3>There are no sources in this Beeper yet.</h3>

      You can create a source using the button above. Alternatively,
      you can create a source automatically by posting a beep to it:

      <ul>
        <li>using the <code>beeper</code> utility</li>
        <li>using the <code>beeper-client</code> module in your code.</li>
      </ul>
    </div>

    <div class="col-md-6 col-md-offset-3">
      <router-link :to='`/timeline?sources=${s.name}`' v-for="s in sources" class="source-in-list btn">
        {{s.name}}
      </router-link>
    </div>

  </div>
</template>

<script>
import {Source} from '../models'

export default {
  data() {
    return {sources: []}
  },
  created() {
    Source.findAll().then( (rows) => {
      this.sources = rows
    })
  }
}
</script>

<style>
.source-in-list {
  min-width: 162px;
  background-color: #EE0C5B;
  color: white;
  font-size: 14pt;
  font-weight: bold;
  padding: 8px;
  border-radius: 2px;
  line-height: 70px;
  text-align: center;
  margin: 0 15px 15px 0;
}

.source-in-list:hover {
  background-color: #D71458;
  color: white;
}

</style>
