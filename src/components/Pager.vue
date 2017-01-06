<template>
  <nav class="text-center" v-if="showPager">
    <ul class="pagination">
      <li>
        <a @click="go('prev')">
          <span class="fa fa-chevron-left"></span>
        </a>
      </li>
      <li v-for="p in pagesToShow" :class="{active: curPage == p}">
        <a @click="go(p)">{{p}}</a>
      </li>
      <li>
        <a @click="go('next')">
          <span class="fa fa-chevron-right"></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    limit : {type: Number, default: 20},
    offset: {type: Number, default: 0},
    totalCount: {type: Number, default: 0},
    windowSize: {type: Number, default: 20},
  },
  computed: {
    numPages() { return Math.ceil(this.totalCount / this.limit) },
    curPage()  { return Math.floor(this.offset / this.limit) + 1},
    showPager() { return this.numPages > 1 },
    pagesToShow() { return calculateWindow(this.numPages, this.offset, this.windowSize) }
  },
  methods: {
    go(num) {
      if ( num === 'prev' ) num = this.curPage - 1
      else if ( num === 'next' ) num = this.curPage + 1

      if ( num < 1 ) num = 1
      if ( num > this.numPages && this.numPages > 0 )
        num = this.numPages

      this.$emit('paginate', {
        pageNum: num,
        limit: this.limit,
        offset: (num-1) * this.limit
      })
    }
  }
}

function calculateWindow(numPages, curPage, w) {
  // Se a quantidade de páginas é menor que a largura da janela,
  // mostra todas.
  if ( numPages < w ) {
    return _.range(1, numPages+1)
  } else if ( curPage < (w/2) ) {
    return _.range(1, w)
  } else if ( curPage > numPages - (w/2) ) {
    return _.range(numPages - (w - 2), numPages + 1)
  } else {
    return _.range(curPage - ((w/2) - 1), curPage + (w/2))
  }
}
</script>

<style>
.pagination > li > a {
  padding: 6px 12px;
  border-width: 0px;
}
</style>
