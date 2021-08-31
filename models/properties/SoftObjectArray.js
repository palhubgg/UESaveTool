import { Property } from './index.js'
import { SerializationError } from '../index.js';

export class SoftObjectArray extends Property {
    constructor(properties) {
        super();
        this.Properties = properties;
    }
    get Size() {
        let size = 8;
        this.Properties.forEach((str) => {
            size += str.length + 4;
        });
        return size;
    }
    get Length() {
        return this.Properties.length;
    }
    serialize() {
        let buf = Buffer.alloc(this.Size);
        let offset = 0;
        this.Properties.forEach(str => {
            offset = buf.writeInt32LE(str.length, offset);
            offset += buf.write(str, offset);
            offset += 4;
        });
        if(offset !== this.Size)
            throw new SerializationError(this);
        console.log(`Successfully serialized ${SoftObjectArray.name}`);
        return buf;
    }
    static from(obj) {
        return new SoftObjectArray(obj.Properties);
    }
}