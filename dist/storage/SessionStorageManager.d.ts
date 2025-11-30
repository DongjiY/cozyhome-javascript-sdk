import { Persistable } from "./Persistable";
export declare class SessionStorageManager implements Persistable<boolean> {
    constructor();
    save(key: string, content: boolean): void;
    retrieve(key: string): boolean | undefined;
    delete(key: string): boolean | undefined;
}
