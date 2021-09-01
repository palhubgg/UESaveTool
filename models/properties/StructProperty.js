import { Property } from './index.js'
import { PropertyFactory } from '../factories/index.js';

export class StructProperty extends Property {
    constructor() {
        super();
        this.StoredPropertyType = "";
        this.Properties = [];
    }
    get Size() {
        let size = this.Name.length + 4;
        size += this.Type.length + 4;
        size += 8; // 4 byte size + 4 byte padding
        size += this.StoredPropertyType.length + 4;
        size += 17; // 17 byte padding
        for(let i = 0; i < this.Properties.length; i++) {
            size += this.Properties[i].Size;
        }
        return size;
    }
    get HeaderSize() {
        let size = this.Name.length + 4;
        size += this.Type.length + 4;
        size += 8;
        size += this.StoredPropertyType.length + 4;
        size += 17;
        return size
    }
    get Count() {
        return this.Properties.length;
    }
    serialize() {
        let buf = Buffer.alloc(this.Size);
        let offset = 0;
        offset = buf.writeInt32LE(this.Name.length, offset);
        offset += buf.write(this.Name, offset);
        offset = buf.writeInt32LE(this.Type.length, offset);
        offset += buf.write(this.Type, offset);
        offset = buf.writeInt32LE(this.Size - this.HeaderSize, offset);
        offset += 4;
        offset = buf.writeInt32LE(this.StoredPropertyType.length, offset);
        offset += buf.write(this.StoredPropertyType, offset);
        offset += 17;
        for(let i = 0; i < this.Properties.length; i++) {
            offset += this.Properties[i].serialize().copy(buf, offset);
        }
        if(offset !== this.Size)
            throw new SerializationError(this);
        return buf;
    }
    static from(obj) {
        let struct = new StructProperty();
        struct.Name = obj.Name;
        struct.Type = obj.Type;
        struct.StoredPropertyType = obj.StoredPropertyType;
        struct.Properties = [];
        obj.Properties.forEach((prop) => struct.Properties.push(PropertyFactory.create(prop)));
        return struct;
    }
}