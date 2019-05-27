<template>
  <div v-if="scriptLoaded && dropboxChooserIsSupported" @click="openChooser">
      <slot/>
      <button v-if="!this.$slots.default">Open dropbox picker</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ChooserOptions = Dropbox.ChooserOptions

@Component({})
export default class DropboxPicker extends Vue {
  @Prop({
    required: true,
  })
  private apiKey!: string

  @Prop({
    required: false,
    default: 'preview',
  })
  private linkType!: 'preview' | 'direct'

  @Prop({
    required: false,
    default: false,
  })
  private multiselect!: boolean

  @Prop({
    required: false,
    default: () => [],
  })
  private extensions!: string[]

  @Prop({
    required: false,
    default: false,
  })
  private folderselect!: boolean

  @Prop({
    required: false,
    default: 0,
  })
  private sizeLimit!: number

  private scriptLoaded = false
  private dropboxChooserIsSupported = false

  private mounted(): void {
    if (window.Dropbox) {
      this.scriptLoaded = true
    } else {
      const dropBoxScript = document.createElement('script')
      dropBoxScript.onload = () => {
        this.scriptLoaded = true
        this.dropboxChooserIsSupported = window.Dropbox!.isBrowserSupported()

        if (!this.dropboxChooserIsSupported) {
          console.warn('VueDropboxPicker: This browser is not supported')
        }
      }
      dropBoxScript.setAttribute('src', 'https://www.dropbox.com/static/api/2/dropins.js')
      dropBoxScript.setAttribute('id', 'dropboxjs')
      dropBoxScript.setAttribute('data-app-key', this.apiKey)
      document.head.appendChild(dropBoxScript)
    }
  }

  private openChooser(): void {
    const options: ChooserOptions = {
      multiselect: this.multiselect,
      folderselect: this.folderselect,
      linkType: this.linkType,
      success: (files: ReadonlyArray<Dropbox.ChooserFile>) => {
        this.$emit('picked', files)
      },
      cancel: () => {
        this.$emit('cancel')
      },
    }

    if (this.extensions.length) {
      options.extensions = this.extensions
    }

    if (this.sizeLimit) {
      options.sizeLimit = this.sizeLimit
    }

    window.Dropbox!.choose(options)
  }
}
</script>

<style></style>
