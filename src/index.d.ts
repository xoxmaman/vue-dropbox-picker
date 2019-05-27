declare namespace Dropbox {
    interface Chooser {
        choose(options: ChooserOptions): void
        isBrowserSupported(): boolean
    }

    interface ChooserOptions {
        success(files: ReadonlyArray<ChooserFile>): void;
        cancel?(): void;
        linkType?: 'preview' | 'direct';
        multiselect?: boolean;
        extensions?: string[];
        folderselect?: boolean;
        sizeLimit?: number;
    }

    interface ChooserFile {
        id: string;
        name: string;
        link: string;
        bytes: number;
        icon: string;
        thumbnailLink?: string;
        isDir: boolean;
    }
}

interface Window {
    Dropbox?: Dropbox.Chooser;
}
