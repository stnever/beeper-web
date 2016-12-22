<template>
  <Modal v-if="showError" @dismiss="showError = false"
    :omit-footer="true" :omit-header="true">

    <div slot="body">
      <div class="alert alert-danger">
        <span class="fa fa-lg fa-fw fa-times-circle"></span>
        {{message}}
      </div>

      <p style="margin-top: 10px">Error details:</p>

      <pre class="error">{{details}}</pre>
    </div>

  </Modal>
</template>

<script>
import Modal from './Modal.vue'

export default {
  components: {Modal},
  data() {
    return { err: null, message: null, details: null, showError: false }
  },
  methods: {
    show(err) {
      this.showError = true
      this.err = err
      this.message = 'An error has occurred'

      // Se r possui 'status' ou 'httpStatus', é um erro HTTP.
      // Vamos incorporar o status na mensagem, e descrever a
      // resposta, que pode ser texto ou json.
      if ( err.status || err.httpStatus ) {
        var a = 'HTTP code ' + (err.status || err.httpStatus),
            b = _.isString(err.data) ? err.data : JSON.stringify(err.data)

        this.details = a + '\n' + b
      }

      // Se r é um Error, vamos usar o name+message como detalhe.
      else if ( _.isError(err) ) {
        this.details = err.message
        if ( err.message == null || err.message.trim().length < 1 )
          this.details = err.name
      }

      // Se r é uma simples String, usa ela mesma como detalhe.
      else if ( _.isString(err) ) {
        this.details = err
      }

      // Qualquer outro caso (se r é null, por exemplo) vira
      // erro desconhecido.
      else {
        this.details = 'Unknown error'
      }

    }
  }
}
</script>

<style>
</style>
