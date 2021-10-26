import {Injectable,EventEmitter} from "@angular/core";
import { Category } from '../Category/category';

@Injectable({
  providedIn: 'root'
})
export class CrossServiceService {

  category = new EventEmitter<Category[]>();

  setCategory(categories:Category[]){
    this.category.emit(categories);
  }

}
