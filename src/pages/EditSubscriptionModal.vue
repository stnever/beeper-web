<template>
  <Modal v-if="sub != null" @dismiss="$emit('dismiss')">
    <h3 slot="header">Edit Subscription</h3>

    <div slot="body">
      <form-group label="Name">
        <input type="text" class="form-control" v-model="sub.name">
      </form-group>

      <div class="form-group">
        <label class="control-label">Has ALL of these tags</label>
        <array-input class="form-control"
          v-model="sub.criteria.tags"></array-input>
      </div>

      <div class="form-group">
        <label class="control-label">Has NONE of these tags</label>
        <array-input class="form-control"
          v-model="sub.criteria.withoutTags"></array-input>
      </div>

      <div class="form-group">
        <label class="control-label">Has AT LEAST ONE of these sources</label>
        <array-input class="form-control"
          v-model="sub.criteria.sources"></array-input>
      </div>

      <div class="form-group">
        <label class="control-label">Has NONE of these sources</label>
        <array-input class="form-control"
          v-model="sub.criteria.withoutSources"></array-input>
      </div>

      <form-group>
        <toggle v-model="sub.email">Send email when a new beep matches the criteria</toggle>
      </form-group>

      <form-group>
        <toggle v-model="sub.sms">Send SMS when a new beep matches the criteria</toggle>
      </form-group>

      <form-group>
        <toggle v-model="sub.inbox">Add to my inbox when a new beep matches the criteria</toggle>
      </form-group>
    </div>

    <div slot="footer">
      <button class="btn btn-default" @click="$emit('dismiss')">Cancel</button>
      <button class="btn btn-primary" @click="save()">OK</button>
    </div>
  </Modal>
</template>

<script>
import _ from 'lodash'
import Modal from '../components/Modal.vue'
import ArrayInput from '../components/ArrayInput.vue'

export default {
  components: {Modal, ArrayInput},
  props: ['selectedSub'],
  data() {
    return {showModal: false}
  },
  computed: {
    sub() { return _.cloneDeep(this.selectedSub) }
  },
  methods: {
    save() {
      this.sub.criteria =  _.pickBy(this.sub.criteria,
        (v) => v != null && v.length > 0 )

      this.$emit('ok', this.sub)
    }
  }
}
</script>

<style>
</style>
