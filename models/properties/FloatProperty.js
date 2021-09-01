import { Property } from './index.js'

export class FloatProperty extends Property {
    constructor() {
        super();
        this.Property = 0.0;
    }
    get Size() {
        return this.Name.length + 4 
            + this.Type.length + 4
            + 13;
    }
    serialize() {
        let buf = Buffer.alloc(this.Size);
        let offset = 0;
        offset = buf.writeInt32LE(this.Name.length, offset);
        offset += buf.write(this.Name, offset);
        offset = buf.writeInt32LE(this.Type.length, offset);
        offset += buf.write(this.Type, offset);
        offset = buf.writeInt32LE(4, offset);
        offset = buf.writeInt32LE(this.Property[0], offset);
        offset += 1
        offset = buf.writeFloatLE(this.Property[1], offset);
        if(offset !== this.Size)
            throw new Error(`Problem occured during serialization of Property: ${this}`);
        return buf;
    }
    static from(obj) {
        let prop = new FloatProperty();
        Object.assign(prop, obj);
        return prop;
    }
}