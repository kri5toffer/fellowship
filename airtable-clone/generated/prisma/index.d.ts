/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Table
 *
 */
export type Table = $Result.DefaultSelection<Prisma.$TablePayload>;
/**
 * Model Field
 *
 */
export type Field = $Result.DefaultSelection<Prisma.$FieldPayload>;
/**
 * Model Row
 *
 */
export type Row = $Result.DefaultSelection<Prisma.$RowPayload>;
/**
 * Model Cell
 *
 */
export type Cell = $Result.DefaultSelection<Prisma.$CellPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const FieldType: {
    TEXT: "TEXT";
    NUMBER: "NUMBER";
    CHECKBOX: "CHECKBOX";
    DATE: "DATE";
  };

  export type FieldType = (typeof FieldType)[keyof typeof FieldType];
}

export type FieldType = $Enums.FieldType;

export const FieldType: typeof $Enums.FieldType;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tables
 * const tables = await prisma.table.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tables
   * const tables = await prisma.table.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.table`: Exposes CRUD operations for the **Table** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Tables
   * const tables = await prisma.table.findMany()
   * ```
   */
  get table(): Prisma.TableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.field`: Exposes CRUD operations for the **Field** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Fields
   * const fields = await prisma.field.findMany()
   * ```
   */
  get field(): Prisma.FieldDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.row`: Exposes CRUD operations for the **Row** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Rows
   * const rows = await prisma.row.findMany()
   * ```
   */
  get row(): Prisma.RowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cell`: Exposes CRUD operations for the **Cell** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Cells
   * const cells = await prisma.cell.findMany()
   * ```
   */
  get cell(): Prisma.CellDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Table: "Table";
    Field: "Field";
    Row: "Row";
    Cell: "Cell";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: "table" | "field" | "row" | "cell";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Table: {
        payload: Prisma.$TablePayload<ExtArgs>;
        fields: Prisma.TableFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TableFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TableFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          findFirst: {
            args: Prisma.TableFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TableFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          findMany: {
            args: Prisma.TableFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[];
          };
          create: {
            args: Prisma.TableCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          createMany: {
            args: Prisma.TableCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.TableCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[];
          };
          delete: {
            args: Prisma.TableDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          update: {
            args: Prisma.TableUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          deleteMany: {
            args: Prisma.TableDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.TableUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.TableUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[];
          };
          upsert: {
            args: Prisma.TableUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          aggregate: {
            args: Prisma.TableAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTable>;
          };
          groupBy: {
            args: Prisma.TableGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TableGroupByOutputType>[];
          };
          count: {
            args: Prisma.TableCountArgs<ExtArgs>;
            result: $Utils.Optional<TableCountAggregateOutputType> | number;
          };
        };
      };
      Field: {
        payload: Prisma.$FieldPayload<ExtArgs>;
        fields: Prisma.FieldFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.FieldFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.FieldFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>;
          };
          findFirst: {
            args: Prisma.FieldFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.FieldFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>;
          };
          findMany: {
            args: Prisma.FieldFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>[];
          };
          create: {
            args: Prisma.FieldCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>;
          };
          createMany: {
            args: Prisma.FieldCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.FieldCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>[];
          };
          delete: {
            args: Prisma.FieldDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>;
          };
          update: {
            args: Prisma.FieldUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>;
          };
          deleteMany: {
            args: Prisma.FieldDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.FieldUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.FieldUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>[];
          };
          upsert: {
            args: Prisma.FieldUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FieldPayload>;
          };
          aggregate: {
            args: Prisma.FieldAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateField>;
          };
          groupBy: {
            args: Prisma.FieldGroupByArgs<ExtArgs>;
            result: $Utils.Optional<FieldGroupByOutputType>[];
          };
          count: {
            args: Prisma.FieldCountArgs<ExtArgs>;
            result: $Utils.Optional<FieldCountAggregateOutputType> | number;
          };
        };
      };
      Row: {
        payload: Prisma.$RowPayload<ExtArgs>;
        fields: Prisma.RowFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RowFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RowFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>;
          };
          findFirst: {
            args: Prisma.RowFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RowFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>;
          };
          findMany: {
            args: Prisma.RowFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>[];
          };
          create: {
            args: Prisma.RowCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>;
          };
          createMany: {
            args: Prisma.RowCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RowCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>[];
          };
          delete: {
            args: Prisma.RowDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>;
          };
          update: {
            args: Prisma.RowUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>;
          };
          deleteMany: {
            args: Prisma.RowDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RowUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RowUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>[];
          };
          upsert: {
            args: Prisma.RowUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RowPayload>;
          };
          aggregate: {
            args: Prisma.RowAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRow>;
          };
          groupBy: {
            args: Prisma.RowGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RowGroupByOutputType>[];
          };
          count: {
            args: Prisma.RowCountArgs<ExtArgs>;
            result: $Utils.Optional<RowCountAggregateOutputType> | number;
          };
        };
      };
      Cell: {
        payload: Prisma.$CellPayload<ExtArgs>;
        fields: Prisma.CellFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CellFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CellFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>;
          };
          findFirst: {
            args: Prisma.CellFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CellFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>;
          };
          findMany: {
            args: Prisma.CellFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>[];
          };
          create: {
            args: Prisma.CellCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>;
          };
          createMany: {
            args: Prisma.CellCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CellCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>[];
          };
          delete: {
            args: Prisma.CellDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>;
          };
          update: {
            args: Prisma.CellUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>;
          };
          deleteMany: {
            args: Prisma.CellDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CellUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.CellUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>[];
          };
          upsert: {
            args: Prisma.CellUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CellPayload>;
          };
          aggregate: {
            args: Prisma.CellAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCell>;
          };
          groupBy: {
            args: Prisma.CellGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CellGroupByOutputType>[];
          };
          count: {
            args: Prisma.CellCountArgs<ExtArgs>;
            result: $Utils.Optional<CellCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    table?: TableOmit;
    field?: FieldOmit;
    row?: RowOmit;
    cell?: CellOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T["level"] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type TableCountOutputType
   */

  export type TableCountOutputType = {
    fields: number;
    rows: number;
  };

  export type TableCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    fields?: boolean | TableCountOutputTypeCountFieldsArgs;
    rows?: boolean | TableCountOutputTypeCountRowsArgs;
  };

  // Custom InputTypes
  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TableCountOutputType
     */
    select?: TableCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeCountFieldsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: FieldWhereInput;
  };

  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeCountRowsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RowWhereInput;
  };

  /**
   * Count Type FieldCountOutputType
   */

  export type FieldCountOutputType = {
    cells: number;
  };

  export type FieldCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    cells?: boolean | FieldCountOutputTypeCountCellsArgs;
  };

  // Custom InputTypes
  /**
   * FieldCountOutputType without action
   */
  export type FieldCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FieldCountOutputType
     */
    select?: FieldCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * FieldCountOutputType without action
   */
  export type FieldCountOutputTypeCountCellsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CellWhereInput;
  };

  /**
   * Count Type RowCountOutputType
   */

  export type RowCountOutputType = {
    cells: number;
  };

  export type RowCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    cells?: boolean | RowCountOutputTypeCountCellsArgs;
  };

  // Custom InputTypes
  /**
   * RowCountOutputType without action
   */
  export type RowCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RowCountOutputType
     */
    select?: RowCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * RowCountOutputType without action
   */
  export type RowCountOutputTypeCountCellsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CellWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Table
   */

  export type AggregateTable = {
    _count: TableCountAggregateOutputType | null;
    _avg: TableAvgAggregateOutputType | null;
    _sum: TableSumAggregateOutputType | null;
    _min: TableMinAggregateOutputType | null;
    _max: TableMaxAggregateOutputType | null;
  };

  export type TableAvgAggregateOutputType = {
    order: number | null;
  };

  export type TableSumAggregateOutputType = {
    order: number | null;
  };

  export type TableMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    order: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type TableMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    order: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type TableCountAggregateOutputType = {
    id: number;
    name: number;
    order: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type TableAvgAggregateInputType = {
    order?: true;
  };

  export type TableSumAggregateInputType = {
    order?: true;
  };

  export type TableMinAggregateInputType = {
    id?: true;
    name?: true;
    order?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type TableMaxAggregateInputType = {
    id?: true;
    name?: true;
    order?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type TableCountAggregateInputType = {
    id?: true;
    name?: true;
    order?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type TableAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Table to aggregate.
     */
    where?: TableWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TableWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tables.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Tables
     **/
    _count?: true | TableCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: TableAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: TableSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TableMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TableMaxAggregateInputType;
  };

  export type GetTableAggregateType<T extends TableAggregateArgs> = {
    [P in keyof T & keyof AggregateTable]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTable[P]>
      : GetScalarType<T[P], AggregateTable[P]>;
  };

  export type TableGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TableWhereInput;
    orderBy?:
      | TableOrderByWithAggregationInput
      | TableOrderByWithAggregationInput[];
    by: TableScalarFieldEnum[] | TableScalarFieldEnum;
    having?: TableScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TableCountAggregateInputType | true;
    _avg?: TableAvgAggregateInputType;
    _sum?: TableSumAggregateInputType;
    _min?: TableMinAggregateInputType;
    _max?: TableMaxAggregateInputType;
  };

  export type TableGroupByOutputType = {
    id: string;
    name: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    _count: TableCountAggregateOutputType | null;
    _avg: TableAvgAggregateOutputType | null;
    _sum: TableSumAggregateOutputType | null;
    _min: TableMinAggregateOutputType | null;
    _max: TableMaxAggregateOutputType | null;
  };

  type GetTableGroupByPayload<T extends TableGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<TableGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof TableGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TableGroupByOutputType[P]>
            : GetScalarType<T[P], TableGroupByOutputType[P]>;
        }
      >
    >;

  export type TableSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      order?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      fields?: boolean | Table$fieldsArgs<ExtArgs>;
      rows?: boolean | Table$rowsArgs<ExtArgs>;
      _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["table"]
  >;

  export type TableSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      order?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["table"]
  >;

  export type TableSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      order?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["table"]
  >;

  export type TableSelectScalar = {
    id?: boolean;
    name?: boolean;
    order?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type TableOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "name" | "order" | "createdAt" | "updatedAt",
    ExtArgs["result"]["table"]
  >;
  export type TableInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    fields?: boolean | Table$fieldsArgs<ExtArgs>;
    rows?: boolean | Table$rowsArgs<ExtArgs>;
    _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type TableIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type TableIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $TablePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Table";
    objects: {
      fields: Prisma.$FieldPayload<ExtArgs>[];
      rows: Prisma.$RowPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        order: number;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["table"]
    >;
    composites: {};
  };

  type TableGetPayload<
    S extends boolean | null | undefined | TableDefaultArgs,
  > = $Result.GetResult<Prisma.$TablePayload, S>;

  type TableCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<TableFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: TableCountAggregateInputType | true;
  };

  export interface TableDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Table"];
      meta: { name: "Table" };
    };
    /**
     * Find zero or one Table that matches the filter.
     * @param {TableFindUniqueArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TableFindUniqueArgs>(
      args: SelectSubset<T, TableFindUniqueArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Table that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TableFindUniqueOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TableFindUniqueOrThrowArgs>(
      args: SelectSubset<T, TableFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Table that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TableFindFirstArgs>(
      args?: SelectSubset<T, TableFindFirstArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Table that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TableFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TableFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Tables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tables
     * const tables = await prisma.table.findMany()
     *
     * // Get first 10 Tables
     * const tables = await prisma.table.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const tableWithIdOnly = await prisma.table.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TableFindManyArgs>(
      args?: SelectSubset<T, TableFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Table.
     * @param {TableCreateArgs} args - Arguments to create a Table.
     * @example
     * // Create one Table
     * const Table = await prisma.table.create({
     *   data: {
     *     // ... data to create a Table
     *   }
     * })
     *
     */
    create<T extends TableCreateArgs>(
      args: SelectSubset<T, TableCreateArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Tables.
     * @param {TableCreateManyArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TableCreateManyArgs>(
      args?: SelectSubset<T, TableCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Tables and returns the data saved in the database.
     * @param {TableCreateManyAndReturnArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Tables and only return the `id`
     * const tableWithIdOnly = await prisma.table.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TableCreateManyAndReturnArgs>(
      args?: SelectSubset<T, TableCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Table.
     * @param {TableDeleteArgs} args - Arguments to delete one Table.
     * @example
     * // Delete one Table
     * const Table = await prisma.table.delete({
     *   where: {
     *     // ... filter to delete one Table
     *   }
     * })
     *
     */
    delete<T extends TableDeleteArgs>(
      args: SelectSubset<T, TableDeleteArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Table.
     * @param {TableUpdateArgs} args - Arguments to update one Table.
     * @example
     * // Update one Table
     * const table = await prisma.table.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TableUpdateArgs>(
      args: SelectSubset<T, TableUpdateArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Tables.
     * @param {TableDeleteManyArgs} args - Arguments to filter Tables to delete.
     * @example
     * // Delete a few Tables
     * const { count } = await prisma.table.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TableDeleteManyArgs>(
      args?: SelectSubset<T, TableDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TableUpdateManyArgs>(
      args: SelectSubset<T, TableUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tables and returns the data updated in the database.
     * @param {TableUpdateManyAndReturnArgs} args - Arguments to update many Tables.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Tables and only return the `id`
     * const tableWithIdOnly = await prisma.table.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TableUpdateManyAndReturnArgs>(
      args: SelectSubset<T, TableUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Table.
     * @param {TableUpsertArgs} args - Arguments to update or create a Table.
     * @example
     * // Update or create a Table
     * const table = await prisma.table.upsert({
     *   create: {
     *     // ... data to create a Table
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Table we want to update
     *   }
     * })
     */
    upsert<T extends TableUpsertArgs>(
      args: SelectSubset<T, TableUpsertArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableCountArgs} args - Arguments to filter Tables to count.
     * @example
     * // Count the number of Tables
     * const count = await prisma.table.count({
     *   where: {
     *     // ... the filter for the Tables we want to count
     *   }
     * })
     **/
    count<T extends TableCountArgs>(
      args?: Subset<T, TableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], TableCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TableAggregateArgs>(
      args: Subset<T, TableAggregateArgs>,
    ): Prisma.PrismaPromise<GetTableAggregateType<T>>;

    /**
     * Group by Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TableGroupByArgs["orderBy"] }
        : { orderBy?: TableGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, TableGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetTableGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Table model
     */
    readonly fields: TableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Table.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TableClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    fields<T extends Table$fieldsArgs<ExtArgs> = {}>(
      args?: Subset<T, Table$fieldsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$FieldPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    rows<T extends Table$rowsArgs<ExtArgs> = {}>(
      args?: Subset<T, Table$rowsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$RowPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Table model
   */
  interface TableFieldRefs {
    readonly id: FieldRef<"Table", "String">;
    readonly name: FieldRef<"Table", "String">;
    readonly order: FieldRef<"Table", "Int">;
    readonly createdAt: FieldRef<"Table", "DateTime">;
    readonly updatedAt: FieldRef<"Table", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Table findUnique
   */
  export type TableFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput;
  };

  /**
   * Table findUniqueOrThrow
   */
  export type TableFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput;
  };

  /**
   * Table findFirst
   */
  export type TableFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tables.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[];
  };

  /**
   * Table findFirstOrThrow
   */
  export type TableFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tables.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[];
  };

  /**
   * Table findMany
   */
  export type TableFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Tables to fetch.
     */
    where?: TableWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Tables.
     */
    cursor?: TableWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tables.
     */
    skip?: number;
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[];
  };

  /**
   * Table create
   */
  export type TableCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * The data needed to create a Table.
     */
    data: XOR<TableCreateInput, TableUncheckedCreateInput>;
  };

  /**
   * Table createMany
   */
  export type TableCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[];
  };

  /**
   * Table createManyAndReturn
   */
  export type TableCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[];
  };

  /**
   * Table update
   */
  export type TableUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * The data needed to update a Table.
     */
    data: XOR<TableUpdateInput, TableUncheckedUpdateInput>;
    /**
     * Choose, which Table to update.
     */
    where: TableWhereUniqueInput;
  };

  /**
   * Table updateMany
   */
  export type TableUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>;
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput;
    /**
     * Limit how many Tables to update.
     */
    limit?: number;
  };

  /**
   * Table updateManyAndReturn
   */
  export type TableUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>;
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput;
    /**
     * Limit how many Tables to update.
     */
    limit?: number;
  };

  /**
   * Table upsert
   */
  export type TableUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * The filter to search for the Table to update in case it exists.
     */
    where: TableWhereUniqueInput;
    /**
     * In case the Table found by the `where` argument doesn't exist, create a new Table with this data.
     */
    create: XOR<TableCreateInput, TableUncheckedCreateInput>;
    /**
     * In case the Table was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TableUpdateInput, TableUncheckedUpdateInput>;
  };

  /**
   * Table delete
   */
  export type TableDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter which Table to delete.
     */
    where: TableWhereUniqueInput;
  };

  /**
   * Table deleteMany
   */
  export type TableDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Tables to delete
     */
    where?: TableWhereInput;
    /**
     * Limit how many Tables to delete.
     */
    limit?: number;
  };

  /**
   * Table.fields
   */
  export type Table$fieldsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    where?: FieldWhereInput;
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[];
    cursor?: FieldWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: FieldScalarFieldEnum | FieldScalarFieldEnum[];
  };

  /**
   * Table.rows
   */
  export type Table$rowsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    where?: RowWhereInput;
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[];
    cursor?: RowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[];
  };

  /**
   * Table without action
   */
  export type TableDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
  };

  /**
   * Model Field
   */

  export type AggregateField = {
    _count: FieldCountAggregateOutputType | null;
    _avg: FieldAvgAggregateOutputType | null;
    _sum: FieldSumAggregateOutputType | null;
    _min: FieldMinAggregateOutputType | null;
    _max: FieldMaxAggregateOutputType | null;
  };

  export type FieldAvgAggregateOutputType = {
    order: number | null;
  };

  export type FieldSumAggregateOutputType = {
    order: number | null;
  };

  export type FieldMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    type: $Enums.FieldType | null;
    order: number | null;
    tableId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type FieldMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    type: $Enums.FieldType | null;
    order: number | null;
    tableId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type FieldCountAggregateOutputType = {
    id: number;
    name: number;
    type: number;
    order: number;
    tableId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type FieldAvgAggregateInputType = {
    order?: true;
  };

  export type FieldSumAggregateInputType = {
    order?: true;
  };

  export type FieldMinAggregateInputType = {
    id?: true;
    name?: true;
    type?: true;
    order?: true;
    tableId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type FieldMaxAggregateInputType = {
    id?: true;
    name?: true;
    type?: true;
    order?: true;
    tableId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type FieldCountAggregateInputType = {
    id?: true;
    name?: true;
    type?: true;
    order?: true;
    tableId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type FieldAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Field to aggregate.
     */
    where?: FieldWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Fields to fetch.
     */
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: FieldWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Fields from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Fields.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Fields
     **/
    _count?: true | FieldCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: FieldAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: FieldSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: FieldMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: FieldMaxAggregateInputType;
  };

  export type GetFieldAggregateType<T extends FieldAggregateArgs> = {
    [P in keyof T & keyof AggregateField]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateField[P]>
      : GetScalarType<T[P], AggregateField[P]>;
  };

  export type FieldGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: FieldWhereInput;
    orderBy?:
      | FieldOrderByWithAggregationInput
      | FieldOrderByWithAggregationInput[];
    by: FieldScalarFieldEnum[] | FieldScalarFieldEnum;
    having?: FieldScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FieldCountAggregateInputType | true;
    _avg?: FieldAvgAggregateInputType;
    _sum?: FieldSumAggregateInputType;
    _min?: FieldMinAggregateInputType;
    _max?: FieldMaxAggregateInputType;
  };

  export type FieldGroupByOutputType = {
    id: string;
    name: string;
    type: $Enums.FieldType;
    order: number;
    tableId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: FieldCountAggregateOutputType | null;
    _avg: FieldAvgAggregateOutputType | null;
    _sum: FieldSumAggregateOutputType | null;
    _min: FieldMinAggregateOutputType | null;
    _max: FieldMaxAggregateOutputType | null;
  };

  type GetFieldGroupByPayload<T extends FieldGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<FieldGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof FieldGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FieldGroupByOutputType[P]>
            : GetScalarType<T[P], FieldGroupByOutputType[P]>;
        }
      >
    >;

  export type FieldSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      type?: boolean;
      order?: boolean;
      tableId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
      cells?: boolean | Field$cellsArgs<ExtArgs>;
      _count?: boolean | FieldCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["field"]
  >;

  export type FieldSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      type?: boolean;
      order?: boolean;
      tableId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["field"]
  >;

  export type FieldSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      type?: boolean;
      order?: boolean;
      tableId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["field"]
  >;

  export type FieldSelectScalar = {
    id?: boolean;
    name?: boolean;
    type?: boolean;
    order?: boolean;
    tableId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type FieldOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "name" | "type" | "order" | "tableId" | "createdAt" | "updatedAt",
    ExtArgs["result"]["field"]
  >;
  export type FieldInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
    cells?: boolean | Field$cellsArgs<ExtArgs>;
    _count?: boolean | FieldCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type FieldIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
  };
  export type FieldIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
  };

  export type $FieldPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Field";
    objects: {
      table: Prisma.$TablePayload<ExtArgs>;
      cells: Prisma.$CellPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        type: $Enums.FieldType;
        order: number;
        tableId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["field"]
    >;
    composites: {};
  };

  type FieldGetPayload<
    S extends boolean | null | undefined | FieldDefaultArgs,
  > = $Result.GetResult<Prisma.$FieldPayload, S>;

  type FieldCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<FieldFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: FieldCountAggregateInputType | true;
  };

  export interface FieldDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Field"];
      meta: { name: "Field" };
    };
    /**
     * Find zero or one Field that matches the filter.
     * @param {FieldFindUniqueArgs} args - Arguments to find a Field
     * @example
     * // Get one Field
     * const field = await prisma.field.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FieldFindUniqueArgs>(
      args: SelectSubset<T, FieldFindUniqueArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Field that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FieldFindUniqueOrThrowArgs} args - Arguments to find a Field
     * @example
     * // Get one Field
     * const field = await prisma.field.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FieldFindUniqueOrThrowArgs>(
      args: SelectSubset<T, FieldFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Field that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFindFirstArgs} args - Arguments to find a Field
     * @example
     * // Get one Field
     * const field = await prisma.field.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FieldFindFirstArgs>(
      args?: SelectSubset<T, FieldFindFirstArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Field that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFindFirstOrThrowArgs} args - Arguments to find a Field
     * @example
     * // Get one Field
     * const field = await prisma.field.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FieldFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FieldFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Fields that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fields
     * const fields = await prisma.field.findMany()
     *
     * // Get first 10 Fields
     * const fields = await prisma.field.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const fieldWithIdOnly = await prisma.field.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FieldFindManyArgs>(
      args?: SelectSubset<T, FieldFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Field.
     * @param {FieldCreateArgs} args - Arguments to create a Field.
     * @example
     * // Create one Field
     * const Field = await prisma.field.create({
     *   data: {
     *     // ... data to create a Field
     *   }
     * })
     *
     */
    create<T extends FieldCreateArgs>(
      args: SelectSubset<T, FieldCreateArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Fields.
     * @param {FieldCreateManyArgs} args - Arguments to create many Fields.
     * @example
     * // Create many Fields
     * const field = await prisma.field.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FieldCreateManyArgs>(
      args?: SelectSubset<T, FieldCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Fields and returns the data saved in the database.
     * @param {FieldCreateManyAndReturnArgs} args - Arguments to create many Fields.
     * @example
     * // Create many Fields
     * const field = await prisma.field.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Fields and only return the `id`
     * const fieldWithIdOnly = await prisma.field.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FieldCreateManyAndReturnArgs>(
      args?: SelectSubset<T, FieldCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Field.
     * @param {FieldDeleteArgs} args - Arguments to delete one Field.
     * @example
     * // Delete one Field
     * const Field = await prisma.field.delete({
     *   where: {
     *     // ... filter to delete one Field
     *   }
     * })
     *
     */
    delete<T extends FieldDeleteArgs>(
      args: SelectSubset<T, FieldDeleteArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Field.
     * @param {FieldUpdateArgs} args - Arguments to update one Field.
     * @example
     * // Update one Field
     * const field = await prisma.field.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FieldUpdateArgs>(
      args: SelectSubset<T, FieldUpdateArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Fields.
     * @param {FieldDeleteManyArgs} args - Arguments to filter Fields to delete.
     * @example
     * // Delete a few Fields
     * const { count } = await prisma.field.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FieldDeleteManyArgs>(
      args?: SelectSubset<T, FieldDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Fields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fields
     * const field = await prisma.field.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FieldUpdateManyArgs>(
      args: SelectSubset<T, FieldUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Fields and returns the data updated in the database.
     * @param {FieldUpdateManyAndReturnArgs} args - Arguments to update many Fields.
     * @example
     * // Update many Fields
     * const field = await prisma.field.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Fields and only return the `id`
     * const fieldWithIdOnly = await prisma.field.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends FieldUpdateManyAndReturnArgs>(
      args: SelectSubset<T, FieldUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Field.
     * @param {FieldUpsertArgs} args - Arguments to update or create a Field.
     * @example
     * // Update or create a Field
     * const field = await prisma.field.upsert({
     *   create: {
     *     // ... data to create a Field
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Field we want to update
     *   }
     * })
     */
    upsert<T extends FieldUpsertArgs>(
      args: SelectSubset<T, FieldUpsertArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      $Result.GetResult<
        Prisma.$FieldPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Fields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldCountArgs} args - Arguments to filter Fields to count.
     * @example
     * // Count the number of Fields
     * const count = await prisma.field.count({
     *   where: {
     *     // ... the filter for the Fields we want to count
     *   }
     * })
     **/
    count<T extends FieldCountArgs>(
      args?: Subset<T, FieldCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], FieldCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Field.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends FieldAggregateArgs>(
      args: Subset<T, FieldAggregateArgs>,
    ): Prisma.PrismaPromise<GetFieldAggregateType<T>>;

    /**
     * Group by Field.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends FieldGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FieldGroupByArgs["orderBy"] }
        : { orderBy?: FieldGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, FieldGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetFieldGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Field model
     */
    readonly fields: FieldFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Field.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FieldClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    table<T extends TableDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TableDefaultArgs<ExtArgs>>,
    ): Prisma__TableClient<
      | $Result.GetResult<
          Prisma.$TablePayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    cells<T extends Field$cellsArgs<ExtArgs> = {}>(
      args?: Subset<T, Field$cellsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$CellPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Field model
   */
  interface FieldFieldRefs {
    readonly id: FieldRef<"Field", "String">;
    readonly name: FieldRef<"Field", "String">;
    readonly type: FieldRef<"Field", "FieldType">;
    readonly order: FieldRef<"Field", "Int">;
    readonly tableId: FieldRef<"Field", "String">;
    readonly createdAt: FieldRef<"Field", "DateTime">;
    readonly updatedAt: FieldRef<"Field", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Field findUnique
   */
  export type FieldFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * Filter, which Field to fetch.
     */
    where: FieldWhereUniqueInput;
  };

  /**
   * Field findUniqueOrThrow
   */
  export type FieldFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * Filter, which Field to fetch.
     */
    where: FieldWhereUniqueInput;
  };

  /**
   * Field findFirst
   */
  export type FieldFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * Filter, which Field to fetch.
     */
    where?: FieldWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Fields to fetch.
     */
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Fields.
     */
    cursor?: FieldWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Fields from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Fields.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Fields.
     */
    distinct?: FieldScalarFieldEnum | FieldScalarFieldEnum[];
  };

  /**
   * Field findFirstOrThrow
   */
  export type FieldFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * Filter, which Field to fetch.
     */
    where?: FieldWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Fields to fetch.
     */
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Fields.
     */
    cursor?: FieldWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Fields from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Fields.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Fields.
     */
    distinct?: FieldScalarFieldEnum | FieldScalarFieldEnum[];
  };

  /**
   * Field findMany
   */
  export type FieldFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * Filter, which Fields to fetch.
     */
    where?: FieldWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Fields to fetch.
     */
    orderBy?: FieldOrderByWithRelationInput | FieldOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Fields.
     */
    cursor?: FieldWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Fields from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Fields.
     */
    skip?: number;
    distinct?: FieldScalarFieldEnum | FieldScalarFieldEnum[];
  };

  /**
   * Field create
   */
  export type FieldCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * The data needed to create a Field.
     */
    data: XOR<FieldCreateInput, FieldUncheckedCreateInput>;
  };

  /**
   * Field createMany
   */
  export type FieldCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Fields.
     */
    data: FieldCreateManyInput | FieldCreateManyInput[];
  };

  /**
   * Field createManyAndReturn
   */
  export type FieldCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * The data used to create many Fields.
     */
    data: FieldCreateManyInput | FieldCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Field update
   */
  export type FieldUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * The data needed to update a Field.
     */
    data: XOR<FieldUpdateInput, FieldUncheckedUpdateInput>;
    /**
     * Choose, which Field to update.
     */
    where: FieldWhereUniqueInput;
  };

  /**
   * Field updateMany
   */
  export type FieldUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Fields.
     */
    data: XOR<FieldUpdateManyMutationInput, FieldUncheckedUpdateManyInput>;
    /**
     * Filter which Fields to update
     */
    where?: FieldWhereInput;
    /**
     * Limit how many Fields to update.
     */
    limit?: number;
  };

  /**
   * Field updateManyAndReturn
   */
  export type FieldUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * The data used to update Fields.
     */
    data: XOR<FieldUpdateManyMutationInput, FieldUncheckedUpdateManyInput>;
    /**
     * Filter which Fields to update
     */
    where?: FieldWhereInput;
    /**
     * Limit how many Fields to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Field upsert
   */
  export type FieldUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * The filter to search for the Field to update in case it exists.
     */
    where: FieldWhereUniqueInput;
    /**
     * In case the Field found by the `where` argument doesn't exist, create a new Field with this data.
     */
    create: XOR<FieldCreateInput, FieldUncheckedCreateInput>;
    /**
     * In case the Field was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FieldUpdateInput, FieldUncheckedUpdateInput>;
  };

  /**
   * Field delete
   */
  export type FieldDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
    /**
     * Filter which Field to delete.
     */
    where: FieldWhereUniqueInput;
  };

  /**
   * Field deleteMany
   */
  export type FieldDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Fields to delete
     */
    where?: FieldWhereInput;
    /**
     * Limit how many Fields to delete.
     */
    limit?: number;
  };

  /**
   * Field.cells
   */
  export type Field$cellsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    where?: CellWhereInput;
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[];
    cursor?: CellWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[];
  };

  /**
   * Field without action
   */
  export type FieldDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Field
     */
    select?: FieldSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Field
     */
    omit?: FieldOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FieldInclude<ExtArgs> | null;
  };

  /**
   * Model Row
   */

  export type AggregateRow = {
    _count: RowCountAggregateOutputType | null;
    _avg: RowAvgAggregateOutputType | null;
    _sum: RowSumAggregateOutputType | null;
    _min: RowMinAggregateOutputType | null;
    _max: RowMaxAggregateOutputType | null;
  };

  export type RowAvgAggregateOutputType = {
    order: number | null;
  };

  export type RowSumAggregateOutputType = {
    order: number | null;
  };

  export type RowMinAggregateOutputType = {
    id: string | null;
    order: number | null;
    tableId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RowMaxAggregateOutputType = {
    id: string | null;
    order: number | null;
    tableId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RowCountAggregateOutputType = {
    id: number;
    order: number;
    tableId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type RowAvgAggregateInputType = {
    order?: true;
  };

  export type RowSumAggregateInputType = {
    order?: true;
  };

  export type RowMinAggregateInputType = {
    id?: true;
    order?: true;
    tableId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RowMaxAggregateInputType = {
    id?: true;
    order?: true;
    tableId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RowCountAggregateInputType = {
    id?: true;
    order?: true;
    tableId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type RowAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Row to aggregate.
     */
    where?: RowWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rows to fetch.
     */
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RowWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rows from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rows.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Rows
     **/
    _count?: true | RowCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RowAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RowSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RowMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RowMaxAggregateInputType;
  };

  export type GetRowAggregateType<T extends RowAggregateArgs> = {
    [P in keyof T & keyof AggregateRow]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRow[P]>
      : GetScalarType<T[P], AggregateRow[P]>;
  };

  export type RowGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RowWhereInput;
    orderBy?: RowOrderByWithAggregationInput | RowOrderByWithAggregationInput[];
    by: RowScalarFieldEnum[] | RowScalarFieldEnum;
    having?: RowScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RowCountAggregateInputType | true;
    _avg?: RowAvgAggregateInputType;
    _sum?: RowSumAggregateInputType;
    _min?: RowMinAggregateInputType;
    _max?: RowMaxAggregateInputType;
  };

  export type RowGroupByOutputType = {
    id: string;
    order: number;
    tableId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: RowCountAggregateOutputType | null;
    _avg: RowAvgAggregateOutputType | null;
    _sum: RowSumAggregateOutputType | null;
    _min: RowMinAggregateOutputType | null;
    _max: RowMaxAggregateOutputType | null;
  };

  type GetRowGroupByPayload<T extends RowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RowGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof RowGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], RowGroupByOutputType[P]>
          : GetScalarType<T[P], RowGroupByOutputType[P]>;
      }
    >
  >;

  export type RowSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      order?: boolean;
      tableId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
      cells?: boolean | Row$cellsArgs<ExtArgs>;
      _count?: boolean | RowCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["row"]
  >;

  export type RowSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      order?: boolean;
      tableId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["row"]
  >;

  export type RowSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      order?: boolean;
      tableId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["row"]
  >;

  export type RowSelectScalar = {
    id?: boolean;
    order?: boolean;
    tableId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type RowOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "order" | "tableId" | "createdAt" | "updatedAt",
    ExtArgs["result"]["row"]
  >;
  export type RowInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
    cells?: boolean | Row$cellsArgs<ExtArgs>;
    _count?: boolean | RowCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type RowIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
  };
  export type RowIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
  };

  export type $RowPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Row";
    objects: {
      table: Prisma.$TablePayload<ExtArgs>;
      cells: Prisma.$CellPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        order: number;
        tableId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["row"]
    >;
    composites: {};
  };

  type RowGetPayload<S extends boolean | null | undefined | RowDefaultArgs> =
    $Result.GetResult<Prisma.$RowPayload, S>;

  type RowCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<RowFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: RowCountAggregateInputType | true;
  };

  export interface RowDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Row"];
      meta: { name: "Row" };
    };
    /**
     * Find zero or one Row that matches the filter.
     * @param {RowFindUniqueArgs} args - Arguments to find a Row
     * @example
     * // Get one Row
     * const row = await prisma.row.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RowFindUniqueArgs>(
      args: SelectSubset<T, RowFindUniqueArgs<ExtArgs>>,
    ): Prisma__RowClient<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Row that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RowFindUniqueOrThrowArgs} args - Arguments to find a Row
     * @example
     * // Get one Row
     * const row = await prisma.row.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RowFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RowFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RowClient<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Row that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RowFindFirstArgs} args - Arguments to find a Row
     * @example
     * // Get one Row
     * const row = await prisma.row.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RowFindFirstArgs>(
      args?: SelectSubset<T, RowFindFirstArgs<ExtArgs>>,
    ): Prisma__RowClient<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Row that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RowFindFirstOrThrowArgs} args - Arguments to find a Row
     * @example
     * // Get one Row
     * const row = await prisma.row.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RowFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RowFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RowClient<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Rows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rows
     * const rows = await prisma.row.findMany()
     *
     * // Get first 10 Rows
     * const rows = await prisma.row.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const rowWithIdOnly = await prisma.row.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RowFindManyArgs>(
      args?: SelectSubset<T, RowFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Row.
     * @param {RowCreateArgs} args - Arguments to create a Row.
     * @example
     * // Create one Row
     * const Row = await prisma.row.create({
     *   data: {
     *     // ... data to create a Row
     *   }
     * })
     *
     */
    create<T extends RowCreateArgs>(
      args: SelectSubset<T, RowCreateArgs<ExtArgs>>,
    ): Prisma__RowClient<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Rows.
     * @param {RowCreateManyArgs} args - Arguments to create many Rows.
     * @example
     * // Create many Rows
     * const row = await prisma.row.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RowCreateManyArgs>(
      args?: SelectSubset<T, RowCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Rows and returns the data saved in the database.
     * @param {RowCreateManyAndReturnArgs} args - Arguments to create many Rows.
     * @example
     * // Create many Rows
     * const row = await prisma.row.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Rows and only return the `id`
     * const rowWithIdOnly = await prisma.row.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RowCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RowCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Row.
     * @param {RowDeleteArgs} args - Arguments to delete one Row.
     * @example
     * // Delete one Row
     * const Row = await prisma.row.delete({
     *   where: {
     *     // ... filter to delete one Row
     *   }
     * })
     *
     */
    delete<T extends RowDeleteArgs>(
      args: SelectSubset<T, RowDeleteArgs<ExtArgs>>,
    ): Prisma__RowClient<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Row.
     * @param {RowUpdateArgs} args - Arguments to update one Row.
     * @example
     * // Update one Row
     * const row = await prisma.row.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RowUpdateArgs>(
      args: SelectSubset<T, RowUpdateArgs<ExtArgs>>,
    ): Prisma__RowClient<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Rows.
     * @param {RowDeleteManyArgs} args - Arguments to filter Rows to delete.
     * @example
     * // Delete a few Rows
     * const { count } = await prisma.row.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RowDeleteManyArgs>(
      args?: SelectSubset<T, RowDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Rows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rows
     * const row = await prisma.row.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RowUpdateManyArgs>(
      args: SelectSubset<T, RowUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Rows and returns the data updated in the database.
     * @param {RowUpdateManyAndReturnArgs} args - Arguments to update many Rows.
     * @example
     * // Update many Rows
     * const row = await prisma.row.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Rows and only return the `id`
     * const rowWithIdOnly = await prisma.row.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RowUpdateManyAndReturnArgs>(
      args: SelectSubset<T, RowUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Row.
     * @param {RowUpsertArgs} args - Arguments to update or create a Row.
     * @example
     * // Update or create a Row
     * const row = await prisma.row.upsert({
     *   create: {
     *     // ... data to create a Row
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Row we want to update
     *   }
     * })
     */
    upsert<T extends RowUpsertArgs>(
      args: SelectSubset<T, RowUpsertArgs<ExtArgs>>,
    ): Prisma__RowClient<
      $Result.GetResult<
        Prisma.$RowPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Rows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RowCountArgs} args - Arguments to filter Rows to count.
     * @example
     * // Count the number of Rows
     * const count = await prisma.row.count({
     *   where: {
     *     // ... the filter for the Rows we want to count
     *   }
     * })
     **/
    count<T extends RowCountArgs>(
      args?: Subset<T, RowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], RowCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Row.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RowAggregateArgs>(
      args: Subset<T, RowAggregateArgs>,
    ): Prisma.PrismaPromise<GetRowAggregateType<T>>;

    /**
     * Group by Row.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RowGroupByArgs["orderBy"] }
        : { orderBy?: RowGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RowGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetRowGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Row model
     */
    readonly fields: RowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Row.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RowClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    table<T extends TableDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TableDefaultArgs<ExtArgs>>,
    ): Prisma__TableClient<
      | $Result.GetResult<
          Prisma.$TablePayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    cells<T extends Row$cellsArgs<ExtArgs> = {}>(
      args?: Subset<T, Row$cellsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$CellPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Row model
   */
  interface RowFieldRefs {
    readonly id: FieldRef<"Row", "String">;
    readonly order: FieldRef<"Row", "Int">;
    readonly tableId: FieldRef<"Row", "String">;
    readonly createdAt: FieldRef<"Row", "DateTime">;
    readonly updatedAt: FieldRef<"Row", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Row findUnique
   */
  export type RowFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * Filter, which Row to fetch.
     */
    where: RowWhereUniqueInput;
  };

  /**
   * Row findUniqueOrThrow
   */
  export type RowFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * Filter, which Row to fetch.
     */
    where: RowWhereUniqueInput;
  };

  /**
   * Row findFirst
   */
  export type RowFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * Filter, which Row to fetch.
     */
    where?: RowWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rows to fetch.
     */
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rows.
     */
    cursor?: RowWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rows from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rows.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rows.
     */
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[];
  };

  /**
   * Row findFirstOrThrow
   */
  export type RowFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * Filter, which Row to fetch.
     */
    where?: RowWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rows to fetch.
     */
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rows.
     */
    cursor?: RowWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rows from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rows.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rows.
     */
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[];
  };

  /**
   * Row findMany
   */
  export type RowFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * Filter, which Rows to fetch.
     */
    where?: RowWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rows to fetch.
     */
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Rows.
     */
    cursor?: RowWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rows from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rows.
     */
    skip?: number;
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[];
  };

  /**
   * Row create
   */
  export type RowCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * The data needed to create a Row.
     */
    data: XOR<RowCreateInput, RowUncheckedCreateInput>;
  };

  /**
   * Row createMany
   */
  export type RowCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Rows.
     */
    data: RowCreateManyInput | RowCreateManyInput[];
  };

  /**
   * Row createManyAndReturn
   */
  export type RowCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * The data used to create many Rows.
     */
    data: RowCreateManyInput | RowCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Row update
   */
  export type RowUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * The data needed to update a Row.
     */
    data: XOR<RowUpdateInput, RowUncheckedUpdateInput>;
    /**
     * Choose, which Row to update.
     */
    where: RowWhereUniqueInput;
  };

  /**
   * Row updateMany
   */
  export type RowUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Rows.
     */
    data: XOR<RowUpdateManyMutationInput, RowUncheckedUpdateManyInput>;
    /**
     * Filter which Rows to update
     */
    where?: RowWhereInput;
    /**
     * Limit how many Rows to update.
     */
    limit?: number;
  };

  /**
   * Row updateManyAndReturn
   */
  export type RowUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * The data used to update Rows.
     */
    data: XOR<RowUpdateManyMutationInput, RowUncheckedUpdateManyInput>;
    /**
     * Filter which Rows to update
     */
    where?: RowWhereInput;
    /**
     * Limit how many Rows to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Row upsert
   */
  export type RowUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * The filter to search for the Row to update in case it exists.
     */
    where: RowWhereUniqueInput;
    /**
     * In case the Row found by the `where` argument doesn't exist, create a new Row with this data.
     */
    create: XOR<RowCreateInput, RowUncheckedCreateInput>;
    /**
     * In case the Row was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RowUpdateInput, RowUncheckedUpdateInput>;
  };

  /**
   * Row delete
   */
  export type RowDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
    /**
     * Filter which Row to delete.
     */
    where: RowWhereUniqueInput;
  };

  /**
   * Row deleteMany
   */
  export type RowDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Rows to delete
     */
    where?: RowWhereInput;
    /**
     * Limit how many Rows to delete.
     */
    limit?: number;
  };

  /**
   * Row.cells
   */
  export type Row$cellsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    where?: CellWhereInput;
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[];
    cursor?: CellWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[];
  };

  /**
   * Row without action
   */
  export type RowDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null;
  };

  /**
   * Model Cell
   */

  export type AggregateCell = {
    _count: CellCountAggregateOutputType | null;
    _min: CellMinAggregateOutputType | null;
    _max: CellMaxAggregateOutputType | null;
  };

  export type CellMinAggregateOutputType = {
    id: string | null;
    value: string | null;
    rowId: string | null;
    fieldId: string | null;
  };

  export type CellMaxAggregateOutputType = {
    id: string | null;
    value: string | null;
    rowId: string | null;
    fieldId: string | null;
  };

  export type CellCountAggregateOutputType = {
    id: number;
    value: number;
    rowId: number;
    fieldId: number;
    _all: number;
  };

  export type CellMinAggregateInputType = {
    id?: true;
    value?: true;
    rowId?: true;
    fieldId?: true;
  };

  export type CellMaxAggregateInputType = {
    id?: true;
    value?: true;
    rowId?: true;
    fieldId?: true;
  };

  export type CellCountAggregateInputType = {
    id?: true;
    value?: true;
    rowId?: true;
    fieldId?: true;
    _all?: true;
  };

  export type CellAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Cell to aggregate.
     */
    where?: CellWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Cells to fetch.
     */
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CellWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Cells from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Cells.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Cells
     **/
    _count?: true | CellCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CellMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CellMaxAggregateInputType;
  };

  export type GetCellAggregateType<T extends CellAggregateArgs> = {
    [P in keyof T & keyof AggregateCell]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCell[P]>
      : GetScalarType<T[P], AggregateCell[P]>;
  };

  export type CellGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CellWhereInput;
    orderBy?:
      | CellOrderByWithAggregationInput
      | CellOrderByWithAggregationInput[];
    by: CellScalarFieldEnum[] | CellScalarFieldEnum;
    having?: CellScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CellCountAggregateInputType | true;
    _min?: CellMinAggregateInputType;
    _max?: CellMaxAggregateInputType;
  };

  export type CellGroupByOutputType = {
    id: string;
    value: string | null;
    rowId: string;
    fieldId: string;
    _count: CellCountAggregateOutputType | null;
    _min: CellMinAggregateOutputType | null;
    _max: CellMaxAggregateOutputType | null;
  };

  type GetCellGroupByPayload<T extends CellGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CellGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof CellGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], CellGroupByOutputType[P]>
          : GetScalarType<T[P], CellGroupByOutputType[P]>;
      }
    >
  >;

  export type CellSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      value?: boolean;
      rowId?: boolean;
      fieldId?: boolean;
      row?: boolean | RowDefaultArgs<ExtArgs>;
      field?: boolean | FieldDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["cell"]
  >;

  export type CellSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      value?: boolean;
      rowId?: boolean;
      fieldId?: boolean;
      row?: boolean | RowDefaultArgs<ExtArgs>;
      field?: boolean | FieldDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["cell"]
  >;

  export type CellSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      value?: boolean;
      rowId?: boolean;
      fieldId?: boolean;
      row?: boolean | RowDefaultArgs<ExtArgs>;
      field?: boolean | FieldDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["cell"]
  >;

  export type CellSelectScalar = {
    id?: boolean;
    value?: boolean;
    rowId?: boolean;
    fieldId?: boolean;
  };

  export type CellOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "value" | "rowId" | "fieldId",
    ExtArgs["result"]["cell"]
  >;
  export type CellInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    row?: boolean | RowDefaultArgs<ExtArgs>;
    field?: boolean | FieldDefaultArgs<ExtArgs>;
  };
  export type CellIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    row?: boolean | RowDefaultArgs<ExtArgs>;
    field?: boolean | FieldDefaultArgs<ExtArgs>;
  };
  export type CellIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    row?: boolean | RowDefaultArgs<ExtArgs>;
    field?: boolean | FieldDefaultArgs<ExtArgs>;
  };

  export type $CellPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Cell";
    objects: {
      row: Prisma.$RowPayload<ExtArgs>;
      field: Prisma.$FieldPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        value: string | null;
        rowId: string;
        fieldId: string;
      },
      ExtArgs["result"]["cell"]
    >;
    composites: {};
  };

  type CellGetPayload<S extends boolean | null | undefined | CellDefaultArgs> =
    $Result.GetResult<Prisma.$CellPayload, S>;

  type CellCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<CellFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: CellCountAggregateInputType | true;
  };

  export interface CellDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Cell"];
      meta: { name: "Cell" };
    };
    /**
     * Find zero or one Cell that matches the filter.
     * @param {CellFindUniqueArgs} args - Arguments to find a Cell
     * @example
     * // Get one Cell
     * const cell = await prisma.cell.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CellFindUniqueArgs>(
      args: SelectSubset<T, CellFindUniqueArgs<ExtArgs>>,
    ): Prisma__CellClient<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Cell that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CellFindUniqueOrThrowArgs} args - Arguments to find a Cell
     * @example
     * // Get one Cell
     * const cell = await prisma.cell.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CellFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CellFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CellClient<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Cell that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CellFindFirstArgs} args - Arguments to find a Cell
     * @example
     * // Get one Cell
     * const cell = await prisma.cell.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CellFindFirstArgs>(
      args?: SelectSubset<T, CellFindFirstArgs<ExtArgs>>,
    ): Prisma__CellClient<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Cell that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CellFindFirstOrThrowArgs} args - Arguments to find a Cell
     * @example
     * // Get one Cell
     * const cell = await prisma.cell.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CellFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CellFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CellClient<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Cells that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CellFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cells
     * const cells = await prisma.cell.findMany()
     *
     * // Get first 10 Cells
     * const cells = await prisma.cell.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const cellWithIdOnly = await prisma.cell.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CellFindManyArgs>(
      args?: SelectSubset<T, CellFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Cell.
     * @param {CellCreateArgs} args - Arguments to create a Cell.
     * @example
     * // Create one Cell
     * const Cell = await prisma.cell.create({
     *   data: {
     *     // ... data to create a Cell
     *   }
     * })
     *
     */
    create<T extends CellCreateArgs>(
      args: SelectSubset<T, CellCreateArgs<ExtArgs>>,
    ): Prisma__CellClient<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Cells.
     * @param {CellCreateManyArgs} args - Arguments to create many Cells.
     * @example
     * // Create many Cells
     * const cell = await prisma.cell.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CellCreateManyArgs>(
      args?: SelectSubset<T, CellCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Cells and returns the data saved in the database.
     * @param {CellCreateManyAndReturnArgs} args - Arguments to create many Cells.
     * @example
     * // Create many Cells
     * const cell = await prisma.cell.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Cells and only return the `id`
     * const cellWithIdOnly = await prisma.cell.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CellCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CellCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Cell.
     * @param {CellDeleteArgs} args - Arguments to delete one Cell.
     * @example
     * // Delete one Cell
     * const Cell = await prisma.cell.delete({
     *   where: {
     *     // ... filter to delete one Cell
     *   }
     * })
     *
     */
    delete<T extends CellDeleteArgs>(
      args: SelectSubset<T, CellDeleteArgs<ExtArgs>>,
    ): Prisma__CellClient<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Cell.
     * @param {CellUpdateArgs} args - Arguments to update one Cell.
     * @example
     * // Update one Cell
     * const cell = await prisma.cell.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CellUpdateArgs>(
      args: SelectSubset<T, CellUpdateArgs<ExtArgs>>,
    ): Prisma__CellClient<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Cells.
     * @param {CellDeleteManyArgs} args - Arguments to filter Cells to delete.
     * @example
     * // Delete a few Cells
     * const { count } = await prisma.cell.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CellDeleteManyArgs>(
      args?: SelectSubset<T, CellDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Cells.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CellUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cells
     * const cell = await prisma.cell.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CellUpdateManyArgs>(
      args: SelectSubset<T, CellUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Cells and returns the data updated in the database.
     * @param {CellUpdateManyAndReturnArgs} args - Arguments to update many Cells.
     * @example
     * // Update many Cells
     * const cell = await prisma.cell.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Cells and only return the `id`
     * const cellWithIdOnly = await prisma.cell.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CellUpdateManyAndReturnArgs>(
      args: SelectSubset<T, CellUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Cell.
     * @param {CellUpsertArgs} args - Arguments to update or create a Cell.
     * @example
     * // Update or create a Cell
     * const cell = await prisma.cell.upsert({
     *   create: {
     *     // ... data to create a Cell
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cell we want to update
     *   }
     * })
     */
    upsert<T extends CellUpsertArgs>(
      args: SelectSubset<T, CellUpsertArgs<ExtArgs>>,
    ): Prisma__CellClient<
      $Result.GetResult<
        Prisma.$CellPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Cells.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CellCountArgs} args - Arguments to filter Cells to count.
     * @example
     * // Count the number of Cells
     * const count = await prisma.cell.count({
     *   where: {
     *     // ... the filter for the Cells we want to count
     *   }
     * })
     **/
    count<T extends CellCountArgs>(
      args?: Subset<T, CellCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], CellCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Cell.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CellAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CellAggregateArgs>(
      args: Subset<T, CellAggregateArgs>,
    ): Prisma.PrismaPromise<GetCellAggregateType<T>>;

    /**
     * Group by Cell.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CellGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CellGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CellGroupByArgs["orderBy"] }
        : { orderBy?: CellGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CellGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetCellGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Cell model
     */
    readonly fields: CellFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cell.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CellClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    row<T extends RowDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RowDefaultArgs<ExtArgs>>,
    ): Prisma__RowClient<
      | $Result.GetResult<
          Prisma.$RowPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    field<T extends FieldDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, FieldDefaultArgs<ExtArgs>>,
    ): Prisma__FieldClient<
      | $Result.GetResult<
          Prisma.$FieldPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Cell model
   */
  interface CellFieldRefs {
    readonly id: FieldRef<"Cell", "String">;
    readonly value: FieldRef<"Cell", "String">;
    readonly rowId: FieldRef<"Cell", "String">;
    readonly fieldId: FieldRef<"Cell", "String">;
  }

  // Custom InputTypes
  /**
   * Cell findUnique
   */
  export type CellFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * Filter, which Cell to fetch.
     */
    where: CellWhereUniqueInput;
  };

  /**
   * Cell findUniqueOrThrow
   */
  export type CellFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * Filter, which Cell to fetch.
     */
    where: CellWhereUniqueInput;
  };

  /**
   * Cell findFirst
   */
  export type CellFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * Filter, which Cell to fetch.
     */
    where?: CellWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Cells to fetch.
     */
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Cells.
     */
    cursor?: CellWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Cells from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Cells.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Cells.
     */
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[];
  };

  /**
   * Cell findFirstOrThrow
   */
  export type CellFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * Filter, which Cell to fetch.
     */
    where?: CellWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Cells to fetch.
     */
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Cells.
     */
    cursor?: CellWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Cells from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Cells.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Cells.
     */
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[];
  };

  /**
   * Cell findMany
   */
  export type CellFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * Filter, which Cells to fetch.
     */
    where?: CellWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Cells to fetch.
     */
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Cells.
     */
    cursor?: CellWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Cells from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Cells.
     */
    skip?: number;
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[];
  };

  /**
   * Cell create
   */
  export type CellCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * The data needed to create a Cell.
     */
    data: XOR<CellCreateInput, CellUncheckedCreateInput>;
  };

  /**
   * Cell createMany
   */
  export type CellCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Cells.
     */
    data: CellCreateManyInput | CellCreateManyInput[];
  };

  /**
   * Cell createManyAndReturn
   */
  export type CellCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * The data used to create many Cells.
     */
    data: CellCreateManyInput | CellCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Cell update
   */
  export type CellUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * The data needed to update a Cell.
     */
    data: XOR<CellUpdateInput, CellUncheckedUpdateInput>;
    /**
     * Choose, which Cell to update.
     */
    where: CellWhereUniqueInput;
  };

  /**
   * Cell updateMany
   */
  export type CellUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Cells.
     */
    data: XOR<CellUpdateManyMutationInput, CellUncheckedUpdateManyInput>;
    /**
     * Filter which Cells to update
     */
    where?: CellWhereInput;
    /**
     * Limit how many Cells to update.
     */
    limit?: number;
  };

  /**
   * Cell updateManyAndReturn
   */
  export type CellUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * The data used to update Cells.
     */
    data: XOR<CellUpdateManyMutationInput, CellUncheckedUpdateManyInput>;
    /**
     * Filter which Cells to update
     */
    where?: CellWhereInput;
    /**
     * Limit how many Cells to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Cell upsert
   */
  export type CellUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * The filter to search for the Cell to update in case it exists.
     */
    where: CellWhereUniqueInput;
    /**
     * In case the Cell found by the `where` argument doesn't exist, create a new Cell with this data.
     */
    create: XOR<CellCreateInput, CellUncheckedCreateInput>;
    /**
     * In case the Cell was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CellUpdateInput, CellUncheckedUpdateInput>;
  };

  /**
   * Cell delete
   */
  export type CellDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
    /**
     * Filter which Cell to delete.
     */
    where: CellWhereUniqueInput;
  };

  /**
   * Cell deleteMany
   */
  export type CellDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Cells to delete
     */
    where?: CellWhereInput;
    /**
     * Limit how many Cells to delete.
     */
    limit?: number;
  };

  /**
   * Cell without action
   */
  export type CellDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const TableScalarFieldEnum: {
    id: "id";
    name: "name";
    order: "order";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type TableScalarFieldEnum =
    (typeof TableScalarFieldEnum)[keyof typeof TableScalarFieldEnum];

  export const FieldScalarFieldEnum: {
    id: "id";
    name: "name";
    type: "type";
    order: "order";
    tableId: "tableId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type FieldScalarFieldEnum =
    (typeof FieldScalarFieldEnum)[keyof typeof FieldScalarFieldEnum];

  export const RowScalarFieldEnum: {
    id: "id";
    order: "order";
    tableId: "tableId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type RowScalarFieldEnum =
    (typeof RowScalarFieldEnum)[keyof typeof RowScalarFieldEnum];

  export const CellScalarFieldEnum: {
    id: "id";
    value: "value";
    rowId: "rowId";
    fieldId: "fieldId";
  };

  export type CellScalarFieldEnum =
    (typeof CellScalarFieldEnum)[keyof typeof CellScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'FieldType'
   */
  export type EnumFieldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "FieldType"
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Deep Input Types
   */

  export type TableWhereInput = {
    AND?: TableWhereInput | TableWhereInput[];
    OR?: TableWhereInput[];
    NOT?: TableWhereInput | TableWhereInput[];
    id?: StringFilter<"Table"> | string;
    name?: StringFilter<"Table"> | string;
    order?: IntFilter<"Table"> | number;
    createdAt?: DateTimeFilter<"Table"> | Date | string;
    updatedAt?: DateTimeFilter<"Table"> | Date | string;
    fields?: FieldListRelationFilter;
    rows?: RowListRelationFilter;
  };

  export type TableOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    order?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    fields?: FieldOrderByRelationAggregateInput;
    rows?: RowOrderByRelationAggregateInput;
  };

  export type TableWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: TableWhereInput | TableWhereInput[];
      OR?: TableWhereInput[];
      NOT?: TableWhereInput | TableWhereInput[];
      name?: StringFilter<"Table"> | string;
      order?: IntFilter<"Table"> | number;
      createdAt?: DateTimeFilter<"Table"> | Date | string;
      updatedAt?: DateTimeFilter<"Table"> | Date | string;
      fields?: FieldListRelationFilter;
      rows?: RowListRelationFilter;
    },
    "id"
  >;

  export type TableOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    order?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: TableCountOrderByAggregateInput;
    _avg?: TableAvgOrderByAggregateInput;
    _max?: TableMaxOrderByAggregateInput;
    _min?: TableMinOrderByAggregateInput;
    _sum?: TableSumOrderByAggregateInput;
  };

  export type TableScalarWhereWithAggregatesInput = {
    AND?:
      | TableScalarWhereWithAggregatesInput
      | TableScalarWhereWithAggregatesInput[];
    OR?: TableScalarWhereWithAggregatesInput[];
    NOT?:
      | TableScalarWhereWithAggregatesInput
      | TableScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Table"> | string;
    name?: StringWithAggregatesFilter<"Table"> | string;
    order?: IntWithAggregatesFilter<"Table"> | number;
    createdAt?: DateTimeWithAggregatesFilter<"Table"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Table"> | Date | string;
  };

  export type FieldWhereInput = {
    AND?: FieldWhereInput | FieldWhereInput[];
    OR?: FieldWhereInput[];
    NOT?: FieldWhereInput | FieldWhereInput[];
    id?: StringFilter<"Field"> | string;
    name?: StringFilter<"Field"> | string;
    type?: EnumFieldTypeFilter<"Field"> | $Enums.FieldType;
    order?: IntFilter<"Field"> | number;
    tableId?: StringFilter<"Field"> | string;
    createdAt?: DateTimeFilter<"Field"> | Date | string;
    updatedAt?: DateTimeFilter<"Field"> | Date | string;
    table?: XOR<TableScalarRelationFilter, TableWhereInput>;
    cells?: CellListRelationFilter;
  };

  export type FieldOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    table?: TableOrderByWithRelationInput;
    cells?: CellOrderByRelationAggregateInput;
  };

  export type FieldWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      tableId_name?: FieldTableIdNameCompoundUniqueInput;
      AND?: FieldWhereInput | FieldWhereInput[];
      OR?: FieldWhereInput[];
      NOT?: FieldWhereInput | FieldWhereInput[];
      name?: StringFilter<"Field"> | string;
      type?: EnumFieldTypeFilter<"Field"> | $Enums.FieldType;
      order?: IntFilter<"Field"> | number;
      tableId?: StringFilter<"Field"> | string;
      createdAt?: DateTimeFilter<"Field"> | Date | string;
      updatedAt?: DateTimeFilter<"Field"> | Date | string;
      table?: XOR<TableScalarRelationFilter, TableWhereInput>;
      cells?: CellListRelationFilter;
    },
    "id" | "tableId_name"
  >;

  export type FieldOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: FieldCountOrderByAggregateInput;
    _avg?: FieldAvgOrderByAggregateInput;
    _max?: FieldMaxOrderByAggregateInput;
    _min?: FieldMinOrderByAggregateInput;
    _sum?: FieldSumOrderByAggregateInput;
  };

  export type FieldScalarWhereWithAggregatesInput = {
    AND?:
      | FieldScalarWhereWithAggregatesInput
      | FieldScalarWhereWithAggregatesInput[];
    OR?: FieldScalarWhereWithAggregatesInput[];
    NOT?:
      | FieldScalarWhereWithAggregatesInput
      | FieldScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Field"> | string;
    name?: StringWithAggregatesFilter<"Field"> | string;
    type?: EnumFieldTypeWithAggregatesFilter<"Field"> | $Enums.FieldType;
    order?: IntWithAggregatesFilter<"Field"> | number;
    tableId?: StringWithAggregatesFilter<"Field"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Field"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Field"> | Date | string;
  };

  export type RowWhereInput = {
    AND?: RowWhereInput | RowWhereInput[];
    OR?: RowWhereInput[];
    NOT?: RowWhereInput | RowWhereInput[];
    id?: StringFilter<"Row"> | string;
    order?: IntFilter<"Row"> | number;
    tableId?: StringFilter<"Row"> | string;
    createdAt?: DateTimeFilter<"Row"> | Date | string;
    updatedAt?: DateTimeFilter<"Row"> | Date | string;
    table?: XOR<TableScalarRelationFilter, TableWhereInput>;
    cells?: CellListRelationFilter;
  };

  export type RowOrderByWithRelationInput = {
    id?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    table?: TableOrderByWithRelationInput;
    cells?: CellOrderByRelationAggregateInput;
  };

  export type RowWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: RowWhereInput | RowWhereInput[];
      OR?: RowWhereInput[];
      NOT?: RowWhereInput | RowWhereInput[];
      order?: IntFilter<"Row"> | number;
      tableId?: StringFilter<"Row"> | string;
      createdAt?: DateTimeFilter<"Row"> | Date | string;
      updatedAt?: DateTimeFilter<"Row"> | Date | string;
      table?: XOR<TableScalarRelationFilter, TableWhereInput>;
      cells?: CellListRelationFilter;
    },
    "id"
  >;

  export type RowOrderByWithAggregationInput = {
    id?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: RowCountOrderByAggregateInput;
    _avg?: RowAvgOrderByAggregateInput;
    _max?: RowMaxOrderByAggregateInput;
    _min?: RowMinOrderByAggregateInput;
    _sum?: RowSumOrderByAggregateInput;
  };

  export type RowScalarWhereWithAggregatesInput = {
    AND?:
      | RowScalarWhereWithAggregatesInput
      | RowScalarWhereWithAggregatesInput[];
    OR?: RowScalarWhereWithAggregatesInput[];
    NOT?:
      | RowScalarWhereWithAggregatesInput
      | RowScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Row"> | string;
    order?: IntWithAggregatesFilter<"Row"> | number;
    tableId?: StringWithAggregatesFilter<"Row"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Row"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Row"> | Date | string;
  };

  export type CellWhereInput = {
    AND?: CellWhereInput | CellWhereInput[];
    OR?: CellWhereInput[];
    NOT?: CellWhereInput | CellWhereInput[];
    id?: StringFilter<"Cell"> | string;
    value?: StringNullableFilter<"Cell"> | string | null;
    rowId?: StringFilter<"Cell"> | string;
    fieldId?: StringFilter<"Cell"> | string;
    row?: XOR<RowScalarRelationFilter, RowWhereInput>;
    field?: XOR<FieldScalarRelationFilter, FieldWhereInput>;
  };

  export type CellOrderByWithRelationInput = {
    id?: SortOrder;
    value?: SortOrderInput | SortOrder;
    rowId?: SortOrder;
    fieldId?: SortOrder;
    row?: RowOrderByWithRelationInput;
    field?: FieldOrderByWithRelationInput;
  };

  export type CellWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      rowId_fieldId?: CellRowIdFieldIdCompoundUniqueInput;
      AND?: CellWhereInput | CellWhereInput[];
      OR?: CellWhereInput[];
      NOT?: CellWhereInput | CellWhereInput[];
      value?: StringNullableFilter<"Cell"> | string | null;
      rowId?: StringFilter<"Cell"> | string;
      fieldId?: StringFilter<"Cell"> | string;
      row?: XOR<RowScalarRelationFilter, RowWhereInput>;
      field?: XOR<FieldScalarRelationFilter, FieldWhereInput>;
    },
    "id" | "rowId_fieldId"
  >;

  export type CellOrderByWithAggregationInput = {
    id?: SortOrder;
    value?: SortOrderInput | SortOrder;
    rowId?: SortOrder;
    fieldId?: SortOrder;
    _count?: CellCountOrderByAggregateInput;
    _max?: CellMaxOrderByAggregateInput;
    _min?: CellMinOrderByAggregateInput;
  };

  export type CellScalarWhereWithAggregatesInput = {
    AND?:
      | CellScalarWhereWithAggregatesInput
      | CellScalarWhereWithAggregatesInput[];
    OR?: CellScalarWhereWithAggregatesInput[];
    NOT?:
      | CellScalarWhereWithAggregatesInput
      | CellScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Cell"> | string;
    value?: StringNullableWithAggregatesFilter<"Cell"> | string | null;
    rowId?: StringWithAggregatesFilter<"Cell"> | string;
    fieldId?: StringWithAggregatesFilter<"Cell"> | string;
  };

  export type TableCreateInput = {
    id?: string;
    name: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fields?: FieldCreateNestedManyWithoutTableInput;
    rows?: RowCreateNestedManyWithoutTableInput;
  };

  export type TableUncheckedCreateInput = {
    id?: string;
    name: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fields?: FieldUncheckedCreateNestedManyWithoutTableInput;
    rows?: RowUncheckedCreateNestedManyWithoutTableInput;
  };

  export type TableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    fields?: FieldUpdateManyWithoutTableNestedInput;
    rows?: RowUpdateManyWithoutTableNestedInput;
  };

  export type TableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    fields?: FieldUncheckedUpdateManyWithoutTableNestedInput;
    rows?: RowUncheckedUpdateManyWithoutTableNestedInput;
  };

  export type TableCreateManyInput = {
    id?: string;
    name: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FieldCreateInput = {
    id?: string;
    name: string;
    type?: $Enums.FieldType;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    table: TableCreateNestedOneWithoutFieldsInput;
    cells?: CellCreateNestedManyWithoutFieldInput;
  };

  export type FieldUncheckedCreateInput = {
    id?: string;
    name: string;
    type?: $Enums.FieldType;
    order?: number;
    tableId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cells?: CellUncheckedCreateNestedManyWithoutFieldInput;
  };

  export type FieldUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    table?: TableUpdateOneRequiredWithoutFieldsNestedInput;
    cells?: CellUpdateManyWithoutFieldNestedInput;
  };

  export type FieldUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    tableId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    cells?: CellUncheckedUpdateManyWithoutFieldNestedInput;
  };

  export type FieldCreateManyInput = {
    id?: string;
    name: string;
    type?: $Enums.FieldType;
    order?: number;
    tableId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FieldUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FieldUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    tableId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RowCreateInput = {
    id?: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    table: TableCreateNestedOneWithoutRowsInput;
    cells?: CellCreateNestedManyWithoutRowInput;
  };

  export type RowUncheckedCreateInput = {
    id?: string;
    order?: number;
    tableId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cells?: CellUncheckedCreateNestedManyWithoutRowInput;
  };

  export type RowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    table?: TableUpdateOneRequiredWithoutRowsNestedInput;
    cells?: CellUpdateManyWithoutRowNestedInput;
  };

  export type RowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    tableId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    cells?: CellUncheckedUpdateManyWithoutRowNestedInput;
  };

  export type RowCreateManyInput = {
    id?: string;
    order?: number;
    tableId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    tableId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CellCreateInput = {
    id?: string;
    value?: string | null;
    row: RowCreateNestedOneWithoutCellsInput;
    field: FieldCreateNestedOneWithoutCellsInput;
  };

  export type CellUncheckedCreateInput = {
    id?: string;
    value?: string | null;
    rowId: string;
    fieldId: string;
  };

  export type CellUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    row?: RowUpdateOneRequiredWithoutCellsNestedInput;
    field?: FieldUpdateOneRequiredWithoutCellsNestedInput;
  };

  export type CellUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    rowId?: StringFieldUpdateOperationsInput | string;
    fieldId?: StringFieldUpdateOperationsInput | string;
  };

  export type CellCreateManyInput = {
    id?: string;
    value?: string | null;
    rowId: string;
    fieldId: string;
  };

  export type CellUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type CellUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    rowId?: StringFieldUpdateOperationsInput | string;
    fieldId?: StringFieldUpdateOperationsInput | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[];
    notIn?: string[];
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[];
    notIn?: number[];
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[];
    notIn?: Date[] | string[];
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type FieldListRelationFilter = {
    every?: FieldWhereInput;
    some?: FieldWhereInput;
    none?: FieldWhereInput;
  };

  export type RowListRelationFilter = {
    every?: RowWhereInput;
    some?: RowWhereInput;
    none?: RowWhereInput;
  };

  export type FieldOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type RowOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type TableCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    order?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type TableAvgOrderByAggregateInput = {
    order?: SortOrder;
  };

  export type TableMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    order?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type TableMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    order?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type TableSumOrderByAggregateInput = {
    order?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[];
    notIn?: string[];
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[];
    notIn?: number[];
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[];
    notIn?: Date[] | string[];
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type EnumFieldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.FieldType[];
    notIn?: $Enums.FieldType[];
    not?: NestedEnumFieldTypeFilter<$PrismaModel> | $Enums.FieldType;
  };

  export type TableScalarRelationFilter = {
    is?: TableWhereInput;
    isNot?: TableWhereInput;
  };

  export type CellListRelationFilter = {
    every?: CellWhereInput;
    some?: CellWhereInput;
    none?: CellWhereInput;
  };

  export type CellOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type FieldTableIdNameCompoundUniqueInput = {
    tableId: string;
    name: string;
  };

  export type FieldCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FieldAvgOrderByAggregateInput = {
    order?: SortOrder;
  };

  export type FieldMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FieldMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    type?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FieldSumOrderByAggregateInput = {
    order?: SortOrder;
  };

  export type EnumFieldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.FieldType[];
    notIn?: $Enums.FieldType[];
    not?:
      | NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.FieldType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumFieldTypeFilter<$PrismaModel>;
    _max?: NestedEnumFieldTypeFilter<$PrismaModel>;
  };

  export type RowCountOrderByAggregateInput = {
    id?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RowAvgOrderByAggregateInput = {
    order?: SortOrder;
  };

  export type RowMaxOrderByAggregateInput = {
    id?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RowMinOrderByAggregateInput = {
    id?: SortOrder;
    order?: SortOrder;
    tableId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RowSumOrderByAggregateInput = {
    order?: SortOrder;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | null;
    notIn?: string[] | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type RowScalarRelationFilter = {
    is?: RowWhereInput;
    isNot?: RowWhereInput;
  };

  export type FieldScalarRelationFilter = {
    is?: FieldWhereInput;
    isNot?: FieldWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type CellRowIdFieldIdCompoundUniqueInput = {
    rowId: string;
    fieldId: string;
  };

  export type CellCountOrderByAggregateInput = {
    id?: SortOrder;
    value?: SortOrder;
    rowId?: SortOrder;
    fieldId?: SortOrder;
  };

  export type CellMaxOrderByAggregateInput = {
    id?: SortOrder;
    value?: SortOrder;
    rowId?: SortOrder;
    fieldId?: SortOrder;
  };

  export type CellMinOrderByAggregateInput = {
    id?: SortOrder;
    value?: SortOrder;
    rowId?: SortOrder;
    fieldId?: SortOrder;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | null;
    notIn?: string[] | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type FieldCreateNestedManyWithoutTableInput = {
    create?:
      | XOR<FieldCreateWithoutTableInput, FieldUncheckedCreateWithoutTableInput>
      | FieldCreateWithoutTableInput[]
      | FieldUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | FieldCreateOrConnectWithoutTableInput
      | FieldCreateOrConnectWithoutTableInput[];
    createMany?: FieldCreateManyTableInputEnvelope;
    connect?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
  };

  export type RowCreateNestedManyWithoutTableInput = {
    create?:
      | XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput>
      | RowCreateWithoutTableInput[]
      | RowUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | RowCreateOrConnectWithoutTableInput
      | RowCreateOrConnectWithoutTableInput[];
    createMany?: RowCreateManyTableInputEnvelope;
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[];
  };

  export type FieldUncheckedCreateNestedManyWithoutTableInput = {
    create?:
      | XOR<FieldCreateWithoutTableInput, FieldUncheckedCreateWithoutTableInput>
      | FieldCreateWithoutTableInput[]
      | FieldUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | FieldCreateOrConnectWithoutTableInput
      | FieldCreateOrConnectWithoutTableInput[];
    createMany?: FieldCreateManyTableInputEnvelope;
    connect?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
  };

  export type RowUncheckedCreateNestedManyWithoutTableInput = {
    create?:
      | XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput>
      | RowCreateWithoutTableInput[]
      | RowUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | RowCreateOrConnectWithoutTableInput
      | RowCreateOrConnectWithoutTableInput[];
    createMany?: RowCreateManyTableInputEnvelope;
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type FieldUpdateManyWithoutTableNestedInput = {
    create?:
      | XOR<FieldCreateWithoutTableInput, FieldUncheckedCreateWithoutTableInput>
      | FieldCreateWithoutTableInput[]
      | FieldUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | FieldCreateOrConnectWithoutTableInput
      | FieldCreateOrConnectWithoutTableInput[];
    upsert?:
      | FieldUpsertWithWhereUniqueWithoutTableInput
      | FieldUpsertWithWhereUniqueWithoutTableInput[];
    createMany?: FieldCreateManyTableInputEnvelope;
    set?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
    disconnect?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
    delete?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
    connect?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
    update?:
      | FieldUpdateWithWhereUniqueWithoutTableInput
      | FieldUpdateWithWhereUniqueWithoutTableInput[];
    updateMany?:
      | FieldUpdateManyWithWhereWithoutTableInput
      | FieldUpdateManyWithWhereWithoutTableInput[];
    deleteMany?: FieldScalarWhereInput | FieldScalarWhereInput[];
  };

  export type RowUpdateManyWithoutTableNestedInput = {
    create?:
      | XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput>
      | RowCreateWithoutTableInput[]
      | RowUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | RowCreateOrConnectWithoutTableInput
      | RowCreateOrConnectWithoutTableInput[];
    upsert?:
      | RowUpsertWithWhereUniqueWithoutTableInput
      | RowUpsertWithWhereUniqueWithoutTableInput[];
    createMany?: RowCreateManyTableInputEnvelope;
    set?: RowWhereUniqueInput | RowWhereUniqueInput[];
    disconnect?: RowWhereUniqueInput | RowWhereUniqueInput[];
    delete?: RowWhereUniqueInput | RowWhereUniqueInput[];
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[];
    update?:
      | RowUpdateWithWhereUniqueWithoutTableInput
      | RowUpdateWithWhereUniqueWithoutTableInput[];
    updateMany?:
      | RowUpdateManyWithWhereWithoutTableInput
      | RowUpdateManyWithWhereWithoutTableInput[];
    deleteMany?: RowScalarWhereInput | RowScalarWhereInput[];
  };

  export type FieldUncheckedUpdateManyWithoutTableNestedInput = {
    create?:
      | XOR<FieldCreateWithoutTableInput, FieldUncheckedCreateWithoutTableInput>
      | FieldCreateWithoutTableInput[]
      | FieldUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | FieldCreateOrConnectWithoutTableInput
      | FieldCreateOrConnectWithoutTableInput[];
    upsert?:
      | FieldUpsertWithWhereUniqueWithoutTableInput
      | FieldUpsertWithWhereUniqueWithoutTableInput[];
    createMany?: FieldCreateManyTableInputEnvelope;
    set?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
    disconnect?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
    delete?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
    connect?: FieldWhereUniqueInput | FieldWhereUniqueInput[];
    update?:
      | FieldUpdateWithWhereUniqueWithoutTableInput
      | FieldUpdateWithWhereUniqueWithoutTableInput[];
    updateMany?:
      | FieldUpdateManyWithWhereWithoutTableInput
      | FieldUpdateManyWithWhereWithoutTableInput[];
    deleteMany?: FieldScalarWhereInput | FieldScalarWhereInput[];
  };

  export type RowUncheckedUpdateManyWithoutTableNestedInput = {
    create?:
      | XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput>
      | RowCreateWithoutTableInput[]
      | RowUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | RowCreateOrConnectWithoutTableInput
      | RowCreateOrConnectWithoutTableInput[];
    upsert?:
      | RowUpsertWithWhereUniqueWithoutTableInput
      | RowUpsertWithWhereUniqueWithoutTableInput[];
    createMany?: RowCreateManyTableInputEnvelope;
    set?: RowWhereUniqueInput | RowWhereUniqueInput[];
    disconnect?: RowWhereUniqueInput | RowWhereUniqueInput[];
    delete?: RowWhereUniqueInput | RowWhereUniqueInput[];
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[];
    update?:
      | RowUpdateWithWhereUniqueWithoutTableInput
      | RowUpdateWithWhereUniqueWithoutTableInput[];
    updateMany?:
      | RowUpdateManyWithWhereWithoutTableInput
      | RowUpdateManyWithWhereWithoutTableInput[];
    deleteMany?: RowScalarWhereInput | RowScalarWhereInput[];
  };

  export type TableCreateNestedOneWithoutFieldsInput = {
    create?: XOR<
      TableCreateWithoutFieldsInput,
      TableUncheckedCreateWithoutFieldsInput
    >;
    connectOrCreate?: TableCreateOrConnectWithoutFieldsInput;
    connect?: TableWhereUniqueInput;
  };

  export type CellCreateNestedManyWithoutFieldInput = {
    create?:
      | XOR<CellCreateWithoutFieldInput, CellUncheckedCreateWithoutFieldInput>
      | CellCreateWithoutFieldInput[]
      | CellUncheckedCreateWithoutFieldInput[];
    connectOrCreate?:
      | CellCreateOrConnectWithoutFieldInput
      | CellCreateOrConnectWithoutFieldInput[];
    createMany?: CellCreateManyFieldInputEnvelope;
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[];
  };

  export type CellUncheckedCreateNestedManyWithoutFieldInput = {
    create?:
      | XOR<CellCreateWithoutFieldInput, CellUncheckedCreateWithoutFieldInput>
      | CellCreateWithoutFieldInput[]
      | CellUncheckedCreateWithoutFieldInput[];
    connectOrCreate?:
      | CellCreateOrConnectWithoutFieldInput
      | CellCreateOrConnectWithoutFieldInput[];
    createMany?: CellCreateManyFieldInputEnvelope;
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[];
  };

  export type EnumFieldTypeFieldUpdateOperationsInput = {
    set?: $Enums.FieldType;
  };

  export type TableUpdateOneRequiredWithoutFieldsNestedInput = {
    create?: XOR<
      TableCreateWithoutFieldsInput,
      TableUncheckedCreateWithoutFieldsInput
    >;
    connectOrCreate?: TableCreateOrConnectWithoutFieldsInput;
    upsert?: TableUpsertWithoutFieldsInput;
    connect?: TableWhereUniqueInput;
    update?: XOR<
      XOR<
        TableUpdateToOneWithWhereWithoutFieldsInput,
        TableUpdateWithoutFieldsInput
      >,
      TableUncheckedUpdateWithoutFieldsInput
    >;
  };

  export type CellUpdateManyWithoutFieldNestedInput = {
    create?:
      | XOR<CellCreateWithoutFieldInput, CellUncheckedCreateWithoutFieldInput>
      | CellCreateWithoutFieldInput[]
      | CellUncheckedCreateWithoutFieldInput[];
    connectOrCreate?:
      | CellCreateOrConnectWithoutFieldInput
      | CellCreateOrConnectWithoutFieldInput[];
    upsert?:
      | CellUpsertWithWhereUniqueWithoutFieldInput
      | CellUpsertWithWhereUniqueWithoutFieldInput[];
    createMany?: CellCreateManyFieldInputEnvelope;
    set?: CellWhereUniqueInput | CellWhereUniqueInput[];
    disconnect?: CellWhereUniqueInput | CellWhereUniqueInput[];
    delete?: CellWhereUniqueInput | CellWhereUniqueInput[];
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[];
    update?:
      | CellUpdateWithWhereUniqueWithoutFieldInput
      | CellUpdateWithWhereUniqueWithoutFieldInput[];
    updateMany?:
      | CellUpdateManyWithWhereWithoutFieldInput
      | CellUpdateManyWithWhereWithoutFieldInput[];
    deleteMany?: CellScalarWhereInput | CellScalarWhereInput[];
  };

  export type CellUncheckedUpdateManyWithoutFieldNestedInput = {
    create?:
      | XOR<CellCreateWithoutFieldInput, CellUncheckedCreateWithoutFieldInput>
      | CellCreateWithoutFieldInput[]
      | CellUncheckedCreateWithoutFieldInput[];
    connectOrCreate?:
      | CellCreateOrConnectWithoutFieldInput
      | CellCreateOrConnectWithoutFieldInput[];
    upsert?:
      | CellUpsertWithWhereUniqueWithoutFieldInput
      | CellUpsertWithWhereUniqueWithoutFieldInput[];
    createMany?: CellCreateManyFieldInputEnvelope;
    set?: CellWhereUniqueInput | CellWhereUniqueInput[];
    disconnect?: CellWhereUniqueInput | CellWhereUniqueInput[];
    delete?: CellWhereUniqueInput | CellWhereUniqueInput[];
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[];
    update?:
      | CellUpdateWithWhereUniqueWithoutFieldInput
      | CellUpdateWithWhereUniqueWithoutFieldInput[];
    updateMany?:
      | CellUpdateManyWithWhereWithoutFieldInput
      | CellUpdateManyWithWhereWithoutFieldInput[];
    deleteMany?: CellScalarWhereInput | CellScalarWhereInput[];
  };

  export type TableCreateNestedOneWithoutRowsInput = {
    create?: XOR<
      TableCreateWithoutRowsInput,
      TableUncheckedCreateWithoutRowsInput
    >;
    connectOrCreate?: TableCreateOrConnectWithoutRowsInput;
    connect?: TableWhereUniqueInput;
  };

  export type CellCreateNestedManyWithoutRowInput = {
    create?:
      | XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput>
      | CellCreateWithoutRowInput[]
      | CellUncheckedCreateWithoutRowInput[];
    connectOrCreate?:
      | CellCreateOrConnectWithoutRowInput
      | CellCreateOrConnectWithoutRowInput[];
    createMany?: CellCreateManyRowInputEnvelope;
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[];
  };

  export type CellUncheckedCreateNestedManyWithoutRowInput = {
    create?:
      | XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput>
      | CellCreateWithoutRowInput[]
      | CellUncheckedCreateWithoutRowInput[];
    connectOrCreate?:
      | CellCreateOrConnectWithoutRowInput
      | CellCreateOrConnectWithoutRowInput[];
    createMany?: CellCreateManyRowInputEnvelope;
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[];
  };

  export type TableUpdateOneRequiredWithoutRowsNestedInput = {
    create?: XOR<
      TableCreateWithoutRowsInput,
      TableUncheckedCreateWithoutRowsInput
    >;
    connectOrCreate?: TableCreateOrConnectWithoutRowsInput;
    upsert?: TableUpsertWithoutRowsInput;
    connect?: TableWhereUniqueInput;
    update?: XOR<
      XOR<
        TableUpdateToOneWithWhereWithoutRowsInput,
        TableUpdateWithoutRowsInput
      >,
      TableUncheckedUpdateWithoutRowsInput
    >;
  };

  export type CellUpdateManyWithoutRowNestedInput = {
    create?:
      | XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput>
      | CellCreateWithoutRowInput[]
      | CellUncheckedCreateWithoutRowInput[];
    connectOrCreate?:
      | CellCreateOrConnectWithoutRowInput
      | CellCreateOrConnectWithoutRowInput[];
    upsert?:
      | CellUpsertWithWhereUniqueWithoutRowInput
      | CellUpsertWithWhereUniqueWithoutRowInput[];
    createMany?: CellCreateManyRowInputEnvelope;
    set?: CellWhereUniqueInput | CellWhereUniqueInput[];
    disconnect?: CellWhereUniqueInput | CellWhereUniqueInput[];
    delete?: CellWhereUniqueInput | CellWhereUniqueInput[];
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[];
    update?:
      | CellUpdateWithWhereUniqueWithoutRowInput
      | CellUpdateWithWhereUniqueWithoutRowInput[];
    updateMany?:
      | CellUpdateManyWithWhereWithoutRowInput
      | CellUpdateManyWithWhereWithoutRowInput[];
    deleteMany?: CellScalarWhereInput | CellScalarWhereInput[];
  };

  export type CellUncheckedUpdateManyWithoutRowNestedInput = {
    create?:
      | XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput>
      | CellCreateWithoutRowInput[]
      | CellUncheckedCreateWithoutRowInput[];
    connectOrCreate?:
      | CellCreateOrConnectWithoutRowInput
      | CellCreateOrConnectWithoutRowInput[];
    upsert?:
      | CellUpsertWithWhereUniqueWithoutRowInput
      | CellUpsertWithWhereUniqueWithoutRowInput[];
    createMany?: CellCreateManyRowInputEnvelope;
    set?: CellWhereUniqueInput | CellWhereUniqueInput[];
    disconnect?: CellWhereUniqueInput | CellWhereUniqueInput[];
    delete?: CellWhereUniqueInput | CellWhereUniqueInput[];
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[];
    update?:
      | CellUpdateWithWhereUniqueWithoutRowInput
      | CellUpdateWithWhereUniqueWithoutRowInput[];
    updateMany?:
      | CellUpdateManyWithWhereWithoutRowInput
      | CellUpdateManyWithWhereWithoutRowInput[];
    deleteMany?: CellScalarWhereInput | CellScalarWhereInput[];
  };

  export type RowCreateNestedOneWithoutCellsInput = {
    create?: XOR<
      RowCreateWithoutCellsInput,
      RowUncheckedCreateWithoutCellsInput
    >;
    connectOrCreate?: RowCreateOrConnectWithoutCellsInput;
    connect?: RowWhereUniqueInput;
  };

  export type FieldCreateNestedOneWithoutCellsInput = {
    create?: XOR<
      FieldCreateWithoutCellsInput,
      FieldUncheckedCreateWithoutCellsInput
    >;
    connectOrCreate?: FieldCreateOrConnectWithoutCellsInput;
    connect?: FieldWhereUniqueInput;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type RowUpdateOneRequiredWithoutCellsNestedInput = {
    create?: XOR<
      RowCreateWithoutCellsInput,
      RowUncheckedCreateWithoutCellsInput
    >;
    connectOrCreate?: RowCreateOrConnectWithoutCellsInput;
    upsert?: RowUpsertWithoutCellsInput;
    connect?: RowWhereUniqueInput;
    update?: XOR<
      XOR<RowUpdateToOneWithWhereWithoutCellsInput, RowUpdateWithoutCellsInput>,
      RowUncheckedUpdateWithoutCellsInput
    >;
  };

  export type FieldUpdateOneRequiredWithoutCellsNestedInput = {
    create?: XOR<
      FieldCreateWithoutCellsInput,
      FieldUncheckedCreateWithoutCellsInput
    >;
    connectOrCreate?: FieldCreateOrConnectWithoutCellsInput;
    upsert?: FieldUpsertWithoutCellsInput;
    connect?: FieldWhereUniqueInput;
    update?: XOR<
      XOR<
        FieldUpdateToOneWithWhereWithoutCellsInput,
        FieldUpdateWithoutCellsInput
      >,
      FieldUncheckedUpdateWithoutCellsInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[];
    notIn?: string[];
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[];
    notIn?: number[];
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[];
    notIn?: Date[] | string[];
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[];
    notIn?: string[];
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[];
    notIn?: number[];
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[];
    notIn?: number[];
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[];
    notIn?: Date[] | string[];
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumFieldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.FieldType[];
    notIn?: $Enums.FieldType[];
    not?: NestedEnumFieldTypeFilter<$PrismaModel> | $Enums.FieldType;
  };

  export type NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.FieldType[];
    notIn?: $Enums.FieldType[];
    not?:
      | NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.FieldType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumFieldTypeFilter<$PrismaModel>;
    _max?: NestedEnumFieldTypeFilter<$PrismaModel>;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | null;
    notIn?: string[] | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | null;
    notIn?: string[] | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | null;
    notIn?: number[] | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type FieldCreateWithoutTableInput = {
    id?: string;
    name: string;
    type?: $Enums.FieldType;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cells?: CellCreateNestedManyWithoutFieldInput;
  };

  export type FieldUncheckedCreateWithoutTableInput = {
    id?: string;
    name: string;
    type?: $Enums.FieldType;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cells?: CellUncheckedCreateNestedManyWithoutFieldInput;
  };

  export type FieldCreateOrConnectWithoutTableInput = {
    where: FieldWhereUniqueInput;
    create: XOR<
      FieldCreateWithoutTableInput,
      FieldUncheckedCreateWithoutTableInput
    >;
  };

  export type FieldCreateManyTableInputEnvelope = {
    data: FieldCreateManyTableInput | FieldCreateManyTableInput[];
  };

  export type RowCreateWithoutTableInput = {
    id?: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cells?: CellCreateNestedManyWithoutRowInput;
  };

  export type RowUncheckedCreateWithoutTableInput = {
    id?: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cells?: CellUncheckedCreateNestedManyWithoutRowInput;
  };

  export type RowCreateOrConnectWithoutTableInput = {
    where: RowWhereUniqueInput;
    create: XOR<
      RowCreateWithoutTableInput,
      RowUncheckedCreateWithoutTableInput
    >;
  };

  export type RowCreateManyTableInputEnvelope = {
    data: RowCreateManyTableInput | RowCreateManyTableInput[];
  };

  export type FieldUpsertWithWhereUniqueWithoutTableInput = {
    where: FieldWhereUniqueInput;
    update: XOR<
      FieldUpdateWithoutTableInput,
      FieldUncheckedUpdateWithoutTableInput
    >;
    create: XOR<
      FieldCreateWithoutTableInput,
      FieldUncheckedCreateWithoutTableInput
    >;
  };

  export type FieldUpdateWithWhereUniqueWithoutTableInput = {
    where: FieldWhereUniqueInput;
    data: XOR<
      FieldUpdateWithoutTableInput,
      FieldUncheckedUpdateWithoutTableInput
    >;
  };

  export type FieldUpdateManyWithWhereWithoutTableInput = {
    where: FieldScalarWhereInput;
    data: XOR<
      FieldUpdateManyMutationInput,
      FieldUncheckedUpdateManyWithoutTableInput
    >;
  };

  export type FieldScalarWhereInput = {
    AND?: FieldScalarWhereInput | FieldScalarWhereInput[];
    OR?: FieldScalarWhereInput[];
    NOT?: FieldScalarWhereInput | FieldScalarWhereInput[];
    id?: StringFilter<"Field"> | string;
    name?: StringFilter<"Field"> | string;
    type?: EnumFieldTypeFilter<"Field"> | $Enums.FieldType;
    order?: IntFilter<"Field"> | number;
    tableId?: StringFilter<"Field"> | string;
    createdAt?: DateTimeFilter<"Field"> | Date | string;
    updatedAt?: DateTimeFilter<"Field"> | Date | string;
  };

  export type RowUpsertWithWhereUniqueWithoutTableInput = {
    where: RowWhereUniqueInput;
    update: XOR<
      RowUpdateWithoutTableInput,
      RowUncheckedUpdateWithoutTableInput
    >;
    create: XOR<
      RowCreateWithoutTableInput,
      RowUncheckedCreateWithoutTableInput
    >;
  };

  export type RowUpdateWithWhereUniqueWithoutTableInput = {
    where: RowWhereUniqueInput;
    data: XOR<RowUpdateWithoutTableInput, RowUncheckedUpdateWithoutTableInput>;
  };

  export type RowUpdateManyWithWhereWithoutTableInput = {
    where: RowScalarWhereInput;
    data: XOR<
      RowUpdateManyMutationInput,
      RowUncheckedUpdateManyWithoutTableInput
    >;
  };

  export type RowScalarWhereInput = {
    AND?: RowScalarWhereInput | RowScalarWhereInput[];
    OR?: RowScalarWhereInput[];
    NOT?: RowScalarWhereInput | RowScalarWhereInput[];
    id?: StringFilter<"Row"> | string;
    order?: IntFilter<"Row"> | number;
    tableId?: StringFilter<"Row"> | string;
    createdAt?: DateTimeFilter<"Row"> | Date | string;
    updatedAt?: DateTimeFilter<"Row"> | Date | string;
  };

  export type TableCreateWithoutFieldsInput = {
    id?: string;
    name: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rows?: RowCreateNestedManyWithoutTableInput;
  };

  export type TableUncheckedCreateWithoutFieldsInput = {
    id?: string;
    name: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rows?: RowUncheckedCreateNestedManyWithoutTableInput;
  };

  export type TableCreateOrConnectWithoutFieldsInput = {
    where: TableWhereUniqueInput;
    create: XOR<
      TableCreateWithoutFieldsInput,
      TableUncheckedCreateWithoutFieldsInput
    >;
  };

  export type CellCreateWithoutFieldInput = {
    id?: string;
    value?: string | null;
    row: RowCreateNestedOneWithoutCellsInput;
  };

  export type CellUncheckedCreateWithoutFieldInput = {
    id?: string;
    value?: string | null;
    rowId: string;
  };

  export type CellCreateOrConnectWithoutFieldInput = {
    where: CellWhereUniqueInput;
    create: XOR<
      CellCreateWithoutFieldInput,
      CellUncheckedCreateWithoutFieldInput
    >;
  };

  export type CellCreateManyFieldInputEnvelope = {
    data: CellCreateManyFieldInput | CellCreateManyFieldInput[];
  };

  export type TableUpsertWithoutFieldsInput = {
    update: XOR<
      TableUpdateWithoutFieldsInput,
      TableUncheckedUpdateWithoutFieldsInput
    >;
    create: XOR<
      TableCreateWithoutFieldsInput,
      TableUncheckedCreateWithoutFieldsInput
    >;
    where?: TableWhereInput;
  };

  export type TableUpdateToOneWithWhereWithoutFieldsInput = {
    where?: TableWhereInput;
    data: XOR<
      TableUpdateWithoutFieldsInput,
      TableUncheckedUpdateWithoutFieldsInput
    >;
  };

  export type TableUpdateWithoutFieldsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    rows?: RowUpdateManyWithoutTableNestedInput;
  };

  export type TableUncheckedUpdateWithoutFieldsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    rows?: RowUncheckedUpdateManyWithoutTableNestedInput;
  };

  export type CellUpsertWithWhereUniqueWithoutFieldInput = {
    where: CellWhereUniqueInput;
    update: XOR<
      CellUpdateWithoutFieldInput,
      CellUncheckedUpdateWithoutFieldInput
    >;
    create: XOR<
      CellCreateWithoutFieldInput,
      CellUncheckedCreateWithoutFieldInput
    >;
  };

  export type CellUpdateWithWhereUniqueWithoutFieldInput = {
    where: CellWhereUniqueInput;
    data: XOR<
      CellUpdateWithoutFieldInput,
      CellUncheckedUpdateWithoutFieldInput
    >;
  };

  export type CellUpdateManyWithWhereWithoutFieldInput = {
    where: CellScalarWhereInput;
    data: XOR<
      CellUpdateManyMutationInput,
      CellUncheckedUpdateManyWithoutFieldInput
    >;
  };

  export type CellScalarWhereInput = {
    AND?: CellScalarWhereInput | CellScalarWhereInput[];
    OR?: CellScalarWhereInput[];
    NOT?: CellScalarWhereInput | CellScalarWhereInput[];
    id?: StringFilter<"Cell"> | string;
    value?: StringNullableFilter<"Cell"> | string | null;
    rowId?: StringFilter<"Cell"> | string;
    fieldId?: StringFilter<"Cell"> | string;
  };

  export type TableCreateWithoutRowsInput = {
    id?: string;
    name: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fields?: FieldCreateNestedManyWithoutTableInput;
  };

  export type TableUncheckedCreateWithoutRowsInput = {
    id?: string;
    name: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fields?: FieldUncheckedCreateNestedManyWithoutTableInput;
  };

  export type TableCreateOrConnectWithoutRowsInput = {
    where: TableWhereUniqueInput;
    create: XOR<
      TableCreateWithoutRowsInput,
      TableUncheckedCreateWithoutRowsInput
    >;
  };

  export type CellCreateWithoutRowInput = {
    id?: string;
    value?: string | null;
    field: FieldCreateNestedOneWithoutCellsInput;
  };

  export type CellUncheckedCreateWithoutRowInput = {
    id?: string;
    value?: string | null;
    fieldId: string;
  };

  export type CellCreateOrConnectWithoutRowInput = {
    where: CellWhereUniqueInput;
    create: XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput>;
  };

  export type CellCreateManyRowInputEnvelope = {
    data: CellCreateManyRowInput | CellCreateManyRowInput[];
  };

  export type TableUpsertWithoutRowsInput = {
    update: XOR<
      TableUpdateWithoutRowsInput,
      TableUncheckedUpdateWithoutRowsInput
    >;
    create: XOR<
      TableCreateWithoutRowsInput,
      TableUncheckedCreateWithoutRowsInput
    >;
    where?: TableWhereInput;
  };

  export type TableUpdateToOneWithWhereWithoutRowsInput = {
    where?: TableWhereInput;
    data: XOR<
      TableUpdateWithoutRowsInput,
      TableUncheckedUpdateWithoutRowsInput
    >;
  };

  export type TableUpdateWithoutRowsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    fields?: FieldUpdateManyWithoutTableNestedInput;
  };

  export type TableUncheckedUpdateWithoutRowsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    fields?: FieldUncheckedUpdateManyWithoutTableNestedInput;
  };

  export type CellUpsertWithWhereUniqueWithoutRowInput = {
    where: CellWhereUniqueInput;
    update: XOR<CellUpdateWithoutRowInput, CellUncheckedUpdateWithoutRowInput>;
    create: XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput>;
  };

  export type CellUpdateWithWhereUniqueWithoutRowInput = {
    where: CellWhereUniqueInput;
    data: XOR<CellUpdateWithoutRowInput, CellUncheckedUpdateWithoutRowInput>;
  };

  export type CellUpdateManyWithWhereWithoutRowInput = {
    where: CellScalarWhereInput;
    data: XOR<
      CellUpdateManyMutationInput,
      CellUncheckedUpdateManyWithoutRowInput
    >;
  };

  export type RowCreateWithoutCellsInput = {
    id?: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    table: TableCreateNestedOneWithoutRowsInput;
  };

  export type RowUncheckedCreateWithoutCellsInput = {
    id?: string;
    order?: number;
    tableId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RowCreateOrConnectWithoutCellsInput = {
    where: RowWhereUniqueInput;
    create: XOR<
      RowCreateWithoutCellsInput,
      RowUncheckedCreateWithoutCellsInput
    >;
  };

  export type FieldCreateWithoutCellsInput = {
    id?: string;
    name: string;
    type?: $Enums.FieldType;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    table: TableCreateNestedOneWithoutFieldsInput;
  };

  export type FieldUncheckedCreateWithoutCellsInput = {
    id?: string;
    name: string;
    type?: $Enums.FieldType;
    order?: number;
    tableId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FieldCreateOrConnectWithoutCellsInput = {
    where: FieldWhereUniqueInput;
    create: XOR<
      FieldCreateWithoutCellsInput,
      FieldUncheckedCreateWithoutCellsInput
    >;
  };

  export type RowUpsertWithoutCellsInput = {
    update: XOR<
      RowUpdateWithoutCellsInput,
      RowUncheckedUpdateWithoutCellsInput
    >;
    create: XOR<
      RowCreateWithoutCellsInput,
      RowUncheckedCreateWithoutCellsInput
    >;
    where?: RowWhereInput;
  };

  export type RowUpdateToOneWithWhereWithoutCellsInput = {
    where?: RowWhereInput;
    data: XOR<RowUpdateWithoutCellsInput, RowUncheckedUpdateWithoutCellsInput>;
  };

  export type RowUpdateWithoutCellsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    table?: TableUpdateOneRequiredWithoutRowsNestedInput;
  };

  export type RowUncheckedUpdateWithoutCellsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    tableId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FieldUpsertWithoutCellsInput = {
    update: XOR<
      FieldUpdateWithoutCellsInput,
      FieldUncheckedUpdateWithoutCellsInput
    >;
    create: XOR<
      FieldCreateWithoutCellsInput,
      FieldUncheckedCreateWithoutCellsInput
    >;
    where?: FieldWhereInput;
  };

  export type FieldUpdateToOneWithWhereWithoutCellsInput = {
    where?: FieldWhereInput;
    data: XOR<
      FieldUpdateWithoutCellsInput,
      FieldUncheckedUpdateWithoutCellsInput
    >;
  };

  export type FieldUpdateWithoutCellsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    table?: TableUpdateOneRequiredWithoutFieldsNestedInput;
  };

  export type FieldUncheckedUpdateWithoutCellsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    tableId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FieldCreateManyTableInput = {
    id?: string;
    name: string;
    type?: $Enums.FieldType;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RowCreateManyTableInput = {
    id?: string;
    order?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FieldUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    cells?: CellUpdateManyWithoutFieldNestedInput;
  };

  export type FieldUncheckedUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    cells?: CellUncheckedUpdateManyWithoutFieldNestedInput;
  };

  export type FieldUncheckedUpdateManyWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RowUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    cells?: CellUpdateManyWithoutRowNestedInput;
  };

  export type RowUncheckedUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    cells?: CellUncheckedUpdateManyWithoutRowNestedInput;
  };

  export type RowUncheckedUpdateManyWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string;
    order?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CellCreateManyFieldInput = {
    id?: string;
    value?: string | null;
    rowId: string;
  };

  export type CellUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    row?: RowUpdateOneRequiredWithoutCellsNestedInput;
  };

  export type CellUncheckedUpdateWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    rowId?: StringFieldUpdateOperationsInput | string;
  };

  export type CellUncheckedUpdateManyWithoutFieldInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    rowId?: StringFieldUpdateOperationsInput | string;
  };

  export type CellCreateManyRowInput = {
    id?: string;
    value?: string | null;
    fieldId: string;
  };

  export type CellUpdateWithoutRowInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    field?: FieldUpdateOneRequiredWithoutCellsNestedInput;
  };

  export type CellUncheckedUpdateWithoutRowInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    fieldId?: StringFieldUpdateOperationsInput | string;
  };

  export type CellUncheckedUpdateManyWithoutRowInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableStringFieldUpdateOperationsInput | string | null;
    fieldId?: StringFieldUpdateOperationsInput | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
