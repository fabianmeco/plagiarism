import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpRequestService {
    constructor(private httpClient: HttpClient) { }

    get(url): Observable<any> {
        return this.httpClient.get(url);
    }
}