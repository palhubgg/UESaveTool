import { Property } from './index.js';

export class EnumProperty extends Property {
    constructor({name, type, value}, etype) {
        super({name, type, value});
        this.EnumType = etype;
    }
    get Size() {
        return this.Value.length + 4;
    }
}