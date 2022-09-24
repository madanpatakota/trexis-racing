import {
  Component,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {
  AbstractFormGroupDirective,
  FormControl,
  FormControlName,
  FormGroup,
} from '@angular/forms';
import { team } from '../team.model';
import { member } from '../member.model';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: any;
  status: any;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  //teams = [];
  teams: team[] = [];

  SaveMember() {}
  @Output('modelpopupClose') modelpopupClose = new EventEmitter<void>();

  @Input('formFields') formFields: any;

  memberDetailsForm: FormGroup;

  formInit() {
    this.memberDetailsForm?.reset();
    this.memberDetailsForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      jobTitle: new FormControl(),
      status: new FormControl('Active'),
      rteam: new FormControl(),
    });
  }

  constructor(private appService: AppService, private router: Router) {}

  editMemberDetails: member;
  ngOnInit(): void {
    this.formInit();
    this.appService.getTeams().subscribe((teams: team[]) => {
      this.teams = teams;
    });
    this.appService.openModelUp.subscribe((status: any) => {
      this.showModelPopUp(status);
    });
  }

  statusType = '';
  model: any;
  showModelPopUp(model: any) {
    let modelstatus = model.modelType;
    this.statusType = modelstatus;
    this.model = model;
    if (modelstatus == 'Edit') {
      let teamId = this.teams.filter((x) => x.teamName == model.Data.team)[0]
        .id;
      this.memberDetailsForm.setValue({
        firstName: model.Data.firstName,
        lastName: model.Data.lastName,
        status: model.Data.status,
        jobTitle: model.Data.jobTitle,
        rteam: teamId,
      });
    } else {
      this.formInit();
    }
  }

  saveMember() {
    let member: any = {};
    member.firstName = this.memberDetailsForm.controls['firstName'].value;
    member.lastName = this.memberDetailsForm.controls['lastName'].value;
    member.jobTitle = this.memberDetailsForm.controls['jobTitle'].value;
    member.status = this.memberDetailsForm.controls['status'].value;
    let rteam = +this.memberDetailsForm.controls['rteam'].value;
    member.team = this.teams.filter((x) => x.id == rteam)[0].teamName;
    if (this.statusType == 'New') {
      member.id = this.model.ID;
      this.appService.insertMember(member).subscribe(() => {});
    }
    else{
    member.id = this.model.Data.id;
    this.appService
      .editMember(member, member.id).subscribe(() => {});
    }
    window.location.reload();
  }
  
  onSubmit() {}
}
