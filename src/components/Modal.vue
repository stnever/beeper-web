<template>
  <transition name="modal">
    <div :class="'modal-mask ' + cssClass">
      <div class="modal-wrapper" @click="$emit('dismiss')">
        <div class="modal-container" @click.stop>

          <div class="modal-header" v-if="!omitHeader">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer" v-if="!omitFooter">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['omitFooter', 'omitHeader', 'cssClass']
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .1s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: absolute;
  top: 100px;
  left: calc(50% - 350px);
  width: 700px;

  margin: 0px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .1s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-lg .modal-container {
  width: 1200px;
  left: calc(50% - 600px);
}

.modal-header h3 {
  margin-top: 0;
  color: #EE0C5B;
}

/*.modal-body {
  margin: 20px 0;
}*/

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

/*.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}*/
</style>
