import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { Workspace } from './workspace.model';

@Component({
  selector: 'my-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  token: string = '';
  workspaces: Workspace[] = [];
  workspace_id: number;
  subscription = null;
  updated = false;

  constructor(private workspaceService: WorkspaceService) {

  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.workspace_id = +localStorage.getItem('workspace_id');
  }

  onSubmitToken() {
    localStorage.setItem('token', this.token);
    this.workspaceService.setToken(this.token);
    this.subscription = this.workspaceService.getWorkspace().subscribe(workspaces => this.workspaces = workspaces);
  }

  tokenValid() {
    return this.subscription != null;
  }

  onSubmitID() {
    localStorage.setItem('workspace_id', <string>this.workspace_id);
    this.updated = true;
  }

}
