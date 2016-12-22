<template>
  <table>
    <colgroup>
      <col>
      <col width="50">
      <col width="50">
    </colgroup>
    <tr v-for="t in cloud">
      <td><span class="tag-name">{{t.tag}}</span></td>
      <td class="text-right">{{t.count}}</td>
      <td class="text-right actions">
        <a @click="$emit('addCrit', 'tags', t.tag)"
          title="Show ONLY beeps with this tag">
          <span class="fa fa-fw fa-plus"></span>
        </a>
        <a @click="$emit('addCrit', 'withoutTags', t.tag)"
          title="Do NOT show beeps with this tag">
          <span class="fa fa-fw fa-minus"></span>
        </a>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['cloud']
}
</script>
