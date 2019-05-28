export interface Chooser {
    choose(options: ChooserOptions): void

    isBrowserSupported(): boolean
}

export interface ChooserOptions {
    linkType?: 'preview' | 'direct'
    multiselect?: boolean
    extensions?: string[]
    folderselect?: boolean
    sizeLimit?: number

    success(files: ReadonlyArray<ChooserFile>): void

    cancel?(): void
}

export interface ChooserFile {
    id: string
    name: string
    link: string
    bytes: number
    icon: string
    thumbnailLink?: string
    isDir: boolean
}
