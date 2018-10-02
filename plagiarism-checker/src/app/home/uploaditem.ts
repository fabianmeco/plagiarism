import { UploadItem }    from 'angular-http-file-upload';

export class MyUploadItem extends UploadItem {
    constructor(file: any) {
        super();
        this.url = 'docfile';
        this.headers = { HeaderName: 'Docx', AnotherHeaderName: 'DocxHTML' };
        this.file = file;
    }
}