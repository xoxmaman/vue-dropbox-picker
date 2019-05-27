# vue-dropbox-picker

## Installation
`yarn add vue-dropbox-picker` or `npm install vue-dropbox-picker --save`

##Usage
```
<VueDropboxPicker
        :api-key="dropboxApiKey"
        link-type="direct"
        :multiselect="false"
        :extensions="['.mp4']"
        :folderselect="false"
        :sizeLimit="1024"
        @cancel="onCancel"
        @picked="onPicked">
    Open Dropbox Picker
</VueDropboxPicker>
```

```
onCancel = () => {
  console.log('onCancel')
}

onPicked = (files) => {
  files.forEach((file) => {
      console.log(file)
  })
}
/*
{
    // Unique ID for the file, compatible with Dropbox API v2.
    id: "id:...",

    // Name of the file.
    name: "filename.txt",

    // URL to access the file, which varies depending on the linkType specified when the
    // Chooser was triggered.
    link: "https://...",

    // Size of the file in bytes.
    bytes: 464,

    // URL to a 64x64px icon for the file based on the file's extension.
    icon: "https://...",

    // A thumbnail URL generated when the user selects images and videos.
    // If the user didn't select an image or video, no thumbnail will be included.
    thumbnailLink: "https://...?bounding_box=75&mode=fit",

    // Boolean, whether or not the file is actually a directory
    isDir: false,
}
 */
```
### Props
`link-type` - `direct` or `preview`. Default is `preview`. Type of returning URLs to chosen files <br>
`multiselect` - Boolean. Possibility to choose several files<br>
`extensions` - List of allowed extensions. Empty by default (allowed all files).<br>
`folderselect` - Boolean. Possibility to choose folders
`sizeLimit` - Max size of files. If unset - no limit

### Events
`cancel` - When picker is closed. No arguments<br>
`picked` - When files are chosen. Argument - files (Array of file objects)<br>


For more info - https://www.dropbox.com/developers/chooser

