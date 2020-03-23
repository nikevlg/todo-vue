<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <button
            type="button"
            class="btn-close icon-cancel"
            @click="close">
          </button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          Удалить карточку?
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button
            type="button"
            class="btn-green"
            @click="close">
            Отмена
          </button>
          <button
            type="button"
            class="btn-green"
            @click="confirm">
            Удалить
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'modal',

  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import 'src/assets/style/global';
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    @extend %box-shadow-1;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 16px;
    width: 250px;
    background: #FFF;
    border-radius: 8px;
  }

  .modal-header,
  .modal-footer {
    display: flex;
  }

  .modal-header {
    justify-content: space-between;
  }

  .modal-footer {
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 16px  16px 24px 16px;
  }

  .btn-close {
    @extend %clear-but;
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .btn-green {
    @extend %clear-but;
    border: 1px solid $secondText;
    border-radius: 8px;
    margin-left: 16px;
    padding: 8px;
    &:hover{
      background-color: #e5e5e5;
    }
  }
</style>
