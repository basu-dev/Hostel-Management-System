import { Router } from '@angular/router';
import { AlertifyService } from './../../../_services/alertify.service';
import { StreamsService } from './../../../_services/streams.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Stream } from 'src/app/_models/stream.model';


@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.css']
})
export class CreateStreamComponent implements OnInit {
  streamForm: FormGroup;
  showLoader = false;
  allStreams: Stream[];

  constructor(private streamService: StreamsService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.streamService.getStreamList();
    this.getAllStreams();

    this.streamForm = new FormGroup({
      streamName: new FormControl('', Validators.required)
    });
  }

  getAllStreams() {
    this.streamService.getStreamList().valueChanges().subscribe((list: Stream[]) => {
      this.allStreams = list;
    }, (err => {
      console.log(err);
    }));
  }

  onSubmit() {
    this.showLoader = true;
    let isValidStream = true;
    const stream = this.streamForm.value;
    this.allStreams.forEach(element => {
      if (stream.streamName.toLowerCase().trim() === element.streamName.toLowerCase().trim()) {
        this.alertify.error('Stream with this name already exists');
        isValidStream = false;
      }
    });

    if (isValidStream) {
      this.streamService.setStreamList(this.streamForm.value)
      .then(() => {
        this.showLoader = false;
        this.alertify.success('Stream created successfully');
        console.log('Success');
      }).catch(() => {
        this.showLoader = false;
        this.alertify.error('Oops some error Occured');
      }).finally(() => {
        this.showLoader = false;
      });
    } else {
      this.showLoader = false;
    }
  }

  onCancel() {
    this.router.navigate(['/streamList']);
  }
}
