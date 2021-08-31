import { Buffer } from 'buffer'
import { Property } from './index.js'
import { SerializationError } from '../index.js';

export class Guid extends Property {
    constructor(id, guid) {
        super();
        this.Type = 'Guid';
        this.Id = id;
        this.Value = guid;
    }
    get Size() {
        return 20;
    }
    serialize() {
        let guid = this.Id.split('-');
        let buf = Buffer.alloc(this.Size);
        let offset = 0
        offset += Buffer.from(guid[0], 'hex').swap32().copy(buf, offset);
        offset += Buffer.from(guid[1], 'hex').swap16().copy(buf, offset);
        offset += Buffer.from(guid[2], 'hex').swap16().copy(buf, offset);
        offset += Buffer.from(guid[3], 'hex').copy(buf, offset);
        offset += Buffer.from(guid[4], 'hex').copy(buf, offset);
        offset = buf.writeInt32LE(this.Value, offset);
        
        if(offset !== 20)
            throw new SerializationError(this);
        return buf;
    }
    static from(obj) {
        return new Guid(obj.Id, obj.Value);
    }
}
