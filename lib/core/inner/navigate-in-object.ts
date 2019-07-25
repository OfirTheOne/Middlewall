import { getNestedElementByPath } from './../../utils'

export class NavigateInObject {

    private rootRef: any;
    
    constructor(obj:any) {
        this.rootRef = obj;
    }

    public to(path: string) {
        if(path == '') {
            return this.root;
        }
        const target = getNestedElementByPath(this.rootRef, path);
        return target;
    }

    get root(): any {
        return this.rootRef;
    }
}