import { AlertifyService } from './../../_services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StreamsService } from 'src/app/_services/streams.service';
import { Stream } from 'src/app/_models/stream.model';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {
  showLoader = false;
  allStreams: Stream[] = [];
  constructor(private router: Router, private streamService: StreamsService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getAllStreams();
  }

  getAllStreams() {
    this.showLoader = true;
    this.streamService.getStreamList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.allStreams.push(y as Stream);
        });
        console.log(this.allStreams);
      }),
      ((err) => {
        this.showLoader = false;
        this.alertify.error('Oops some error occured');
      })
    );
  }

  onNewStream() {
    this.router.navigate(['/createStream']);
  }

  onDelete(key) {
    this.streamService.deleteStream(key).then(() => {
      this.alertify.success('Deletion successful');
      this.allStreams = [];
      this.getAllStreams();
    }).catch((err) => {
      console.log(err);
      this.alertify.error('Oops some error occured');
    });
  }
}
