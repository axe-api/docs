<template>
  <img :src="url" height="25" />
</template>

<script>
export default {
  name: 'Emoji',
  props: ['code'],
  computed: {
    url () {
      return `https://github.githubassets.com/images/icons/emoji/unicode/${this.code}.png`
    }
  }
}
</script>
