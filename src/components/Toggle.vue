<template>
  <a class="toggle" @click="toggleValue">
    <span :class="`fa fa-lg ${icon}`"></span>
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: ['value'],
  data() { return {copied: null} },
  computed: {
    icon() { return this.copied ? 'fa-check-square' : 'fa-square-o' }
  },
  mounted() { this.copied = this.value  }  ,
  methods: {
    toggleValue() {
      this.copied = !this.copied
      this.$emit('input', this.copied)
    }
  }
}
</script>

<style>
a.toggle, a.toggle:hover, a.toggle:active { text-decoration: none; }
</style>
