import { NextResponse } from "next/server";

export function runMiddleware(req, middlewares) {
  return new Promise((resolve, reject) => {
    const res = { end: resolve, status: () => res, json: () => res };
    middlewares.reduce(
      (prev, fn) =>
        prev.then(() => fn(req, res, (err) => (err ? reject(err) : resolve()))),
      Promise.resolve()
    );
  });
}
