export type DomainEvent<TType extends string = string, TPayload = any> = {
  type: TType;
  payload: TPayload;
};

export class EventBus {
  private listeners = new Map<
    string,
    Array<(e: DomainEvent) => Promise<void>>
  >();

  async publish(event: DomainEvent) {
    const arr = this.listeners.get(event.type) ?? [];

    for (const fn of arr) {
      await fn(event);
    }
  }
}
