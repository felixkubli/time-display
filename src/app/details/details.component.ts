import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from './workspace.service';
import {Workspace} from './workspace.model';

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
  tokenValid: boolean;

  constructor(private workspaceService: WorkspaceService) {

  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.workspace_id = +localStorage.getItem('workspace_id');
  }

  onSubmitToken() {
    this.workspaceService.setToken(this.token);
    this.subscription = this.workspaceService.getWorkspace().subscribe(workspaces => {
        this.workspaces = workspaces;
        localStorage.setItem('token', this.token);
        this.tokenValid = true;
      },
      error => {
        this.tokenValid = false;
        this.updated = false;
        console.error('could not load resource');
      }
    );
  }

  onSubmitID() {
    localStorage.setItem('workspace_id', this.workspace_id + '');
    this.updated = true;
  }

}
