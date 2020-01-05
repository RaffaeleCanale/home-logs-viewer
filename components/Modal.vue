<template>
    <transition v-if="show" name="modal">
        <div class="modal-mask" @click="$emit('update:show', false)">
            <div class="modal-wrapper" @click.stop.prevent>
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header" />
                    </div>

                    <div class="modal-body">
                        <slot />
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <b-button @click="$emit('update:show', false)">
                                Close
                            </b-button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        show: { type: Boolean, required: true },
    },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  // display: table-cell;
  // vertical-align: middle;
  padding-top: 50px;
}

.modal-container {
  width: 80vh;
  margin: 0px auto;
  // padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  color: #1b078d;
  font-size: 2em;
}

.modal-body {
  margin: 20px 0;
}

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

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>