import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Hotel } from "../../../common/tables/Hotel";
import { Room } from "../../../common/tables/Room";
import { HotelPK } from "../../../common/tables/HotelPK";
import { Guest } from "../../../common/tables/Guest";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }
  public getVarietes(): Observable<any[]> {
    return this.http
      .get<any[]>(this.BASE_URL + "/varietes")
      .pipe(catchError(this.handleError<any[]>("getVarietes")));
  }
  public getHotels(): Observable<Hotel[]> {
    return this.http
      .get<Hotel[]>(this.BASE_URL + "/hotels")
      .pipe(catchError(this.handleError<Hotel[]>("getHotels")));
  }
  public getJardins(): Observable<any[]> {
    return this.http
      .get<any[]>(this.BASE_URL + "/jardins")
      .pipe(catchError(this.handleError<any[]>("getjardins")));
  }

  public getJardin(primaryKey:string): Observable<any[]> {
    return this.http
      .get<any[]>(this.BASE_URL + "/jardins/"+primaryKey)
      .pipe(catchError(this.handleError<any[]>("getJardin")));
  }

  public getPlantes(): Observable<any[]> {
    return this.http
      .get<any[]>(this.BASE_URL + "/plantes")
      .pipe(catchError(this.handleError<any[]>("getPlantes")));
  }
  public insertHotel(hotel: Hotel): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/hotels/insert", hotel)
      .pipe(catchError(this.handleError<number>("insertHotel")));
  }

  public insertVariete(variete: any): Observable<any> {
    return this.http
      .post<any>(this.BASE_URL + "/variete/insert", variete)
      .pipe(catchError(this.handleError<any>("insertVariete")));
  }

  public updateHotel(hotel: Hotel): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/hotels/update", hotel)
      .pipe(catchError(this.handleError<number>("updateHotel")));
  }

  public updateVariete(variete: any): Observable<any> {
    return this.http
      .put<any>(this.BASE_URL + "/variete/update", variete)
      .pipe(catchError(this.handleError<any>("updateVariete")));
  }

  public deleteHotel(hotelNb: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/hotels/delete/" + hotelNb, {})
      .pipe(catchError(this.handleError<number>("deleteHotel")));
  }

  public deleteVariete(nomVariete: string): Observable<number> {
    return this.http
      .delete<any>(this.BASE_URL + "/variete/delete/" + nomVariete, {})
      .pipe(catchError(this.handleError<any>("deleteHotel")));
  }

  public getHotelPKs(): Observable<HotelPK[]> {
    return this.http
      .get<HotelPK[]>(this.BASE_URL + "/hotels/hotelNb")
      .pipe(catchError(this.handleError<HotelPK[]>("getHotelPKs")));
  }

  public getRooms(hotelNb: string): Observable<Room[]> {
    return this.http
      .get<Room[]>(this.BASE_URL + `/rooms?hotelNb=${hotelNb}`)
      .pipe(catchError(this.handleError<Room[]>("getRooms")));
  }

  public insertRoom(room: Room): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/rooms/insert", room)
      .pipe(catchError(this.handleError<number>("inserHotel")));
  }

  public updateRoom(room: Room): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/rooms/update", room)
      .pipe(catchError(this.handleError<number>("updateRoom")));
  }

  public deleteRoom(hotelNb: string, roomNb: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + `/rooms/delete/${hotelNb}/${roomNb}`, {})
      .pipe(catchError(this.handleError<number>("deleteRoom")));
  }

  public getGuests(hotelNb: string, roomNb: string): Observable<Guest[]> {
    return this.http
      .get<Guest[]>(this.BASE_URL + `/guests/${hotelNb}/${roomNb}`)
      .pipe(catchError(this.handleError<Guest[]>("getGuests")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
