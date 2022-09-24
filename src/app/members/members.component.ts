import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { member } from '../member.model';
import { Member } from '../member-details/member-details.component';
import { team } from '../team.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: member[] = [];

  //@ViewChild("button1") button1 : ElementRef

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.getMembers();
  }
  isShow = true;
  evtModelpopUpClose() {
    // model popup close..
  }

  // editMember(member: Member) {
  //   this.appService.getTeams().subscribe((teams: team[]) => {
  //     this.appService.updateMember.next(member);
  //   });
  // }

  goToAddMemberForm() {}

  isaddNew = false;

  OpenModelUp(modelType: string, data?: any) {
    if (modelType == 'New') {
      this.appService.openModelUp.next({
        modelType: modelType,
        ID: this.members.length + 1,
      });
    } else {
      this.appService.openModelUp.next({ modelType: modelType, Data: data });
    }
  }

  RemoveMember(member: member) {
    this.appService.RemoveMember(member).subscribe(() => {
      this.getMembers();
    });
  }

  getMembers() {
    this.appService
      .getMembers()
      .subscribe((members: member[]) => (this.members = members));
  }

  // SaveMember() {
  //   this.appService.editEvent.next({
  //     status: 'Save',
  //     ID: this.members.length + 1,
  //   });
  // }
}
