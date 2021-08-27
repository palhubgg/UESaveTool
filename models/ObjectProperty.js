import { Property } from './index.js'

export class ObjectProperty extends Property {
    constructor({name, type, value}) {
        super({name, type, value});
    }
    get Size() {
        return this.Value.length + 4;
    }
}
