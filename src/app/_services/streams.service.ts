import { Stream } from './../_models/stream.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StreamsService {
streamsList: AngularFireList<any>;

constructor(private db: AngularFireDatabase) { }

getStreamList() {
  this.streamsList =  this.db.list('College/streamList');
  return this.streamsList;
}

setStreamList(stream: Stream) {
  return this.streamsList.push(stream);
}

deleteStream(key) {
  return this.streamsList.remove(key);
}

}
