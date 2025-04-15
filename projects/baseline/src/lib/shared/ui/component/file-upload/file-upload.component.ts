import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
    FileBeforeUploadEvent,
    FileProgressEvent,
    FileRemoveEvent,
    FileSelectEvent,
    FileSendEvent,
    FileUpload,
    FileUploadErrorEvent,
    FileUploadEvent,
    FileUploadHandlerEvent,
    RemoveUploadedFileEvent
} from "primeng/fileupload";
import {HttpHeaders} from "@angular/common/http";
import {ButtonProps} from "primeng/button";

@Component({
  selector: 'base-file-upload',
    imports: [
        FileUpload
    ],
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
    @Input() name?: string;
    @Input() url?: string;
    @Input() method: 'post' | 'put' = 'post';
    @Input() multiple = false;
    @Input() disabled = false;
    @Input() auto = false;
    @Input() withCredentials = true;
    @Input() customUpload = false;

    @Input() maxFileSize?: number;
    @Input() invalidFileSizeMessageSummary: string = '{0}: Invalid file size,';
    @Input() invalidFileSizeMessageDetail: string = 'maximum upload size is {0}.';

    @Input() accept?: string;
    @Input() invalidFileTypeMessageSummary: string = '{0}: Invalid file type,';
    @Input() invalidFileTypeMessageDetail: string = 'allowed file types: {0}.';

    @Input() fileLimit?: number;
    @Input() invalidFileLimitMessageSummary: string = 'Maximum number of files exceeded,'
    @Input() invalidFileLimitMessageDetail: string = 'limit is {0} at most.'

    @Input() styleClass?: string;
    @Input() previewWidth: number = 50;

    @Input() chooseLabel?: string;
    @Input() uploadLabel?: string;
    @Input() cancelLabel?: string;

    @Input() chooseIcon?: string;
    @Input() uploadIcon?: string;
    @Input() cancelIcon?: string;

    @Input() chooseButtonProps: ButtonProps = {};
    @Input() uploadButtonProps: ButtonProps = {};
    @Input() cancelButtonProps: ButtonProps = {};

    @Input() showUploadButton = true;
    @Input() showCancelButton = true;
    @Input() mode: 'basic' | 'advanced' = 'advanced';
    @Input() headers?: HttpHeaders;

    @Input() uploadStyleClass?: string;
    @Input() cancelStyleClass?: string;
    @Input() chooseStyleClass?: string;
    @Input() removeStyleClass?: string;

    @Output() onBeforeUpload = new EventEmitter<FileBeforeUploadEvent>;
    @Output() onSend = new EventEmitter<FileSendEvent>();
    @Output() onUpload = new EventEmitter<FileUploadEvent>();
    @Output() onError = new EventEmitter<FileUploadErrorEvent>();
    @Output() onClear = new EventEmitter<Event>();
    @Output() onRemove = new EventEmitter<FileRemoveEvent>();
    @Output() onSelect = new EventEmitter<FileSelectEvent>();
    @Output() onProgress = new EventEmitter<FileProgressEvent>();
    @Output() uploadHandler = new EventEmitter<FileUploadHandlerEvent>();
    @Output() onImageError = new EventEmitter<Event>();
    @Output() onRemoveUploadedFile = new EventEmitter<RemoveUploadedFileEvent>();
}
