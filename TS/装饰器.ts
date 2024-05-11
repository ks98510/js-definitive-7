type Decorator = (
  target: InputDeviceInfo,
  context: {
    kind: string;
    name: string | symbol;
    access: {
      get?(): unknown;
      set?(value: unknown): void;
    };
    private?: boolean;
    static?: boolean;
    addInitializer?(initializer: () => void): void;
  }
) => OutPut | void;

let helloWord = "hello word";

type MyBool = true | false;

