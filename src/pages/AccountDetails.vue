<template>
  <div class="col-md-6 col-md-offset-3 account-details">

    <toaster ref="toaster"></toaster>

    <div class="row">
      <div class="form-group col-md-6">
        <label class="control-label">Account code:</label>
        <input v-if="isCreate" class="form-control" type="text" v-model="account.code">
        <p v-else class="form-control-static">{{account.code}}</p>
      </div>

      <div class="form-group col-md-6">
        <label class="control-label">Role:</label>
        <select class="form-control" v-model="account.role">
          <option>human</option>
          <option>system</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="form-group col-md-6">
        <label class="control-label">Email:</label>
        <input class="form-control" type="text" v-model="account.email">
      </div>

      <div class="form-group col-md-6">
        <label class="control-label">Phone:</label>
        <input class="form-control" type="text" v-model="account.phone">
      </div>
    </div>

    <div class="form-group">
      <label class="control-label">Subscriptions:</label>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Criteria</th>
            <th class="text-center">Email?</th>
            <th class="text-center">SMS?</th>
            <th class="text-center">Inbox?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, index) in account.subscriptions">
            <td>
              <a @click="openEditModal(s)">{{s.name || 'Untitled ' + index}}</a>
            </td>
            <td class="pre">{{JSON.stringify(s.criteria)}}</td>
            <td class="text-center">
              <span :class="`fa fa-lg fa-envelope ${s.email ? 'fa-on' : 'fa-off'}`"></span>
            </td>
            <td class="text-center">
              <span :class="`fa fa-lg fa-mobile ${s.sms ? 'fa-on' : 'fa-off'}`"></span>
            </td>
            <td class="text-center">
              <span :class="`fa fa-lg fa-inbox ${s.inbox ? 'fa-on' : 'fa-off'}`"></span>
            </td>
            <td class="text-center">
              <button class="btn" @click="account.subscriptions.splice(index, 1)">
                <span class="fa fa-fw fa-trash"></span>
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="5">
              <button class="btn btn-default" @click="account.subscriptions.push({criteria:{}})">
                Add subscription
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <edit-subscription-modal
        :selectedSub="selectedSub"
        @dismiss="selectedSub = null"
        @ok="handleEdit">
      </edit-subscription-modal>

    </div>

    <div class="form-group">
      <button class="btn btn-primary btn-lg" @click="save">Save changes</button>

      <button class="btn btn-danger btn-lg pull-right"
        ng-if="!isCreate" ng-click="confirmDelete()">Delete</button>
    </div>

  </div>
</template>

<script>
import {Account} from '../models'
import EditSubscriptionModal from './EditSubscriptionModal.vue'
import Toaster from '../components/Toaster.vue'
import Promise from 'bluebird'

export default {
  components: {EditSubscriptionModal, Toaster},
  data() {
    return {account: [], selectedSub: null, savePromise: null}
  },
  computed: {
    isCreate() { return this.account.id == null }
  },
  created() {
    Account.findById(this.$route.params.code).then( row => {
      this.account = row
    })
  },
  methods: {
    openEditModal(sub) { this.selectedSub = sub },
    handleEdit(sub) {
      _.assign(this.selectedSub, sub)
      this.selectedSub = null
    },
    save() {
      this.$refs.toaster.follow(Account.save(this.account)
        .then( () => 'Saved successfully' )
      )
    }
  }
}
</script>

<style>
.account-details { margin-top: 15px; }

.account-details td.pre {
  font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  overflow: auto;
}

.account-details .table-bordered > tbody > tr > td {
  vertical-align: middle;
}

.fa-on  { color: #39e939; }
.fa-off { color: #ddd; }
</style>
