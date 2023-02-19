<template>
  <UiDialog :active="errorDialog.active" @close="CloseError">
    <UiFlex type="column" align="center" justify="center" class="pa-1">
      <UiIcon src="bxs-error-circle" size="4rem" color="danger"></UiIcon>
      <UiText size="2rem" weight="700" color="danger" v-if="errorDialog.status">{{ errorDialog.status }}</UiText>
      <UiText color="gray" align="center" v-if="errorDialog.message">{{ errorDialog.message }}</UiText>
    </UiFlex>
  </UiDialog>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      'errorDialog': 'dialog/getError'
    })
  },

  methods: {
    ...mapMutations ({
      'CloseError': 'dialog/closeError',
    })
  }
}
</script>