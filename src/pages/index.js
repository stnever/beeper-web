import Sources        from './Sources.vue'
import Timeline       from './Timeline.vue'
import Accounts       from './Accounts.vue'
import AccountDetails from './AccountDetails.vue'
import Subscriptions  from './Subscriptions.vue'

export default [
  { path: '/sources' , component: Sources  },
  { path: '/timeline', component: Timeline },
  { path: '/accounts', component: Accounts },
  { path: '/accounts/:code', component: AccountDetails },
  { path: '/subscriptions', component: Subscriptions },
  { path: '', redirect: '/sources' }
]
