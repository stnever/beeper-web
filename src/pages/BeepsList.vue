<template>
  <div>
    <Modal v-if="showModal" @dismiss="showModal = false" :omit-footer="true" :omit-header="true" css-class="modal-lg">
      <beep-details :beep="selectedBeep" slot="body"></beep-details>
    </Modal>

    <div v-for="day in days">
      <div class="day-header text-center text-muted">
        <span class="fa fa-level-down fa-flip-horizontal"></span>
        {{ day.timestamp | fmtDay }}
        <span class="fa fa-level-down"></span>
      </div>

      <div class="list-group beeps-list">

        <button type="button" v-on:click.prevent="openDetailsModal(b)" class="list-group-item" v-for="b in day.items">
          <div class="media">
            <div class="media-body">
              <h4 class="list-group-item-heading">
                <router-link :to="`/sources/${b.source}`">{{b.source}}</router-link>

                <span class="beep-timestamp">
                {{ b.timestamp | fmtTime }}
                </span>

                <span class="beep-tags">
                  <span v-for="t in b.tags">#{{t}} </span>
                </span>

              </h4>
              <p class="list-group-item-text lead">
                {{b.contents}}
              </p>

            </div>

            <div class="media-right media-middle">
              <a class="beep-details-link"
                v-on:click.prevent="openDetailsModal(b)">
                <span class="fa fa-lg fa-chevron-right"></span>
              </a>
            </div>
          </div>
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import {groupByDay} from '../utils'
import moment from 'moment'
import BeepDetails from './BeepDetails.vue'

export default {
  components: {BeepDetails},
  props: ['beeps'],
  data() {
    return {days: [], showModal: false, selectedBeep: null}
  },
  computed: {
    days() {
      console.log('prop beeps', this.beeps)
      return groupByDay(this.beeps)
      // console.log('grouped days', this.days)
    }
  },
  filters: {
    fmtDay  : (dt) => moment(dt).format('MMMM DD, YYYY'),
    fmtTime : (dt) => moment(dt).format('HH:mm:ss')
  },
  methods: {
    openDetailsModal(beep) {
      this.selectedBeep = beep
      this.showModal = true
    }
  }
}
</script>

<style>
.day-header { line-height: 32px; }

.beeps-list .list-group-item {
  padding: 18px 10px;
}

.beeps-list .beep-timestamp {
  color: #ccc;
  font-size: 14px;
  text-transform: uppercase;
}

.beeps-list .beep-timestamp:before {
  content: '\00b7';
  margin: 0 10px;
}

.beeps-list h4.list-group-item-heading a { font-weight: bold; }

.beeps-list .beep-tags {
  color: #ccc;
  font-size: 14px;
}

.beeps-list .beep-tags:before {
  content: '\00b7';
  margin: 0 10px;
}

.beeps-list span + span { margin-left: 5px; }

.beeps-list .beep-details-link {
  display: inline-block;
  position: absolute;
  top: calc(50% - 26px);
  right: 10px;
  width: 32px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  cursor: pointer;
  border-radius: 2px;
}

.beeps-list .beep-details-link:hover {
  background-color: #eee;
}
</style>
