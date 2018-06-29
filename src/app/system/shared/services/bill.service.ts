import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BillModel} from "../models/bill-model";
import {BaseApi} from '../../../shared/core/base.api';

@Injectable()

export class BillService extends BaseApi{
    constructor(public http: Http){
      super(http);
    }

    getBill(): Observable<BillModel> {
      return this.get('bill');
    }

    getCurrency(): Observable<any> {
      return this.http.get(`http://data.fixer.io/api/latest?access_key=e02bc00e8d5b8c6ce11325f54d3ae4d3`)
        .map((response: Response) => response.json());
    }

    updateBill(bill: BillModel) {
      return this.put('bill', bill);
    }
}
