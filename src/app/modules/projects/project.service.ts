import { Subject } from 'rxjs';
import { ProjectModel } from '../../models/project.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IP, JSON_HEADER, PORT } from '../../constants';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProjectService {
  projectChanged = new Subject<Array<ProjectModel>>();
  private allProjects: Array<ProjectModel> = [];
  projectNameChanged = new Subject<string>();
  currentProjectId: number;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  setCurrentProjectId(id: number) {
    this.currentProjectId = id;
  }

  getCurrentProjectName(id) {
    if (this.getAllProjects().length !== 0) {
      const projectSelected = this.getAllProjects().find(project => project.id === +id);
      if (projectSelected) {
        this.projectNameChanged.next(projectSelected.name);
      }
    }
  }

  getCurrentProjectColor(id): any {
    if (this.getAllProjects().length !== 0) {
      const projectSelected = this.getAllProjects().find(project => project.id === +id);
      return projectSelected.color;
    }
  }

  addNewProject(project: ProjectModel) {
    return this.http.post(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects`, { ...project }, JSON_HEADER);
  }

  deleteProject(projectId: number) {
    return this.http.delete(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }`);
  }

  updateProjectColor(name: string, color: string, projectId: number) {
    return this.http.patch(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/color`,
      { name, color });
  }

  updateProjectName(name: string, userId: number, projectId: number) {
    return this.http.put(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/${ projectId }/name`, { name });
  }

  reoderProjects(firstProjectId: number, secondProjectId: number) {
    this.http.patch(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects/reorder?firstProject=${ firstProjectId }&secondProject=${ secondProjectId }`, {})
      .subscribe();
  }

  fetchAllProjects() {
    this.http.get<Array<ProjectModel>>(`${ IP }${ PORT }/users/${ this.authService.getUserId() }/projects`)
      .toPromise()
      .then(res => {
        this.allProjects = res;
        this.projectChanged.next(res);
        this.getCurrentProjectName(this.currentProjectId);
      })
      .catch(() => this.allProjects = []);
  }

  getAllProjects() {
    return [...this.allProjects];
  }
}
