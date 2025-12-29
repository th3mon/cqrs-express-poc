export class OrderDomain {
  static ensureCanAddItem(status: string) {
    if (status === "CANCELLED") {
      throw new Error("Cannot modify cancelled order");
    }
  }
}
