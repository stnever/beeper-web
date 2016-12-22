<template>
  <div class="form-group">
    <label class="control-label" v-if="label != null">{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['label']
}
</script>

<style>
</style>
