export interface Persistable<TData> {
    save(key: string, content: TData): void;
    retrieve(key: string): TData | undefined;
    delete(key: string): TData | undefined;
}
