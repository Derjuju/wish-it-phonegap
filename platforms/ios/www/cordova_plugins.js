cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.file/www/DirectoryEntry.js",
        "id": "org.apache.cordova.file.DirectoryEntry",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/DirectoryReader.js",
        "id": "org.apache.cordova.file.DirectoryReader",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Entry.js",
        "id": "org.apache.cordova.file.Entry",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/File.js",
        "id": "org.apache.cordova.file.File",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileEntry.js",
        "id": "org.apache.cordova.file.FileEntry",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileError.js",
        "id": "org.apache.cordova.file.FileError",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileReader.js",
        "id": "org.apache.cordova.file.FileReader",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileSystem.js",
        "id": "org.apache.cordova.file.FileSystem",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileUploadOptions.js",
        "id": "org.apache.cordova.file.FileUploadOptions",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileUploadResult.js",
        "id": "org.apache.cordova.file.FileUploadResult",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileWriter.js",
        "id": "org.apache.cordova.file.FileWriter",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Flags.js",
        "id": "org.apache.cordova.file.Flags",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/LocalFileSystem.js",
        "id": "org.apache.cordova.file.LocalFileSystem",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Metadata.js",
        "id": "org.apache.cordova.file.Metadata",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/ProgressEvent.js",
        "id": "org.apache.cordova.file.ProgressEvent",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/requestFileSystem.js",
        "id": "org.apache.cordova.file.requestFileSystem",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/resolveLocalFileSystemURI.js",
        "id": "org.apache.cordova.file.resolveLocalFileSystemURI",
        "clobbers": [
            "window.resolveLocalFileSystemURI"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/ios/Entry.js",
        "id": "org.apache.cordova.file.Entry1",
        "merges": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-transfer/www/FileTransferError.js",
        "id": "org.apache.cordova.file-transfer.FileTransferError",
        "clobbers": [
            "window.FileTransferError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-transfer/www/FileTransfer.js",
        "id": "org.apache.cordova.file-transfer.FileTransfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.socialsharing/www/SocialSharing.js",
        "id": "nl.x-services.plugins.socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    }
]
});