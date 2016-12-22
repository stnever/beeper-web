<template>
  <div class="toaster">
    <transition name="slide-n-fade" mode="out-in">
      <div key="waiting" v-if="state == 'waiting'" class="ts-coin"><div class="loading"></div></div>
      <div key="success" v-if="state == 'success'" class="ts-message"><div class="text-center">{{ msg }}</div></div>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  // props: ['promise'],
  data() {
    return {state: 'idle', msg: null}
  },
  methods: {
    go(state) {
      // console.log('setting state', state)
      this.state = state
    },

    start() { this.go('waiting') },
    hide()  { this.go('idle')    },
    success(msg) {
      this.go('success')
      this.msg = _.isString(msg) ? msg : 'Saved successfully'
    },

    follow(p) {
      this.start()
      p.then( res => {
        this.success(res)

        setTimeout( () => this.hide(), 2000)

        return res
      })
      .catch( err => {
        console.log(err.stack || err)
        this.hide()
      })
    },

    wait(p) {
      this.start()
      p.then( res => {
        this.hide()
        return res
      })
      .catch( err => {
        console.log(err.stack || err)
        this.hide()
      })
    }
    //
    // success {}
    // 'promise': function(p) {
    //   console.log('Promise has been set; waiting for it to end')
    //   this.state = 'waiting'
    //   p.then( res => {
    //     console.log('Promise resolved successfully')
    //     this.state = 'success'
    //     this.msg =
    //
    //     setTimeout( () => {
    //       console.log('Resetting to idle')
    //       this.state = 'idle'
    //     }, 2000)
    //
    //   })
    //   .catch(function(err) {
    //     console.log('Error', err.stack || err)
    //     this.state = 'error'
    //   })
    // }
  }
}
</script>

<style>
.toaster {
  /*border: 1px solid red;*/
}

/* Animation:

opacity=0             opacity=1
└─┬─────┘└───────────────┬────┘
.enter      400ms .enter-active

opacity=1             opacity=0
└─┬─────┘└───────────────┬────┘
.leave      400ms .leave-active

*/


/* o loading dentro do toaster ainda tem uma "moeda"
   ao redor do spinner */
.ts-coin {
  position: absolute;
  overflow: hidden;
  margin: 0px auto 16px;
  width: 48px;
  background-color: rgb(255, 255, 255);
  z-index: 9999;
  left: 50%;
  margin-left: -24px;
  box-shadow: 0px 5px 5px #ccc, 0px 0px 0px 1px #ccc;
  border-radius: 100%;
  height: 48px;
  padding-top: 36px;

  /*opacity: 1; margin-top: 0px;*/
}

/*.ts-coin.toaster-enter        { opacity: 0; margin-top: -48px; }
.ts-coin.toaster-enter-active { opacity: 1; margin-top: 0; }
.ts-coin.toaster-leave        { opacity: 1; margin-top: 0; }
.ts-coin.toaster-leave-active { opacity: 0; margin-top: -48px; }*/

/* o spinner dentro da coin */
.ts-coin .loading {
  position: absolute;
  top: 8px;
  left: 50%;
  margin-left: -16px;
}

/* mensagens (geral) */
.ts-message {
  position: absolute;
  width: 400px;
  left: calc(50% - 200px);
  transition: all 0.4s ease 0s;
  box-shadow: 0px 4px 2px -2px #ccc;
  border-radius: 2px;
  border-width: 2px;
  border-style: solid;
  background-color: #f9edbe;
  border-color: #f0c36d;
  z-index: 1;
  line-height: 32px;
}

.slide-n-fade-enter-active {
  animation: slide-n-fade-in .4s;
}

.slide-n-fade-leave-active {
  animation: slide-n-fade-out .4s;
}

@keyframes slide-n-fade-in {
  0%    {opacity: 0; margin-top: -48px; }
  100%  {opacity: 1; margin-top: 0px;   }
}

@keyframes slide-n-fade-out {
  0%    {opacity: 1; margin-top: 0px;   }
  100%  {opacity: 0; margin-top: -48px; }
}

</style>
