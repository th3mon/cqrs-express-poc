import type { Command, CommandHandler } from "./command.ts";
import type { Query, QueryHandler } from "./query.ts";

export class CommandBus {
  private handlers = new Map<string, CommandHandler<any, any>>();

  register(handler: CommandHandler<any, any>) {
    this.handlers.set(handler.type, handler);
  }

  async execute<C extends Command, R>(command: C): Promise<R> {
    const handler = this.handlers.get(command.type);

    if (!handler) {
      throw new Error(`No command handler for: ${command.type}`);
    }

    return handler.execute(command);
  }
}

export class QueryBus {
  private handlers = new Map<string, QueryHandler<any, any>>();

  register(handler: QueryHandler<any, any>) {
    this.handlers.set(handler.type, handler);
  }

  async execute<Q extends Query, R>(query: Q): Promise<R> {
    const handler = this.handlers.get(query.type);

    if (!handler) {
      throw new Error(`No query handler for: ${query.type}`);
    }

    return handler.execute(query);
  }
}
