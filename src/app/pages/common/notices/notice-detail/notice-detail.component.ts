import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notice } from 'src/app/model/notices';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {
  @Input() notice:Notice;
  @Input() myNotice:boolean;
  constructor(
    private route:ActivatedRoute,
    private alertify:AlertifyService
  ) { 
  }

  ngOnInit() {
    
  }
  editNotice(){}
  deleteNotice(){}
}
