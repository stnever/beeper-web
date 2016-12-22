<template>
  <span>
    <input type="text"
      ref="input"
      v-on:change="updateValue($event.target.value)">
  </span>
</template>

<script>
import _ from 'lodash'

function s2a(s, numbersOnly) {
  if ( s == null ) return []
  if ( _.isArray(s) ) return s
  if ( s.trim().length < 1 ) return []
  return s.trim().split(/ +/).map(function(p) {
    p = p.trim()
    return numbersOnly ? +p : p
  })
}

function a2s(a) {
  if ( a == null ) return ''
  if ( !_.isArray(a) ) return a
  return a.join(' ')
}

export default {
  name: 'ArrayInput',
  props: ['value', 'numbersOnly'],
  mounted: function () {
    this.formatValue(this.value)
    this.$refs.input.className = this.$el.className
    this.$el.className = ''
  },
  methods: {
    updateValue: function(value) {
      var result = s2a(value, this.numbersOnly)
      this.$emit('input', result)
      this.formatValue(result)
    },
    formatValue: function(a) {
      this.$refs.input.value = a2s(a)
    }
  }
}
</script>
