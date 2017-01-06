<template>
  <div class="col-md-6 col-md-offset-3 accounts-list">

    <input class="form-control" v-model="txtFilter" placeholder="Filter by code, email, or role">

    <div class="list-group">

      <div class="list-group-item" v-for="a in filteredAccounts">
        <div class="media">
          <div class="media-body">

            <div class="col-md-6">
              <h4 class="list-group-item-heading">
                <router-link :to="`/accounts/${a.code}`">
                  {{a.code}}
                </router-link>
              </h4>
              Role: {{a.role}}
              <br>
              Email: {{a.email || '(none)' }}
            </div>

            <div class="col-md-6" v-if="a.subscriptions.length < 1">
              No subscriptions
            </div>

            <ul class="col-md-6" v-else>
              <li class="sub" v-for="s in a.subscriptions">
                <div class="notif-types">
                  <span :class="`fa fa-fw ${firstIcon(s)}`"></span>
                </div>
                <div class="notif-crits">
                  <sub-crit prefix="sources" :value="s.criteria.sources"></sub-crit>
                  <sub-crit prefix="without sources" :value="s.criteria.withoutSources"></sub-crit>
                  <sub-crit prefix="tags" :value="s.criteria.tags"></sub-crit>
                  <sub-crit prefix="without tags" :value="s.criteria.withoutTags"></sub-crit>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {Account} from '../models'

const SubCrit = {
  template: `
    <span v-if="isPresent">{{prefix}}: <b>{{value.join(', ')}}</b></span>`,
  props: ['prefix', 'value'],
  computed: {
    isPresent() { console.log(this.value) ; return this.value != null && this.value.length > 0 }
  }
}

function matches(acc, txtFilter) {
  if ( txtFilter.trim().length < 1 ) return true
  return ( acc.code.match(txtFilter) ||
    (acc.email || '').match(txtFilter) ||
    (acc.role || '').match(txtFilter) )
}

export default {
  components: {SubCrit},
  data() {
    return {accounts: [], txtFilter: ''}
  },
  computed: {
    filteredAccounts() {
      return this.accounts.filter( a => matches(a, this.txtFilter))
    }
  },
  created() {
    Account.findAll().then( data => {
      this.accounts = data.rows
    })
  },
  methods: {
    firstIcon(sub) {
      if ( sub.email ) return 'fa-envelope'
      if ( sub.sms   ) return 'fa-mobile'
      if ( sub.inbox ) return 'fa-inbox'
      return ''
    }
  }
}
</script>

<style>
.accounts-list > .form-control { margin: 15px 0; }

.accounts-list .sub {
  margin-bottom: 2px;
  list-style-type: none;
}

.accounts-list .sub .fa {
  color: #39e939;
}

.accounts-list .notif-crits {
  display: table-cell;
  background-color: #eee;
  border-radius: 2px;
  padding: 2px 8px;
}

.accounts-list .notif-types {
  display: table-cell;
  white-space: nowrap;
  width: 24px;
}

.accounts-list .notif-crits span { color: #666; }
.accounts-list .notif-crits span b { color: #000; }
.accounts-list .notif-crits span:not(:last-of-type) { margin-right: 10px; }
</style>
