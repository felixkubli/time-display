import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Workspace } from './workspace.model';

@Injectable()
export class WorkspaceService {
  url: string = 'https://www.toggl.com/api/v8/workspaces';
  token: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  getWorkspace() {
    return this.http.get(this.url, { headers: this.getHeaders() })
      .map(response => <Workspace[]>response.json());
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(this.token + ':' + 'api_token'));
    return headers;
  }
}
