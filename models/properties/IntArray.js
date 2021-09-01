import { Property } from './index.js'
import { PropertyFactory } from '../factories/index.js'
import { SerializationError } from '../index.js';

export class IntArray extends Property {
    constructor() {
        super();
        this.Type = "IntArray"
        this.Properties = [];
    }
    get Size() {
        let size = this.Properties.length > 1 ? 8 : 4;
        this.Properties.forEach((int) => {
            size += int.Size
        });
        return size;
    }
    get Count() {
        return this.Properties.length;
    }
    serialize() {
        let buf = Buffer.alloc(this.Size);
        let offset = this.Properties.length > 1 ? 8 : 4;
        this.Properties.forEach(int => offset += int.serialize().copy(buf, offset));
        if(offset !== this.Size)
            throw new SerializationError(this);
        return buf;
    }
    static from(obj) {
        let array = new IntArray();
        obj.Properties.forEach(int => array.Properties.push(PropertyFactory.create(int)));
        return array;
    }
}