export type DomainEvent<TType extends string, TPayload> = {
  type: TType;
  payload: TPayload;
};

export type EventMap = Record<string, unknown>;

export class EventBus<E extends EventMap = EventMap> {
  private listeners: {
    [K in keyof E]?: Array<(e: DomainEvent<K & string, E[K]>) => Promise<void>>;
  } = {};

  on<K extends keyof E>(
    type: K,
    fn: (e: DomainEvent<K & string, E[K]>) => Promise<void>,
  ) {
    const arr = this.listeners[type] ?? [];
    arr.push(fn);
    this.listeners[type] = arr;
  }

  async publish<K extends keyof E>(event: DomainEvent<K & string, E[K]>) {
    const arr = this.listeners[event.type as K] ?? [];
    for (const fn of arr) await fn(event as any);
  }
}
