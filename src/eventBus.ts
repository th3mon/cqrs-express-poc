export type DomainEvent<TType extends string = string, TPayload = any> = {
  type: TType;
  payload: TPayload;
};

export class EventBus {
  private listeners = new Map<
    string,
    Array<(e: DomainEvent) => Promise<void>>
  >();

  on(type: string, fn: (e: DomainEvent) => Promise<void>) {
    const arr = this.listeners.get(type) ?? [];

    arr.push(fn);

    this.listeners.set(type, arr);
  }

  async publish(event: DomainEvent) {
    const arr = this.listeners.get(event.type) ?? [];

    for (const fn of arr) {
      await fn(event);
    }
  }
}
