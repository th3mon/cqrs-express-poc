export type Command = { type: string };

export interface CommandHandler<C extends Command, R> {
  type: C["type"];
  execute(command: C): Promise<R>;
}
