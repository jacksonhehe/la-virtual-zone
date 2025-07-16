export type SafeParseReturn<T> =
  | { success: true; data: T }
  | { success: false; error: { issues: { path: (string | number)[]; message: string }[] } };

class ZString {
  private minLen = 0;
  private minMsg = '';

  min(len: number, message: string) {
    this.minLen = len;
    this.minMsg = message;
    return this;
  }

  parse(value: unknown): string {
    if (typeof value !== 'string') {
      throw { issues: [{ path: [], message: 'Expected string' }] };
    }
    if (value.length < this.minLen) {
      throw { issues: [{ path: [], message: this.minMsg }] };
    }
    return value;
  }
}

class ZObject<T extends Record<string, unknown>> {
  constructor(private shape: { [K in keyof T]: ZString }) {}
  private refinement?: { check: (val: T) => boolean; message: string; path: (keyof T)[] };

  refine(check: (val: T) => boolean, cfg: { message: string; path: (keyof T)[] }) {
    this.refinement = { check, message: cfg.message, path: cfg.path };
    return this;
  }

  parse(obj: unknown): T {
    if (typeof obj !== 'object' || obj === null) {
      throw { issues: [{ path: [], message: 'Expected object' }] };
    }
    const out: Partial<T> = {};
    for (const key in this.shape) {
      try {
        out[key] = this.shape[key].parse((obj as Record<string, unknown>)[key]);
      } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'issues' in err) {
          (err as any).issues[0].path = [key];
        }
        throw err;
      }
    }
    if (this.refinement && !this.refinement.check(out as T)) {
      throw { issues: [{ path: this.refinement.path as string[], message: this.refinement.message }] };
    }
    return out as T;
  }

  safeParse(obj: unknown): SafeParseReturn<T> {
    try {
      const data = this.parse(obj);
      return { success: true, data };
    } catch (err: unknown) {
      return { success: false, error: err as any };
    }
  }
}

export const z = {
  string: () => new ZString(),
  object: <T extends Record<string, unknown>>(shape: { [K in keyof T]: ZString }) => new ZObject<T>(shape)
};
