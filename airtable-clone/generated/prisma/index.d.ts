
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Base
 * 
 */
export type Base = $Result.DefaultSelection<Prisma.$BasePayload>
/**
 * Model Table
 * 
 */
export type Table = $Result.DefaultSelection<Prisma.$TablePayload>
/**
 * Model View
 * 
 */
export type View = $Result.DefaultSelection<Prisma.$ViewPayload>
/**
 * Model Column
 * 
 */
export type Column = $Result.DefaultSelection<Prisma.$ColumnPayload>
/**
 * Model Row
 * 
 */
export type Row = $Result.DefaultSelection<Prisma.$RowPayload>
/**
 * Model Cell
 * 
 */
export type Cell = $Result.DefaultSelection<Prisma.$CellPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FieldType: {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  CHECKBOX: 'CHECKBOX',
  DATE: 'DATE'
};

export type FieldType = (typeof FieldType)[keyof typeof FieldType]

}

export type FieldType = $Enums.FieldType

export const FieldType: typeof $Enums.FieldType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.base`: Exposes CRUD operations for the **Base** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bases
    * const bases = await prisma.base.findMany()
    * ```
    */
  get base(): Prisma.BaseDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.view`: Exposes CRUD operations for the **View** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Views
    * const views = await prisma.view.findMany()
    * ```
    */
  get view(): Prisma.ViewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.column`: Exposes CRUD operations for the **Column** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Columns
    * const columns = await prisma.column.findMany()
    * ```
    */
  get column(): Prisma.ColumnDelegate<ExtArgs, ClientOptions>;

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
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Base: 'Base',
    Table: 'Table',
    View: 'View',
    Column: 'Column',
    Row: 'Row',
    Cell: 'Cell'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "base" | "table" | "view" | "column" | "row" | "cell"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Base: {
        payload: Prisma.$BasePayload<ExtArgs>
        fields: Prisma.BaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>
          }
          findFirst: {
            args: Prisma.BaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>
          }
          findMany: {
            args: Prisma.BaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>[]
          }
          create: {
            args: Prisma.BaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>
          }
          createMany: {
            args: Prisma.BaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>[]
          }
          delete: {
            args: Prisma.BaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>
          }
          update: {
            args: Prisma.BaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>
          }
          deleteMany: {
            args: Prisma.BaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>[]
          }
          upsert: {
            args: Prisma.BaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasePayload>
          }
          aggregate: {
            args: Prisma.BaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBase>
          }
          groupBy: {
            args: Prisma.BaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<BaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.BaseCountArgs<ExtArgs>
            result: $Utils.Optional<BaseCountAggregateOutputType> | number
          }
        }
      }
      Table: {
        payload: Prisma.$TablePayload<ExtArgs>
        fields: Prisma.TableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          findFirst: {
            args: Prisma.TableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          findMany: {
            args: Prisma.TableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          create: {
            args: Prisma.TableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          createMany: {
            args: Prisma.TableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          delete: {
            args: Prisma.TableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          update: {
            args: Prisma.TableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          deleteMany: {
            args: Prisma.TableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          upsert: {
            args: Prisma.TableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          aggregate: {
            args: Prisma.TableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTable>
          }
          groupBy: {
            args: Prisma.TableGroupByArgs<ExtArgs>
            result: $Utils.Optional<TableGroupByOutputType>[]
          }
          count: {
            args: Prisma.TableCountArgs<ExtArgs>
            result: $Utils.Optional<TableCountAggregateOutputType> | number
          }
        }
      }
      View: {
        payload: Prisma.$ViewPayload<ExtArgs>
        fields: Prisma.ViewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ViewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ViewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>
          }
          findFirst: {
            args: Prisma.ViewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ViewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>
          }
          findMany: {
            args: Prisma.ViewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>[]
          }
          create: {
            args: Prisma.ViewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>
          }
          createMany: {
            args: Prisma.ViewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ViewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>[]
          }
          delete: {
            args: Prisma.ViewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>
          }
          update: {
            args: Prisma.ViewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>
          }
          deleteMany: {
            args: Prisma.ViewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ViewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ViewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>[]
          }
          upsert: {
            args: Prisma.ViewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewPayload>
          }
          aggregate: {
            args: Prisma.ViewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateView>
          }
          groupBy: {
            args: Prisma.ViewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ViewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ViewCountArgs<ExtArgs>
            result: $Utils.Optional<ViewCountAggregateOutputType> | number
          }
        }
      }
      Column: {
        payload: Prisma.$ColumnPayload<ExtArgs>
        fields: Prisma.ColumnFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColumnFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColumnFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          findFirst: {
            args: Prisma.ColumnFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColumnFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          findMany: {
            args: Prisma.ColumnFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          create: {
            args: Prisma.ColumnCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          createMany: {
            args: Prisma.ColumnCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColumnCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          delete: {
            args: Prisma.ColumnDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          update: {
            args: Prisma.ColumnUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          deleteMany: {
            args: Prisma.ColumnDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColumnUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColumnUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          upsert: {
            args: Prisma.ColumnUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          aggregate: {
            args: Prisma.ColumnAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColumn>
          }
          groupBy: {
            args: Prisma.ColumnGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColumnGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColumnCountArgs<ExtArgs>
            result: $Utils.Optional<ColumnCountAggregateOutputType> | number
          }
        }
      }
      Row: {
        payload: Prisma.$RowPayload<ExtArgs>
        fields: Prisma.RowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>
          }
          findFirst: {
            args: Prisma.RowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>
          }
          findMany: {
            args: Prisma.RowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>[]
          }
          create: {
            args: Prisma.RowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>
          }
          createMany: {
            args: Prisma.RowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>[]
          }
          delete: {
            args: Prisma.RowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>
          }
          update: {
            args: Prisma.RowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>
          }
          deleteMany: {
            args: Prisma.RowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>[]
          }
          upsert: {
            args: Prisma.RowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RowPayload>
          }
          aggregate: {
            args: Prisma.RowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRow>
          }
          groupBy: {
            args: Prisma.RowGroupByArgs<ExtArgs>
            result: $Utils.Optional<RowGroupByOutputType>[]
          }
          count: {
            args: Prisma.RowCountArgs<ExtArgs>
            result: $Utils.Optional<RowCountAggregateOutputType> | number
          }
        }
      }
      Cell: {
        payload: Prisma.$CellPayload<ExtArgs>
        fields: Prisma.CellFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CellFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CellFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>
          }
          findFirst: {
            args: Prisma.CellFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CellFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>
          }
          findMany: {
            args: Prisma.CellFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>[]
          }
          create: {
            args: Prisma.CellCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>
          }
          createMany: {
            args: Prisma.CellCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CellCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>[]
          }
          delete: {
            args: Prisma.CellDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>
          }
          update: {
            args: Prisma.CellUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>
          }
          deleteMany: {
            args: Prisma.CellDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CellUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CellUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>[]
          }
          upsert: {
            args: Prisma.CellUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CellPayload>
          }
          aggregate: {
            args: Prisma.CellAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCell>
          }
          groupBy: {
            args: Prisma.CellGroupByArgs<ExtArgs>
            result: $Utils.Optional<CellGroupByOutputType>[]
          }
          count: {
            args: Prisma.CellCountArgs<ExtArgs>
            result: $Utils.Optional<CellCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
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
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    base?: BaseOmit
    table?: TableOmit
    view?: ViewOmit
    column?: ColumnOmit
    row?: RowOmit
    cell?: CellOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdBases: number
    createdTables: number
    createdColumns: number
    createdRows: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBases?: boolean | UserCountOutputTypeCountCreatedBasesArgs
    createdTables?: boolean | UserCountOutputTypeCountCreatedTablesArgs
    createdColumns?: boolean | UserCountOutputTypeCountCreatedColumnsArgs
    createdRows?: boolean | UserCountOutputTypeCountCreatedRowsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedBasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BaseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedColumnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedRowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RowWhereInput
  }


  /**
   * Count Type BaseCountOutputType
   */

  export type BaseCountOutputType = {
    tables: number
  }

  export type BaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tables?: boolean | BaseCountOutputTypeCountTablesArgs
  }

  // Custom InputTypes
  /**
   * BaseCountOutputType without action
   */
  export type BaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaseCountOutputType
     */
    select?: BaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BaseCountOutputType without action
   */
  export type BaseCountOutputTypeCountTablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableWhereInput
  }


  /**
   * Count Type TableCountOutputType
   */

  export type TableCountOutputType = {
    columns: number
    rows: number
    views: number
  }

  export type TableCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    columns?: boolean | TableCountOutputTypeCountColumnsArgs
    rows?: boolean | TableCountOutputTypeCountRowsArgs
    views?: boolean | TableCountOutputTypeCountViewsArgs
  }

  // Custom InputTypes
  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableCountOutputType
     */
    select?: TableCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeCountColumnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnWhereInput
  }

  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeCountRowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RowWhereInput
  }

  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeCountViewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ViewWhereInput
  }


  /**
   * Count Type ColumnCountOutputType
   */

  export type ColumnCountOutputType = {
    cells: number
  }

  export type ColumnCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cells?: boolean | ColumnCountOutputTypeCountCellsArgs
  }

  // Custom InputTypes
  /**
   * ColumnCountOutputType without action
   */
  export type ColumnCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnCountOutputType
     */
    select?: ColumnCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ColumnCountOutputType without action
   */
  export type ColumnCountOutputTypeCountCellsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CellWhereInput
  }


  /**
   * Count Type RowCountOutputType
   */

  export type RowCountOutputType = {
    cells: number
  }

  export type RowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cells?: boolean | RowCountOutputTypeCountCellsArgs
  }

  // Custom InputTypes
  /**
   * RowCountOutputType without action
   */
  export type RowCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RowCountOutputType
     */
    select?: RowCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RowCountOutputType without action
   */
  export type RowCountOutputTypeCountCellsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CellWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBases?: boolean | User$createdBasesArgs<ExtArgs>
    createdTables?: boolean | User$createdTablesArgs<ExtArgs>
    createdColumns?: boolean | User$createdColumnsArgs<ExtArgs>
    createdRows?: boolean | User$createdRowsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBases?: boolean | User$createdBasesArgs<ExtArgs>
    createdTables?: boolean | User$createdTablesArgs<ExtArgs>
    createdColumns?: boolean | User$createdColumnsArgs<ExtArgs>
    createdRows?: boolean | User$createdRowsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdBases: Prisma.$BasePayload<ExtArgs>[]
      createdTables: Prisma.$TablePayload<ExtArgs>[]
      createdColumns: Prisma.$ColumnPayload<ExtArgs>[]
      createdRows: Prisma.$RowPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBases<T extends User$createdBasesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdBasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdTables<T extends User$createdTablesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdColumns<T extends User$createdColumnsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdColumnsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdRows<T extends User$createdRowsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdRowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.createdBases
   */
  export type User$createdBasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    where?: BaseWhereInput
    orderBy?: BaseOrderByWithRelationInput | BaseOrderByWithRelationInput[]
    cursor?: BaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BaseScalarFieldEnum | BaseScalarFieldEnum[]
  }

  /**
   * User.createdTables
   */
  export type User$createdTablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    where?: TableWhereInput
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    cursor?: TableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * User.createdColumns
   */
  export type User$createdColumnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    where?: ColumnWhereInput
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    cursor?: ColumnWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * User.createdRows
   */
  export type User$createdRowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    where?: RowWhereInput
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[]
    cursor?: RowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Base
   */

  export type AggregateBase = {
    _count: BaseCountAggregateOutputType | null
    _avg: BaseAvgAggregateOutputType | null
    _sum: BaseSumAggregateOutputType | null
    _min: BaseMinAggregateOutputType | null
    _max: BaseMaxAggregateOutputType | null
  }

  export type BaseAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type BaseSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type BaseMinAggregateOutputType = {
    id: string | null
    baseName: string | null
    description: string | null
    color: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type BaseMaxAggregateOutputType = {
    id: string | null
    baseName: string | null
    description: string | null
    color: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type BaseCountAggregateOutputType = {
    id: number
    baseName: number
    description: number
    color: number
    displayOrder: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type BaseAvgAggregateInputType = {
    displayOrder?: true
  }

  export type BaseSumAggregateInputType = {
    displayOrder?: true
  }

  export type BaseMinAggregateInputType = {
    id?: true
    baseName?: true
    description?: true
    color?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type BaseMaxAggregateInputType = {
    id?: true
    baseName?: true
    description?: true
    color?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type BaseCountAggregateInputType = {
    id?: true
    baseName?: true
    description?: true
    color?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type BaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Base to aggregate.
     */
    where?: BaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bases to fetch.
     */
    orderBy?: BaseOrderByWithRelationInput | BaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bases
    **/
    _count?: true | BaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BaseMaxAggregateInputType
  }

  export type GetBaseAggregateType<T extends BaseAggregateArgs> = {
        [P in keyof T & keyof AggregateBase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBase[P]>
      : GetScalarType<T[P], AggregateBase[P]>
  }




  export type BaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BaseWhereInput
    orderBy?: BaseOrderByWithAggregationInput | BaseOrderByWithAggregationInput[]
    by: BaseScalarFieldEnum[] | BaseScalarFieldEnum
    having?: BaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BaseCountAggregateInputType | true
    _avg?: BaseAvgAggregateInputType
    _sum?: BaseSumAggregateInputType
    _min?: BaseMinAggregateInputType
    _max?: BaseMaxAggregateInputType
  }

  export type BaseGroupByOutputType = {
    id: string
    baseName: string
    description: string | null
    color: string
    displayOrder: number
    createdAt: Date
    updatedAt: Date
    createdById: string | null
    _count: BaseCountAggregateOutputType | null
    _avg: BaseAvgAggregateOutputType | null
    _sum: BaseSumAggregateOutputType | null
    _min: BaseMinAggregateOutputType | null
    _max: BaseMaxAggregateOutputType | null
  }

  type GetBaseGroupByPayload<T extends BaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BaseGroupByOutputType[P]>
            : GetScalarType<T[P], BaseGroupByOutputType[P]>
        }
      >
    >


  export type BaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    baseName?: boolean
    description?: boolean
    color?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Base$createdByArgs<ExtArgs>
    tables?: boolean | Base$tablesArgs<ExtArgs>
    _count?: boolean | BaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["base"]>

  export type BaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    baseName?: boolean
    description?: boolean
    color?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Base$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["base"]>

  export type BaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    baseName?: boolean
    description?: boolean
    color?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Base$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["base"]>

  export type BaseSelectScalar = {
    id?: boolean
    baseName?: boolean
    description?: boolean
    color?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type BaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "baseName" | "description" | "color" | "displayOrder" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["base"]>
  export type BaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Base$createdByArgs<ExtArgs>
    tables?: boolean | Base$tablesArgs<ExtArgs>
    _count?: boolean | BaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Base$createdByArgs<ExtArgs>
  }
  export type BaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Base$createdByArgs<ExtArgs>
  }

  export type $BasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Base"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      tables: Prisma.$TablePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      baseName: string
      description: string | null
      color: string
      displayOrder: number
      createdAt: Date
      updatedAt: Date
      createdById: string | null
    }, ExtArgs["result"]["base"]>
    composites: {}
  }

  type BaseGetPayload<S extends boolean | null | undefined | BaseDefaultArgs> = $Result.GetResult<Prisma.$BasePayload, S>

  type BaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BaseCountAggregateInputType | true
    }

  export interface BaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Base'], meta: { name: 'Base' } }
    /**
     * Find zero or one Base that matches the filter.
     * @param {BaseFindUniqueArgs} args - Arguments to find a Base
     * @example
     * // Get one Base
     * const base = await prisma.base.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BaseFindUniqueArgs>(args: SelectSubset<T, BaseFindUniqueArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Base that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BaseFindUniqueOrThrowArgs} args - Arguments to find a Base
     * @example
     * // Get one Base
     * const base = await prisma.base.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BaseFindUniqueOrThrowArgs>(args: SelectSubset<T, BaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Base that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaseFindFirstArgs} args - Arguments to find a Base
     * @example
     * // Get one Base
     * const base = await prisma.base.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BaseFindFirstArgs>(args?: SelectSubset<T, BaseFindFirstArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Base that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaseFindFirstOrThrowArgs} args - Arguments to find a Base
     * @example
     * // Get one Base
     * const base = await prisma.base.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BaseFindFirstOrThrowArgs>(args?: SelectSubset<T, BaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bases
     * const bases = await prisma.base.findMany()
     * 
     * // Get first 10 Bases
     * const bases = await prisma.base.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const baseWithIdOnly = await prisma.base.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BaseFindManyArgs>(args?: SelectSubset<T, BaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Base.
     * @param {BaseCreateArgs} args - Arguments to create a Base.
     * @example
     * // Create one Base
     * const Base = await prisma.base.create({
     *   data: {
     *     // ... data to create a Base
     *   }
     * })
     * 
     */
    create<T extends BaseCreateArgs>(args: SelectSubset<T, BaseCreateArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bases.
     * @param {BaseCreateManyArgs} args - Arguments to create many Bases.
     * @example
     * // Create many Bases
     * const base = await prisma.base.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BaseCreateManyArgs>(args?: SelectSubset<T, BaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bases and returns the data saved in the database.
     * @param {BaseCreateManyAndReturnArgs} args - Arguments to create many Bases.
     * @example
     * // Create many Bases
     * const base = await prisma.base.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bases and only return the `id`
     * const baseWithIdOnly = await prisma.base.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BaseCreateManyAndReturnArgs>(args?: SelectSubset<T, BaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Base.
     * @param {BaseDeleteArgs} args - Arguments to delete one Base.
     * @example
     * // Delete one Base
     * const Base = await prisma.base.delete({
     *   where: {
     *     // ... filter to delete one Base
     *   }
     * })
     * 
     */
    delete<T extends BaseDeleteArgs>(args: SelectSubset<T, BaseDeleteArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Base.
     * @param {BaseUpdateArgs} args - Arguments to update one Base.
     * @example
     * // Update one Base
     * const base = await prisma.base.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BaseUpdateArgs>(args: SelectSubset<T, BaseUpdateArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bases.
     * @param {BaseDeleteManyArgs} args - Arguments to filter Bases to delete.
     * @example
     * // Delete a few Bases
     * const { count } = await prisma.base.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BaseDeleteManyArgs>(args?: SelectSubset<T, BaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bases
     * const base = await prisma.base.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BaseUpdateManyArgs>(args: SelectSubset<T, BaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bases and returns the data updated in the database.
     * @param {BaseUpdateManyAndReturnArgs} args - Arguments to update many Bases.
     * @example
     * // Update many Bases
     * const base = await prisma.base.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bases and only return the `id`
     * const baseWithIdOnly = await prisma.base.updateManyAndReturn({
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
    updateManyAndReturn<T extends BaseUpdateManyAndReturnArgs>(args: SelectSubset<T, BaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Base.
     * @param {BaseUpsertArgs} args - Arguments to update or create a Base.
     * @example
     * // Update or create a Base
     * const base = await prisma.base.upsert({
     *   create: {
     *     // ... data to create a Base
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Base we want to update
     *   }
     * })
     */
    upsert<T extends BaseUpsertArgs>(args: SelectSubset<T, BaseUpsertArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaseCountArgs} args - Arguments to filter Bases to count.
     * @example
     * // Count the number of Bases
     * const count = await prisma.base.count({
     *   where: {
     *     // ... the filter for the Bases we want to count
     *   }
     * })
    **/
    count<T extends BaseCountArgs>(
      args?: Subset<T, BaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Base.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BaseAggregateArgs>(args: Subset<T, BaseAggregateArgs>): Prisma.PrismaPromise<GetBaseAggregateType<T>>

    /**
     * Group by Base.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaseGroupByArgs} args - Group by arguments.
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
      T extends BaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BaseGroupByArgs['orderBy'] }
        : { orderBy?: BaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Base model
   */
  readonly fields: BaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Base.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Base$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Base$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tables<T extends Base$tablesArgs<ExtArgs> = {}>(args?: Subset<T, Base$tablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Base model
   */
  interface BaseFieldRefs {
    readonly id: FieldRef<"Base", 'String'>
    readonly baseName: FieldRef<"Base", 'String'>
    readonly description: FieldRef<"Base", 'String'>
    readonly color: FieldRef<"Base", 'String'>
    readonly displayOrder: FieldRef<"Base", 'Int'>
    readonly createdAt: FieldRef<"Base", 'DateTime'>
    readonly updatedAt: FieldRef<"Base", 'DateTime'>
    readonly createdById: FieldRef<"Base", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Base findUnique
   */
  export type BaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * Filter, which Base to fetch.
     */
    where: BaseWhereUniqueInput
  }

  /**
   * Base findUniqueOrThrow
   */
  export type BaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * Filter, which Base to fetch.
     */
    where: BaseWhereUniqueInput
  }

  /**
   * Base findFirst
   */
  export type BaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * Filter, which Base to fetch.
     */
    where?: BaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bases to fetch.
     */
    orderBy?: BaseOrderByWithRelationInput | BaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bases.
     */
    cursor?: BaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bases.
     */
    distinct?: BaseScalarFieldEnum | BaseScalarFieldEnum[]
  }

  /**
   * Base findFirstOrThrow
   */
  export type BaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * Filter, which Base to fetch.
     */
    where?: BaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bases to fetch.
     */
    orderBy?: BaseOrderByWithRelationInput | BaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bases.
     */
    cursor?: BaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bases.
     */
    distinct?: BaseScalarFieldEnum | BaseScalarFieldEnum[]
  }

  /**
   * Base findMany
   */
  export type BaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * Filter, which Bases to fetch.
     */
    where?: BaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bases to fetch.
     */
    orderBy?: BaseOrderByWithRelationInput | BaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bases.
     */
    cursor?: BaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bases.
     */
    skip?: number
    distinct?: BaseScalarFieldEnum | BaseScalarFieldEnum[]
  }

  /**
   * Base create
   */
  export type BaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Base.
     */
    data: XOR<BaseCreateInput, BaseUncheckedCreateInput>
  }

  /**
   * Base createMany
   */
  export type BaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bases.
     */
    data: BaseCreateManyInput | BaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Base createManyAndReturn
   */
  export type BaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * The data used to create many Bases.
     */
    data: BaseCreateManyInput | BaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Base update
   */
  export type BaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Base.
     */
    data: XOR<BaseUpdateInput, BaseUncheckedUpdateInput>
    /**
     * Choose, which Base to update.
     */
    where: BaseWhereUniqueInput
  }

  /**
   * Base updateMany
   */
  export type BaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bases.
     */
    data: XOR<BaseUpdateManyMutationInput, BaseUncheckedUpdateManyInput>
    /**
     * Filter which Bases to update
     */
    where?: BaseWhereInput
    /**
     * Limit how many Bases to update.
     */
    limit?: number
  }

  /**
   * Base updateManyAndReturn
   */
  export type BaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * The data used to update Bases.
     */
    data: XOR<BaseUpdateManyMutationInput, BaseUncheckedUpdateManyInput>
    /**
     * Filter which Bases to update
     */
    where?: BaseWhereInput
    /**
     * Limit how many Bases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Base upsert
   */
  export type BaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Base to update in case it exists.
     */
    where: BaseWhereUniqueInput
    /**
     * In case the Base found by the `where` argument doesn't exist, create a new Base with this data.
     */
    create: XOR<BaseCreateInput, BaseUncheckedCreateInput>
    /**
     * In case the Base was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BaseUpdateInput, BaseUncheckedUpdateInput>
  }

  /**
   * Base delete
   */
  export type BaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
    /**
     * Filter which Base to delete.
     */
    where: BaseWhereUniqueInput
  }

  /**
   * Base deleteMany
   */
  export type BaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bases to delete
     */
    where?: BaseWhereInput
    /**
     * Limit how many Bases to delete.
     */
    limit?: number
  }

  /**
   * Base.createdBy
   */
  export type Base$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Base.tables
   */
  export type Base$tablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    where?: TableWhereInput
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    cursor?: TableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Base without action
   */
  export type BaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Base
     */
    select?: BaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Base
     */
    omit?: BaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaseInclude<ExtArgs> | null
  }


  /**
   * Model Table
   */

  export type AggregateTable = {
    _count: TableCountAggregateOutputType | null
    _avg: TableAvgAggregateOutputType | null
    _sum: TableSumAggregateOutputType | null
    _min: TableMinAggregateOutputType | null
    _max: TableMaxAggregateOutputType | null
  }

  export type TableAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type TableSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type TableMinAggregateOutputType = {
    id: string | null
    tableName: string | null
    displayOrder: number | null
    baseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type TableMaxAggregateOutputType = {
    id: string | null
    tableName: string | null
    displayOrder: number | null
    baseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type TableCountAggregateOutputType = {
    id: number
    tableName: number
    displayOrder: number
    baseId: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type TableAvgAggregateInputType = {
    displayOrder?: true
  }

  export type TableSumAggregateInputType = {
    displayOrder?: true
  }

  export type TableMinAggregateInputType = {
    id?: true
    tableName?: true
    displayOrder?: true
    baseId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type TableMaxAggregateInputType = {
    id?: true
    tableName?: true
    displayOrder?: true
    baseId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type TableCountAggregateInputType = {
    id?: true
    tableName?: true
    displayOrder?: true
    baseId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type TableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Table to aggregate.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tables
    **/
    _count?: true | TableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TableMaxAggregateInputType
  }

  export type GetTableAggregateType<T extends TableAggregateArgs> = {
        [P in keyof T & keyof AggregateTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTable[P]>
      : GetScalarType<T[P], AggregateTable[P]>
  }




  export type TableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableWhereInput
    orderBy?: TableOrderByWithAggregationInput | TableOrderByWithAggregationInput[]
    by: TableScalarFieldEnum[] | TableScalarFieldEnum
    having?: TableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TableCountAggregateInputType | true
    _avg?: TableAvgAggregateInputType
    _sum?: TableSumAggregateInputType
    _min?: TableMinAggregateInputType
    _max?: TableMaxAggregateInputType
  }

  export type TableGroupByOutputType = {
    id: string
    tableName: string
    displayOrder: number
    baseId: string
    createdAt: Date
    updatedAt: Date
    createdById: string | null
    _count: TableCountAggregateOutputType | null
    _avg: TableAvgAggregateOutputType | null
    _sum: TableSumAggregateOutputType | null
    _min: TableMinAggregateOutputType | null
    _max: TableMaxAggregateOutputType | null
  }

  type GetTableGroupByPayload<T extends TableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TableGroupByOutputType[P]>
            : GetScalarType<T[P], TableGroupByOutputType[P]>
        }
      >
    >


  export type TableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tableName?: boolean
    displayOrder?: boolean
    baseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Table$createdByArgs<ExtArgs>
    base?: boolean | BaseDefaultArgs<ExtArgs>
    columns?: boolean | Table$columnsArgs<ExtArgs>
    rows?: boolean | Table$rowsArgs<ExtArgs>
    views?: boolean | Table$viewsArgs<ExtArgs>
    _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tableName?: boolean
    displayOrder?: boolean
    baseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Table$createdByArgs<ExtArgs>
    base?: boolean | BaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tableName?: boolean
    displayOrder?: boolean
    baseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Table$createdByArgs<ExtArgs>
    base?: boolean | BaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectScalar = {
    id?: boolean
    tableName?: boolean
    displayOrder?: boolean
    baseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type TableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tableName" | "displayOrder" | "baseId" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["table"]>
  export type TableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Table$createdByArgs<ExtArgs>
    base?: boolean | BaseDefaultArgs<ExtArgs>
    columns?: boolean | Table$columnsArgs<ExtArgs>
    rows?: boolean | Table$rowsArgs<ExtArgs>
    views?: boolean | Table$viewsArgs<ExtArgs>
    _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Table$createdByArgs<ExtArgs>
    base?: boolean | BaseDefaultArgs<ExtArgs>
  }
  export type TableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Table$createdByArgs<ExtArgs>
    base?: boolean | BaseDefaultArgs<ExtArgs>
  }

  export type $TablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Table"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      base: Prisma.$BasePayload<ExtArgs>
      columns: Prisma.$ColumnPayload<ExtArgs>[]
      rows: Prisma.$RowPayload<ExtArgs>[]
      views: Prisma.$ViewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tableName: string
      displayOrder: number
      baseId: string
      createdAt: Date
      updatedAt: Date
      createdById: string | null
    }, ExtArgs["result"]["table"]>
    composites: {}
  }

  type TableGetPayload<S extends boolean | null | undefined | TableDefaultArgs> = $Result.GetResult<Prisma.$TablePayload, S>

  type TableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TableCountAggregateInputType | true
    }

  export interface TableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Table'], meta: { name: 'Table' } }
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
    findUnique<T extends TableFindUniqueArgs>(args: SelectSubset<T, TableFindUniqueArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends TableFindUniqueOrThrowArgs>(args: SelectSubset<T, TableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends TableFindFirstArgs>(args?: SelectSubset<T, TableFindFirstArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends TableFindFirstOrThrowArgs>(args?: SelectSubset<T, TableFindFirstOrThrowArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends TableFindManyArgs>(args?: SelectSubset<T, TableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends TableCreateArgs>(args: SelectSubset<T, TableCreateArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createMany<T extends TableCreateManyArgs>(args?: SelectSubset<T, TableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    createManyAndReturn<T extends TableCreateManyAndReturnArgs>(args?: SelectSubset<T, TableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends TableDeleteArgs>(args: SelectSubset<T, TableDeleteArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends TableUpdateArgs>(args: SelectSubset<T, TableUpdateArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    deleteMany<T extends TableDeleteManyArgs>(args?: SelectSubset<T, TableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends TableUpdateManyArgs>(args: SelectSubset<T, TableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateManyAndReturn<T extends TableUpdateManyAndReturnArgs>(args: SelectSubset<T, TableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends TableUpsertArgs>(args: SelectSubset<T, TableUpsertArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TableCountAggregateOutputType>
        : number
    >

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
    aggregate<T extends TableAggregateArgs>(args: Subset<T, TableAggregateArgs>): Prisma.PrismaPromise<GetTableAggregateType<T>>

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
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TableGroupByArgs['orderBy'] }
        : { orderBy?: TableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
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
  export interface Prisma__TableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Table$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Table$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    base<T extends BaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BaseDefaultArgs<ExtArgs>>): Prisma__BaseClient<$Result.GetResult<Prisma.$BasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    columns<T extends Table$columnsArgs<ExtArgs> = {}>(args?: Subset<T, Table$columnsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rows<T extends Table$rowsArgs<ExtArgs> = {}>(args?: Subset<T, Table$rowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    views<T extends Table$viewsArgs<ExtArgs> = {}>(args?: Subset<T, Table$viewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Table model
   */
  interface TableFieldRefs {
    readonly id: FieldRef<"Table", 'String'>
    readonly tableName: FieldRef<"Table", 'String'>
    readonly displayOrder: FieldRef<"Table", 'Int'>
    readonly baseId: FieldRef<"Table", 'String'>
    readonly createdAt: FieldRef<"Table", 'DateTime'>
    readonly updatedAt: FieldRef<"Table", 'DateTime'>
    readonly createdById: FieldRef<"Table", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Table findUnique
   */
  export type TableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table findUniqueOrThrow
   */
  export type TableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table findFirst
   */
  export type TableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table findFirstOrThrow
   */
  export type TableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table findMany
   */
  export type TableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Tables to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table create
   */
  export type TableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The data needed to create a Table.
     */
    data: XOR<TableCreateInput, TableUncheckedCreateInput>
  }

  /**
   * Table createMany
   */
  export type TableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Table createManyAndReturn
   */
  export type TableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Table update
   */
  export type TableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The data needed to update a Table.
     */
    data: XOR<TableUpdateInput, TableUncheckedUpdateInput>
    /**
     * Choose, which Table to update.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table updateMany
   */
  export type TableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to update.
     */
    limit?: number
  }

  /**
   * Table updateManyAndReturn
   */
  export type TableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Table upsert
   */
  export type TableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The filter to search for the Table to update in case it exists.
     */
    where: TableWhereUniqueInput
    /**
     * In case the Table found by the `where` argument doesn't exist, create a new Table with this data.
     */
    create: XOR<TableCreateInput, TableUncheckedCreateInput>
    /**
     * In case the Table was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TableUpdateInput, TableUncheckedUpdateInput>
  }

  /**
   * Table delete
   */
  export type TableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter which Table to delete.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table deleteMany
   */
  export type TableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tables to delete
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to delete.
     */
    limit?: number
  }

  /**
   * Table.createdBy
   */
  export type Table$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Table.columns
   */
  export type Table$columnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    where?: ColumnWhereInput
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    cursor?: ColumnWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Table.rows
   */
  export type Table$rowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    where?: RowWhereInput
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[]
    cursor?: RowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[]
  }

  /**
   * Table.views
   */
  export type Table$viewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    where?: ViewWhereInput
    orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[]
    cursor?: ViewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ViewScalarFieldEnum | ViewScalarFieldEnum[]
  }

  /**
   * Table without action
   */
  export type TableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
  }


  /**
   * Model View
   */

  export type AggregateView = {
    _count: ViewCountAggregateOutputType | null
    _avg: ViewAvgAggregateOutputType | null
    _sum: ViewSumAggregateOutputType | null
    _min: ViewMinAggregateOutputType | null
    _max: ViewMaxAggregateOutputType | null
  }

  export type ViewAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ViewSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ViewMinAggregateOutputType = {
    id: string | null
    viewName: string | null
    tableId: string | null
    groupByColumnId: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ViewMaxAggregateOutputType = {
    id: string | null
    viewName: string | null
    tableId: string | null
    groupByColumnId: string | null
    displayOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ViewCountAggregateOutputType = {
    id: number
    viewName: number
    tableId: number
    filters: number
    groupByColumnId: number
    displayOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ViewAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ViewSumAggregateInputType = {
    displayOrder?: true
  }

  export type ViewMinAggregateInputType = {
    id?: true
    viewName?: true
    tableId?: true
    groupByColumnId?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ViewMaxAggregateInputType = {
    id?: true
    viewName?: true
    tableId?: true
    groupByColumnId?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ViewCountAggregateInputType = {
    id?: true
    viewName?: true
    tableId?: true
    filters?: true
    groupByColumnId?: true
    displayOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ViewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which View to aggregate.
     */
    where?: ViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Views to fetch.
     */
    orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Views from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Views.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Views
    **/
    _count?: true | ViewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ViewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ViewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ViewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ViewMaxAggregateInputType
  }

  export type GetViewAggregateType<T extends ViewAggregateArgs> = {
        [P in keyof T & keyof AggregateView]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateView[P]>
      : GetScalarType<T[P], AggregateView[P]>
  }




  export type ViewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ViewWhereInput
    orderBy?: ViewOrderByWithAggregationInput | ViewOrderByWithAggregationInput[]
    by: ViewScalarFieldEnum[] | ViewScalarFieldEnum
    having?: ViewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ViewCountAggregateInputType | true
    _avg?: ViewAvgAggregateInputType
    _sum?: ViewSumAggregateInputType
    _min?: ViewMinAggregateInputType
    _max?: ViewMaxAggregateInputType
  }

  export type ViewGroupByOutputType = {
    id: string
    viewName: string
    tableId: string
    filters: JsonValue
    groupByColumnId: string | null
    displayOrder: number
    createdAt: Date
    updatedAt: Date
    _count: ViewCountAggregateOutputType | null
    _avg: ViewAvgAggregateOutputType | null
    _sum: ViewSumAggregateOutputType | null
    _min: ViewMinAggregateOutputType | null
    _max: ViewMaxAggregateOutputType | null
  }

  type GetViewGroupByPayload<T extends ViewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ViewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ViewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ViewGroupByOutputType[P]>
            : GetScalarType<T[P], ViewGroupByOutputType[P]>
        }
      >
    >


  export type ViewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    viewName?: boolean
    tableId?: boolean
    filters?: boolean
    groupByColumnId?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["view"]>

  export type ViewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    viewName?: boolean
    tableId?: boolean
    filters?: boolean
    groupByColumnId?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["view"]>

  export type ViewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    viewName?: boolean
    tableId?: boolean
    filters?: boolean
    groupByColumnId?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["view"]>

  export type ViewSelectScalar = {
    id?: boolean
    viewName?: boolean
    tableId?: boolean
    filters?: boolean
    groupByColumnId?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ViewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "viewName" | "tableId" | "filters" | "groupByColumnId" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["view"]>
  export type ViewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | TableDefaultArgs<ExtArgs>
  }
  export type ViewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | TableDefaultArgs<ExtArgs>
  }
  export type ViewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | TableDefaultArgs<ExtArgs>
  }

  export type $ViewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "View"
    objects: {
      table: Prisma.$TablePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      viewName: string
      tableId: string
      filters: Prisma.JsonValue
      groupByColumnId: string | null
      displayOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["view"]>
    composites: {}
  }

  type ViewGetPayload<S extends boolean | null | undefined | ViewDefaultArgs> = $Result.GetResult<Prisma.$ViewPayload, S>

  type ViewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ViewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ViewCountAggregateInputType | true
    }

  export interface ViewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['View'], meta: { name: 'View' } }
    /**
     * Find zero or one View that matches the filter.
     * @param {ViewFindUniqueArgs} args - Arguments to find a View
     * @example
     * // Get one View
     * const view = await prisma.view.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ViewFindUniqueArgs>(args: SelectSubset<T, ViewFindUniqueArgs<ExtArgs>>): Prisma__ViewClient<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one View that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ViewFindUniqueOrThrowArgs} args - Arguments to find a View
     * @example
     * // Get one View
     * const view = await prisma.view.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ViewFindUniqueOrThrowArgs>(args: SelectSubset<T, ViewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ViewClient<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first View that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewFindFirstArgs} args - Arguments to find a View
     * @example
     * // Get one View
     * const view = await prisma.view.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ViewFindFirstArgs>(args?: SelectSubset<T, ViewFindFirstArgs<ExtArgs>>): Prisma__ViewClient<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first View that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewFindFirstOrThrowArgs} args - Arguments to find a View
     * @example
     * // Get one View
     * const view = await prisma.view.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ViewFindFirstOrThrowArgs>(args?: SelectSubset<T, ViewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ViewClient<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Views that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Views
     * const views = await prisma.view.findMany()
     * 
     * // Get first 10 Views
     * const views = await prisma.view.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const viewWithIdOnly = await prisma.view.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ViewFindManyArgs>(args?: SelectSubset<T, ViewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a View.
     * @param {ViewCreateArgs} args - Arguments to create a View.
     * @example
     * // Create one View
     * const View = await prisma.view.create({
     *   data: {
     *     // ... data to create a View
     *   }
     * })
     * 
     */
    create<T extends ViewCreateArgs>(args: SelectSubset<T, ViewCreateArgs<ExtArgs>>): Prisma__ViewClient<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Views.
     * @param {ViewCreateManyArgs} args - Arguments to create many Views.
     * @example
     * // Create many Views
     * const view = await prisma.view.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ViewCreateManyArgs>(args?: SelectSubset<T, ViewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Views and returns the data saved in the database.
     * @param {ViewCreateManyAndReturnArgs} args - Arguments to create many Views.
     * @example
     * // Create many Views
     * const view = await prisma.view.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Views and only return the `id`
     * const viewWithIdOnly = await prisma.view.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ViewCreateManyAndReturnArgs>(args?: SelectSubset<T, ViewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a View.
     * @param {ViewDeleteArgs} args - Arguments to delete one View.
     * @example
     * // Delete one View
     * const View = await prisma.view.delete({
     *   where: {
     *     // ... filter to delete one View
     *   }
     * })
     * 
     */
    delete<T extends ViewDeleteArgs>(args: SelectSubset<T, ViewDeleteArgs<ExtArgs>>): Prisma__ViewClient<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one View.
     * @param {ViewUpdateArgs} args - Arguments to update one View.
     * @example
     * // Update one View
     * const view = await prisma.view.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ViewUpdateArgs>(args: SelectSubset<T, ViewUpdateArgs<ExtArgs>>): Prisma__ViewClient<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Views.
     * @param {ViewDeleteManyArgs} args - Arguments to filter Views to delete.
     * @example
     * // Delete a few Views
     * const { count } = await prisma.view.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ViewDeleteManyArgs>(args?: SelectSubset<T, ViewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Views.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Views
     * const view = await prisma.view.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ViewUpdateManyArgs>(args: SelectSubset<T, ViewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Views and returns the data updated in the database.
     * @param {ViewUpdateManyAndReturnArgs} args - Arguments to update many Views.
     * @example
     * // Update many Views
     * const view = await prisma.view.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Views and only return the `id`
     * const viewWithIdOnly = await prisma.view.updateManyAndReturn({
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
    updateManyAndReturn<T extends ViewUpdateManyAndReturnArgs>(args: SelectSubset<T, ViewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one View.
     * @param {ViewUpsertArgs} args - Arguments to update or create a View.
     * @example
     * // Update or create a View
     * const view = await prisma.view.upsert({
     *   create: {
     *     // ... data to create a View
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the View we want to update
     *   }
     * })
     */
    upsert<T extends ViewUpsertArgs>(args: SelectSubset<T, ViewUpsertArgs<ExtArgs>>): Prisma__ViewClient<$Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Views.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewCountArgs} args - Arguments to filter Views to count.
     * @example
     * // Count the number of Views
     * const count = await prisma.view.count({
     *   where: {
     *     // ... the filter for the Views we want to count
     *   }
     * })
    **/
    count<T extends ViewCountArgs>(
      args?: Subset<T, ViewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ViewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a View.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ViewAggregateArgs>(args: Subset<T, ViewAggregateArgs>): Prisma.PrismaPromise<GetViewAggregateType<T>>

    /**
     * Group by View.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewGroupByArgs} args - Group by arguments.
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
      T extends ViewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ViewGroupByArgs['orderBy'] }
        : { orderBy?: ViewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ViewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetViewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the View model
   */
  readonly fields: ViewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for View.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ViewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    table<T extends TableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TableDefaultArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the View model
   */
  interface ViewFieldRefs {
    readonly id: FieldRef<"View", 'String'>
    readonly viewName: FieldRef<"View", 'String'>
    readonly tableId: FieldRef<"View", 'String'>
    readonly filters: FieldRef<"View", 'Json'>
    readonly groupByColumnId: FieldRef<"View", 'String'>
    readonly displayOrder: FieldRef<"View", 'Int'>
    readonly createdAt: FieldRef<"View", 'DateTime'>
    readonly updatedAt: FieldRef<"View", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * View findUnique
   */
  export type ViewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * Filter, which View to fetch.
     */
    where: ViewWhereUniqueInput
  }

  /**
   * View findUniqueOrThrow
   */
  export type ViewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * Filter, which View to fetch.
     */
    where: ViewWhereUniqueInput
  }

  /**
   * View findFirst
   */
  export type ViewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * Filter, which View to fetch.
     */
    where?: ViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Views to fetch.
     */
    orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Views.
     */
    cursor?: ViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Views from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Views.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Views.
     */
    distinct?: ViewScalarFieldEnum | ViewScalarFieldEnum[]
  }

  /**
   * View findFirstOrThrow
   */
  export type ViewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * Filter, which View to fetch.
     */
    where?: ViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Views to fetch.
     */
    orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Views.
     */
    cursor?: ViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Views from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Views.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Views.
     */
    distinct?: ViewScalarFieldEnum | ViewScalarFieldEnum[]
  }

  /**
   * View findMany
   */
  export type ViewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * Filter, which Views to fetch.
     */
    where?: ViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Views to fetch.
     */
    orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Views.
     */
    cursor?: ViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Views from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Views.
     */
    skip?: number
    distinct?: ViewScalarFieldEnum | ViewScalarFieldEnum[]
  }

  /**
   * View create
   */
  export type ViewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * The data needed to create a View.
     */
    data: XOR<ViewCreateInput, ViewUncheckedCreateInput>
  }

  /**
   * View createMany
   */
  export type ViewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Views.
     */
    data: ViewCreateManyInput | ViewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * View createManyAndReturn
   */
  export type ViewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * The data used to create many Views.
     */
    data: ViewCreateManyInput | ViewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * View update
   */
  export type ViewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * The data needed to update a View.
     */
    data: XOR<ViewUpdateInput, ViewUncheckedUpdateInput>
    /**
     * Choose, which View to update.
     */
    where: ViewWhereUniqueInput
  }

  /**
   * View updateMany
   */
  export type ViewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Views.
     */
    data: XOR<ViewUpdateManyMutationInput, ViewUncheckedUpdateManyInput>
    /**
     * Filter which Views to update
     */
    where?: ViewWhereInput
    /**
     * Limit how many Views to update.
     */
    limit?: number
  }

  /**
   * View updateManyAndReturn
   */
  export type ViewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * The data used to update Views.
     */
    data: XOR<ViewUpdateManyMutationInput, ViewUncheckedUpdateManyInput>
    /**
     * Filter which Views to update
     */
    where?: ViewWhereInput
    /**
     * Limit how many Views to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * View upsert
   */
  export type ViewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * The filter to search for the View to update in case it exists.
     */
    where: ViewWhereUniqueInput
    /**
     * In case the View found by the `where` argument doesn't exist, create a new View with this data.
     */
    create: XOR<ViewCreateInput, ViewUncheckedCreateInput>
    /**
     * In case the View was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ViewUpdateInput, ViewUncheckedUpdateInput>
  }

  /**
   * View delete
   */
  export type ViewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
    /**
     * Filter which View to delete.
     */
    where: ViewWhereUniqueInput
  }

  /**
   * View deleteMany
   */
  export type ViewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Views to delete
     */
    where?: ViewWhereInput
    /**
     * Limit how many Views to delete.
     */
    limit?: number
  }

  /**
   * View without action
   */
  export type ViewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the View
     */
    select?: ViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the View
     */
    omit?: ViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewInclude<ExtArgs> | null
  }


  /**
   * Model Column
   */

  export type AggregateColumn = {
    _count: ColumnCountAggregateOutputType | null
    _avg: ColumnAvgAggregateOutputType | null
    _sum: ColumnSumAggregateOutputType | null
    _min: ColumnMinAggregateOutputType | null
    _max: ColumnMaxAggregateOutputType | null
  }

  export type ColumnAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ColumnSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ColumnMinAggregateOutputType = {
    id: string | null
    columnName: string | null
    fieldType: $Enums.FieldType | null
    displayOrder: number | null
    tableId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type ColumnMaxAggregateOutputType = {
    id: string | null
    columnName: string | null
    fieldType: $Enums.FieldType | null
    displayOrder: number | null
    tableId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type ColumnCountAggregateOutputType = {
    id: number
    columnName: number
    fieldType: number
    displayOrder: number
    tableId: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type ColumnAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ColumnSumAggregateInputType = {
    displayOrder?: true
  }

  export type ColumnMinAggregateInputType = {
    id?: true
    columnName?: true
    fieldType?: true
    displayOrder?: true
    tableId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type ColumnMaxAggregateInputType = {
    id?: true
    columnName?: true
    fieldType?: true
    displayOrder?: true
    tableId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type ColumnCountAggregateInputType = {
    id?: true
    columnName?: true
    fieldType?: true
    displayOrder?: true
    tableId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type ColumnAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Column to aggregate.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Columns
    **/
    _count?: true | ColumnCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColumnAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColumnSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColumnMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColumnMaxAggregateInputType
  }

  export type GetColumnAggregateType<T extends ColumnAggregateArgs> = {
        [P in keyof T & keyof AggregateColumn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColumn[P]>
      : GetScalarType<T[P], AggregateColumn[P]>
  }




  export type ColumnGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnWhereInput
    orderBy?: ColumnOrderByWithAggregationInput | ColumnOrderByWithAggregationInput[]
    by: ColumnScalarFieldEnum[] | ColumnScalarFieldEnum
    having?: ColumnScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColumnCountAggregateInputType | true
    _avg?: ColumnAvgAggregateInputType
    _sum?: ColumnSumAggregateInputType
    _min?: ColumnMinAggregateInputType
    _max?: ColumnMaxAggregateInputType
  }

  export type ColumnGroupByOutputType = {
    id: string
    columnName: string
    fieldType: $Enums.FieldType
    displayOrder: number
    tableId: string
    createdAt: Date
    updatedAt: Date
    createdById: string | null
    _count: ColumnCountAggregateOutputType | null
    _avg: ColumnAvgAggregateOutputType | null
    _sum: ColumnSumAggregateOutputType | null
    _min: ColumnMinAggregateOutputType | null
    _max: ColumnMaxAggregateOutputType | null
  }

  type GetColumnGroupByPayload<T extends ColumnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColumnGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColumnGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColumnGroupByOutputType[P]>
            : GetScalarType<T[P], ColumnGroupByOutputType[P]>
        }
      >
    >


  export type ColumnSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    columnName?: boolean
    fieldType?: boolean
    displayOrder?: boolean
    tableId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Column$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
    cells?: boolean | Column$cellsArgs<ExtArgs>
    _count?: boolean | ColumnCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    columnName?: boolean
    fieldType?: boolean
    displayOrder?: boolean
    tableId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Column$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    columnName?: boolean
    fieldType?: boolean
    displayOrder?: boolean
    tableId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Column$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectScalar = {
    id?: boolean
    columnName?: boolean
    fieldType?: boolean
    displayOrder?: boolean
    tableId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type ColumnOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "columnName" | "fieldType" | "displayOrder" | "tableId" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["column"]>
  export type ColumnInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Column$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
    cells?: boolean | Column$cellsArgs<ExtArgs>
    _count?: boolean | ColumnCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ColumnIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Column$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
  }
  export type ColumnIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Column$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
  }

  export type $ColumnPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Column"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      table: Prisma.$TablePayload<ExtArgs>
      cells: Prisma.$CellPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      columnName: string
      fieldType: $Enums.FieldType
      displayOrder: number
      tableId: string
      createdAt: Date
      updatedAt: Date
      createdById: string | null
    }, ExtArgs["result"]["column"]>
    composites: {}
  }

  type ColumnGetPayload<S extends boolean | null | undefined | ColumnDefaultArgs> = $Result.GetResult<Prisma.$ColumnPayload, S>

  type ColumnCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColumnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColumnCountAggregateInputType | true
    }

  export interface ColumnDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Column'], meta: { name: 'Column' } }
    /**
     * Find zero or one Column that matches the filter.
     * @param {ColumnFindUniqueArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColumnFindUniqueArgs>(args: SelectSubset<T, ColumnFindUniqueArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Column that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColumnFindUniqueOrThrowArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColumnFindUniqueOrThrowArgs>(args: SelectSubset<T, ColumnFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Column that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindFirstArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColumnFindFirstArgs>(args?: SelectSubset<T, ColumnFindFirstArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Column that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindFirstOrThrowArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColumnFindFirstOrThrowArgs>(args?: SelectSubset<T, ColumnFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Columns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Columns
     * const columns = await prisma.column.findMany()
     * 
     * // Get first 10 Columns
     * const columns = await prisma.column.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const columnWithIdOnly = await prisma.column.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColumnFindManyArgs>(args?: SelectSubset<T, ColumnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Column.
     * @param {ColumnCreateArgs} args - Arguments to create a Column.
     * @example
     * // Create one Column
     * const Column = await prisma.column.create({
     *   data: {
     *     // ... data to create a Column
     *   }
     * })
     * 
     */
    create<T extends ColumnCreateArgs>(args: SelectSubset<T, ColumnCreateArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Columns.
     * @param {ColumnCreateManyArgs} args - Arguments to create many Columns.
     * @example
     * // Create many Columns
     * const column = await prisma.column.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColumnCreateManyArgs>(args?: SelectSubset<T, ColumnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Columns and returns the data saved in the database.
     * @param {ColumnCreateManyAndReturnArgs} args - Arguments to create many Columns.
     * @example
     * // Create many Columns
     * const column = await prisma.column.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Columns and only return the `id`
     * const columnWithIdOnly = await prisma.column.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColumnCreateManyAndReturnArgs>(args?: SelectSubset<T, ColumnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Column.
     * @param {ColumnDeleteArgs} args - Arguments to delete one Column.
     * @example
     * // Delete one Column
     * const Column = await prisma.column.delete({
     *   where: {
     *     // ... filter to delete one Column
     *   }
     * })
     * 
     */
    delete<T extends ColumnDeleteArgs>(args: SelectSubset<T, ColumnDeleteArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Column.
     * @param {ColumnUpdateArgs} args - Arguments to update one Column.
     * @example
     * // Update one Column
     * const column = await prisma.column.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColumnUpdateArgs>(args: SelectSubset<T, ColumnUpdateArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Columns.
     * @param {ColumnDeleteManyArgs} args - Arguments to filter Columns to delete.
     * @example
     * // Delete a few Columns
     * const { count } = await prisma.column.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColumnDeleteManyArgs>(args?: SelectSubset<T, ColumnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Columns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Columns
     * const column = await prisma.column.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColumnUpdateManyArgs>(args: SelectSubset<T, ColumnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Columns and returns the data updated in the database.
     * @param {ColumnUpdateManyAndReturnArgs} args - Arguments to update many Columns.
     * @example
     * // Update many Columns
     * const column = await prisma.column.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Columns and only return the `id`
     * const columnWithIdOnly = await prisma.column.updateManyAndReturn({
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
    updateManyAndReturn<T extends ColumnUpdateManyAndReturnArgs>(args: SelectSubset<T, ColumnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Column.
     * @param {ColumnUpsertArgs} args - Arguments to update or create a Column.
     * @example
     * // Update or create a Column
     * const column = await prisma.column.upsert({
     *   create: {
     *     // ... data to create a Column
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Column we want to update
     *   }
     * })
     */
    upsert<T extends ColumnUpsertArgs>(args: SelectSubset<T, ColumnUpsertArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Columns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnCountArgs} args - Arguments to filter Columns to count.
     * @example
     * // Count the number of Columns
     * const count = await prisma.column.count({
     *   where: {
     *     // ... the filter for the Columns we want to count
     *   }
     * })
    **/
    count<T extends ColumnCountArgs>(
      args?: Subset<T, ColumnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColumnCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Column.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ColumnAggregateArgs>(args: Subset<T, ColumnAggregateArgs>): Prisma.PrismaPromise<GetColumnAggregateType<T>>

    /**
     * Group by Column.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnGroupByArgs} args - Group by arguments.
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
      T extends ColumnGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColumnGroupByArgs['orderBy'] }
        : { orderBy?: ColumnGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColumnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColumnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Column model
   */
  readonly fields: ColumnFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Column.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColumnClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Column$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Column$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    table<T extends TableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TableDefaultArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cells<T extends Column$cellsArgs<ExtArgs> = {}>(args?: Subset<T, Column$cellsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Column model
   */
  interface ColumnFieldRefs {
    readonly id: FieldRef<"Column", 'String'>
    readonly columnName: FieldRef<"Column", 'String'>
    readonly fieldType: FieldRef<"Column", 'FieldType'>
    readonly displayOrder: FieldRef<"Column", 'Int'>
    readonly tableId: FieldRef<"Column", 'String'>
    readonly createdAt: FieldRef<"Column", 'DateTime'>
    readonly updatedAt: FieldRef<"Column", 'DateTime'>
    readonly createdById: FieldRef<"Column", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Column findUnique
   */
  export type ColumnFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column findUniqueOrThrow
   */
  export type ColumnFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column findFirst
   */
  export type ColumnFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column findFirstOrThrow
   */
  export type ColumnFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column findMany
   */
  export type ColumnFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Columns to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column create
   */
  export type ColumnCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The data needed to create a Column.
     */
    data: XOR<ColumnCreateInput, ColumnUncheckedCreateInput>
  }

  /**
   * Column createMany
   */
  export type ColumnCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Columns.
     */
    data: ColumnCreateManyInput | ColumnCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Column createManyAndReturn
   */
  export type ColumnCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * The data used to create many Columns.
     */
    data: ColumnCreateManyInput | ColumnCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Column update
   */
  export type ColumnUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The data needed to update a Column.
     */
    data: XOR<ColumnUpdateInput, ColumnUncheckedUpdateInput>
    /**
     * Choose, which Column to update.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column updateMany
   */
  export type ColumnUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Columns.
     */
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyInput>
    /**
     * Filter which Columns to update
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to update.
     */
    limit?: number
  }

  /**
   * Column updateManyAndReturn
   */
  export type ColumnUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * The data used to update Columns.
     */
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyInput>
    /**
     * Filter which Columns to update
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Column upsert
   */
  export type ColumnUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The filter to search for the Column to update in case it exists.
     */
    where: ColumnWhereUniqueInput
    /**
     * In case the Column found by the `where` argument doesn't exist, create a new Column with this data.
     */
    create: XOR<ColumnCreateInput, ColumnUncheckedCreateInput>
    /**
     * In case the Column was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColumnUpdateInput, ColumnUncheckedUpdateInput>
  }

  /**
   * Column delete
   */
  export type ColumnDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter which Column to delete.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column deleteMany
   */
  export type ColumnDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Columns to delete
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to delete.
     */
    limit?: number
  }

  /**
   * Column.createdBy
   */
  export type Column$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Column.cells
   */
  export type Column$cellsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    where?: CellWhereInput
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[]
    cursor?: CellWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[]
  }

  /**
   * Column without action
   */
  export type ColumnDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
  }


  /**
   * Model Row
   */

  export type AggregateRow = {
    _count: RowCountAggregateOutputType | null
    _avg: RowAvgAggregateOutputType | null
    _sum: RowSumAggregateOutputType | null
    _min: RowMinAggregateOutputType | null
    _max: RowMaxAggregateOutputType | null
  }

  export type RowAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type RowSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type RowMinAggregateOutputType = {
    id: string | null
    displayOrder: number | null
    tableId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type RowMaxAggregateOutputType = {
    id: string | null
    displayOrder: number | null
    tableId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type RowCountAggregateOutputType = {
    id: number
    displayOrder: number
    tableId: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type RowAvgAggregateInputType = {
    displayOrder?: true
  }

  export type RowSumAggregateInputType = {
    displayOrder?: true
  }

  export type RowMinAggregateInputType = {
    id?: true
    displayOrder?: true
    tableId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type RowMaxAggregateInputType = {
    id?: true
    displayOrder?: true
    tableId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type RowCountAggregateInputType = {
    id?: true
    displayOrder?: true
    tableId?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type RowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Row to aggregate.
     */
    where?: RowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rows to fetch.
     */
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rows
    **/
    _count?: true | RowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RowMaxAggregateInputType
  }

  export type GetRowAggregateType<T extends RowAggregateArgs> = {
        [P in keyof T & keyof AggregateRow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRow[P]>
      : GetScalarType<T[P], AggregateRow[P]>
  }




  export type RowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RowWhereInput
    orderBy?: RowOrderByWithAggregationInput | RowOrderByWithAggregationInput[]
    by: RowScalarFieldEnum[] | RowScalarFieldEnum
    having?: RowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RowCountAggregateInputType | true
    _avg?: RowAvgAggregateInputType
    _sum?: RowSumAggregateInputType
    _min?: RowMinAggregateInputType
    _max?: RowMaxAggregateInputType
  }

  export type RowGroupByOutputType = {
    id: string
    displayOrder: number
    tableId: string
    createdAt: Date
    updatedAt: Date
    createdById: string | null
    _count: RowCountAggregateOutputType | null
    _avg: RowAvgAggregateOutputType | null
    _sum: RowSumAggregateOutputType | null
    _min: RowMinAggregateOutputType | null
    _max: RowMaxAggregateOutputType | null
  }

  type GetRowGroupByPayload<T extends RowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RowGroupByOutputType[P]>
            : GetScalarType<T[P], RowGroupByOutputType[P]>
        }
      >
    >


  export type RowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayOrder?: boolean
    tableId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Row$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
    cells?: boolean | Row$cellsArgs<ExtArgs>
    _count?: boolean | RowCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["row"]>

  export type RowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayOrder?: boolean
    tableId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Row$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["row"]>

  export type RowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayOrder?: boolean
    tableId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | Row$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["row"]>

  export type RowSelectScalar = {
    id?: boolean
    displayOrder?: boolean
    tableId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type RowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "displayOrder" | "tableId" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["row"]>
  export type RowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Row$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
    cells?: boolean | Row$cellsArgs<ExtArgs>
    _count?: boolean | RowCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Row$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
  }
  export type RowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Row$createdByArgs<ExtArgs>
    table?: boolean | TableDefaultArgs<ExtArgs>
  }

  export type $RowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Row"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      table: Prisma.$TablePayload<ExtArgs>
      cells: Prisma.$CellPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      displayOrder: number
      tableId: string
      createdAt: Date
      updatedAt: Date
      createdById: string | null
    }, ExtArgs["result"]["row"]>
    composites: {}
  }

  type RowGetPayload<S extends boolean | null | undefined | RowDefaultArgs> = $Result.GetResult<Prisma.$RowPayload, S>

  type RowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RowCountAggregateInputType | true
    }

  export interface RowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Row'], meta: { name: 'Row' } }
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
    findUnique<T extends RowFindUniqueArgs>(args: SelectSubset<T, RowFindUniqueArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends RowFindUniqueOrThrowArgs>(args: SelectSubset<T, RowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends RowFindFirstArgs>(args?: SelectSubset<T, RowFindFirstArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends RowFindFirstOrThrowArgs>(args?: SelectSubset<T, RowFindFirstOrThrowArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends RowFindManyArgs>(args?: SelectSubset<T, RowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends RowCreateArgs>(args: SelectSubset<T, RowCreateArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createMany<T extends RowCreateManyArgs>(args?: SelectSubset<T, RowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    createManyAndReturn<T extends RowCreateManyAndReturnArgs>(args?: SelectSubset<T, RowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends RowDeleteArgs>(args: SelectSubset<T, RowDeleteArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends RowUpdateArgs>(args: SelectSubset<T, RowUpdateArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    deleteMany<T extends RowDeleteManyArgs>(args?: SelectSubset<T, RowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends RowUpdateManyArgs>(args: SelectSubset<T, RowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateManyAndReturn<T extends RowUpdateManyAndReturnArgs>(args: SelectSubset<T, RowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends RowUpsertArgs>(args: SelectSubset<T, RowUpsertArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RowCountAggregateOutputType>
        : number
    >

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
    aggregate<T extends RowAggregateArgs>(args: Subset<T, RowAggregateArgs>): Prisma.PrismaPromise<GetRowAggregateType<T>>

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
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RowGroupByArgs['orderBy'] }
        : { orderBy?: RowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
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
  export interface Prisma__RowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Row$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Row$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    table<T extends TableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TableDefaultArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cells<T extends Row$cellsArgs<ExtArgs> = {}>(args?: Subset<T, Row$cellsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Row model
   */
  interface RowFieldRefs {
    readonly id: FieldRef<"Row", 'String'>
    readonly displayOrder: FieldRef<"Row", 'Int'>
    readonly tableId: FieldRef<"Row", 'String'>
    readonly createdAt: FieldRef<"Row", 'DateTime'>
    readonly updatedAt: FieldRef<"Row", 'DateTime'>
    readonly createdById: FieldRef<"Row", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Row findUnique
   */
  export type RowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * Filter, which Row to fetch.
     */
    where: RowWhereUniqueInput
  }

  /**
   * Row findUniqueOrThrow
   */
  export type RowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * Filter, which Row to fetch.
     */
    where: RowWhereUniqueInput
  }

  /**
   * Row findFirst
   */
  export type RowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * Filter, which Row to fetch.
     */
    where?: RowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rows to fetch.
     */
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rows.
     */
    cursor?: RowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rows.
     */
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[]
  }

  /**
   * Row findFirstOrThrow
   */
  export type RowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * Filter, which Row to fetch.
     */
    where?: RowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rows to fetch.
     */
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rows.
     */
    cursor?: RowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rows.
     */
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[]
  }

  /**
   * Row findMany
   */
  export type RowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * Filter, which Rows to fetch.
     */
    where?: RowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rows to fetch.
     */
    orderBy?: RowOrderByWithRelationInput | RowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rows.
     */
    cursor?: RowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rows.
     */
    skip?: number
    distinct?: RowScalarFieldEnum | RowScalarFieldEnum[]
  }

  /**
   * Row create
   */
  export type RowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * The data needed to create a Row.
     */
    data: XOR<RowCreateInput, RowUncheckedCreateInput>
  }

  /**
   * Row createMany
   */
  export type RowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rows.
     */
    data: RowCreateManyInput | RowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Row createManyAndReturn
   */
  export type RowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * The data used to create many Rows.
     */
    data: RowCreateManyInput | RowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Row update
   */
  export type RowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * The data needed to update a Row.
     */
    data: XOR<RowUpdateInput, RowUncheckedUpdateInput>
    /**
     * Choose, which Row to update.
     */
    where: RowWhereUniqueInput
  }

  /**
   * Row updateMany
   */
  export type RowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rows.
     */
    data: XOR<RowUpdateManyMutationInput, RowUncheckedUpdateManyInput>
    /**
     * Filter which Rows to update
     */
    where?: RowWhereInput
    /**
     * Limit how many Rows to update.
     */
    limit?: number
  }

  /**
   * Row updateManyAndReturn
   */
  export type RowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * The data used to update Rows.
     */
    data: XOR<RowUpdateManyMutationInput, RowUncheckedUpdateManyInput>
    /**
     * Filter which Rows to update
     */
    where?: RowWhereInput
    /**
     * Limit how many Rows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Row upsert
   */
  export type RowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * The filter to search for the Row to update in case it exists.
     */
    where: RowWhereUniqueInput
    /**
     * In case the Row found by the `where` argument doesn't exist, create a new Row with this data.
     */
    create: XOR<RowCreateInput, RowUncheckedCreateInput>
    /**
     * In case the Row was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RowUpdateInput, RowUncheckedUpdateInput>
  }

  /**
   * Row delete
   */
  export type RowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
    /**
     * Filter which Row to delete.
     */
    where: RowWhereUniqueInput
  }

  /**
   * Row deleteMany
   */
  export type RowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rows to delete
     */
    where?: RowWhereInput
    /**
     * Limit how many Rows to delete.
     */
    limit?: number
  }

  /**
   * Row.createdBy
   */
  export type Row$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Row.cells
   */
  export type Row$cellsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    where?: CellWhereInput
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[]
    cursor?: CellWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[]
  }

  /**
   * Row without action
   */
  export type RowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Row
     */
    select?: RowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Row
     */
    omit?: RowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RowInclude<ExtArgs> | null
  }


  /**
   * Model Cell
   */

  export type AggregateCell = {
    _count: CellCountAggregateOutputType | null
    _min: CellMinAggregateOutputType | null
    _max: CellMaxAggregateOutputType | null
  }

  export type CellMinAggregateOutputType = {
    id: string | null
    cellValue: string | null
    rowId: string | null
    columnId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CellMaxAggregateOutputType = {
    id: string | null
    cellValue: string | null
    rowId: string | null
    columnId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CellCountAggregateOutputType = {
    id: number
    cellValue: number
    rowId: number
    columnId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CellMinAggregateInputType = {
    id?: true
    cellValue?: true
    rowId?: true
    columnId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CellMaxAggregateInputType = {
    id?: true
    cellValue?: true
    rowId?: true
    columnId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CellCountAggregateInputType = {
    id?: true
    cellValue?: true
    rowId?: true
    columnId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CellAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cell to aggregate.
     */
    where?: CellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cells to fetch.
     */
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cells
    **/
    _count?: true | CellCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CellMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CellMaxAggregateInputType
  }

  export type GetCellAggregateType<T extends CellAggregateArgs> = {
        [P in keyof T & keyof AggregateCell]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCell[P]>
      : GetScalarType<T[P], AggregateCell[P]>
  }




  export type CellGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CellWhereInput
    orderBy?: CellOrderByWithAggregationInput | CellOrderByWithAggregationInput[]
    by: CellScalarFieldEnum[] | CellScalarFieldEnum
    having?: CellScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CellCountAggregateInputType | true
    _min?: CellMinAggregateInputType
    _max?: CellMaxAggregateInputType
  }

  export type CellGroupByOutputType = {
    id: string
    cellValue: string | null
    rowId: string
    columnId: string
    createdAt: Date
    updatedAt: Date
    _count: CellCountAggregateOutputType | null
    _min: CellMinAggregateOutputType | null
    _max: CellMaxAggregateOutputType | null
  }

  type GetCellGroupByPayload<T extends CellGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CellGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CellGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CellGroupByOutputType[P]>
            : GetScalarType<T[P], CellGroupByOutputType[P]>
        }
      >
    >


  export type CellSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cellValue?: boolean
    rowId?: boolean
    columnId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    row?: boolean | RowDefaultArgs<ExtArgs>
    column?: boolean | ColumnDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cell"]>

  export type CellSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cellValue?: boolean
    rowId?: boolean
    columnId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    row?: boolean | RowDefaultArgs<ExtArgs>
    column?: boolean | ColumnDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cell"]>

  export type CellSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cellValue?: boolean
    rowId?: boolean
    columnId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    row?: boolean | RowDefaultArgs<ExtArgs>
    column?: boolean | ColumnDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cell"]>

  export type CellSelectScalar = {
    id?: boolean
    cellValue?: boolean
    rowId?: boolean
    columnId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CellOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cellValue" | "rowId" | "columnId" | "createdAt" | "updatedAt", ExtArgs["result"]["cell"]>
  export type CellInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    row?: boolean | RowDefaultArgs<ExtArgs>
    column?: boolean | ColumnDefaultArgs<ExtArgs>
  }
  export type CellIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    row?: boolean | RowDefaultArgs<ExtArgs>
    column?: boolean | ColumnDefaultArgs<ExtArgs>
  }
  export type CellIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    row?: boolean | RowDefaultArgs<ExtArgs>
    column?: boolean | ColumnDefaultArgs<ExtArgs>
  }

  export type $CellPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cell"
    objects: {
      row: Prisma.$RowPayload<ExtArgs>
      column: Prisma.$ColumnPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cellValue: string | null
      rowId: string
      columnId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cell"]>
    composites: {}
  }

  type CellGetPayload<S extends boolean | null | undefined | CellDefaultArgs> = $Result.GetResult<Prisma.$CellPayload, S>

  type CellCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CellFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CellCountAggregateInputType | true
    }

  export interface CellDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cell'], meta: { name: 'Cell' } }
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
    findUnique<T extends CellFindUniqueArgs>(args: SelectSubset<T, CellFindUniqueArgs<ExtArgs>>): Prisma__CellClient<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends CellFindUniqueOrThrowArgs>(args: SelectSubset<T, CellFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CellClient<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends CellFindFirstArgs>(args?: SelectSubset<T, CellFindFirstArgs<ExtArgs>>): Prisma__CellClient<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends CellFindFirstOrThrowArgs>(args?: SelectSubset<T, CellFindFirstOrThrowArgs<ExtArgs>>): Prisma__CellClient<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends CellFindManyArgs>(args?: SelectSubset<T, CellFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends CellCreateArgs>(args: SelectSubset<T, CellCreateArgs<ExtArgs>>): Prisma__CellClient<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createMany<T extends CellCreateManyArgs>(args?: SelectSubset<T, CellCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    createManyAndReturn<T extends CellCreateManyAndReturnArgs>(args?: SelectSubset<T, CellCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends CellDeleteArgs>(args: SelectSubset<T, CellDeleteArgs<ExtArgs>>): Prisma__CellClient<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends CellUpdateArgs>(args: SelectSubset<T, CellUpdateArgs<ExtArgs>>): Prisma__CellClient<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    deleteMany<T extends CellDeleteManyArgs>(args?: SelectSubset<T, CellDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends CellUpdateManyArgs>(args: SelectSubset<T, CellUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateManyAndReturn<T extends CellUpdateManyAndReturnArgs>(args: SelectSubset<T, CellUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends CellUpsertArgs>(args: SelectSubset<T, CellUpsertArgs<ExtArgs>>): Prisma__CellClient<$Result.GetResult<Prisma.$CellPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CellCountAggregateOutputType>
        : number
    >

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
    aggregate<T extends CellAggregateArgs>(args: Subset<T, CellAggregateArgs>): Prisma.PrismaPromise<GetCellAggregateType<T>>

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
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CellGroupByArgs['orderBy'] }
        : { orderBy?: CellGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CellGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCellGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
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
  export interface Prisma__CellClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    row<T extends RowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RowDefaultArgs<ExtArgs>>): Prisma__RowClient<$Result.GetResult<Prisma.$RowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    column<T extends ColumnDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ColumnDefaultArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cell model
   */
  interface CellFieldRefs {
    readonly id: FieldRef<"Cell", 'String'>
    readonly cellValue: FieldRef<"Cell", 'String'>
    readonly rowId: FieldRef<"Cell", 'String'>
    readonly columnId: FieldRef<"Cell", 'String'>
    readonly createdAt: FieldRef<"Cell", 'DateTime'>
    readonly updatedAt: FieldRef<"Cell", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cell findUnique
   */
  export type CellFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * Filter, which Cell to fetch.
     */
    where: CellWhereUniqueInput
  }

  /**
   * Cell findUniqueOrThrow
   */
  export type CellFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * Filter, which Cell to fetch.
     */
    where: CellWhereUniqueInput
  }

  /**
   * Cell findFirst
   */
  export type CellFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * Filter, which Cell to fetch.
     */
    where?: CellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cells to fetch.
     */
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cells.
     */
    cursor?: CellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cells.
     */
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[]
  }

  /**
   * Cell findFirstOrThrow
   */
  export type CellFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * Filter, which Cell to fetch.
     */
    where?: CellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cells to fetch.
     */
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cells.
     */
    cursor?: CellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cells.
     */
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[]
  }

  /**
   * Cell findMany
   */
  export type CellFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * Filter, which Cells to fetch.
     */
    where?: CellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cells to fetch.
     */
    orderBy?: CellOrderByWithRelationInput | CellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cells.
     */
    cursor?: CellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cells.
     */
    skip?: number
    distinct?: CellScalarFieldEnum | CellScalarFieldEnum[]
  }

  /**
   * Cell create
   */
  export type CellCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * The data needed to create a Cell.
     */
    data: XOR<CellCreateInput, CellUncheckedCreateInput>
  }

  /**
   * Cell createMany
   */
  export type CellCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cells.
     */
    data: CellCreateManyInput | CellCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cell createManyAndReturn
   */
  export type CellCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * The data used to create many Cells.
     */
    data: CellCreateManyInput | CellCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cell update
   */
  export type CellUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * The data needed to update a Cell.
     */
    data: XOR<CellUpdateInput, CellUncheckedUpdateInput>
    /**
     * Choose, which Cell to update.
     */
    where: CellWhereUniqueInput
  }

  /**
   * Cell updateMany
   */
  export type CellUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cells.
     */
    data: XOR<CellUpdateManyMutationInput, CellUncheckedUpdateManyInput>
    /**
     * Filter which Cells to update
     */
    where?: CellWhereInput
    /**
     * Limit how many Cells to update.
     */
    limit?: number
  }

  /**
   * Cell updateManyAndReturn
   */
  export type CellUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * The data used to update Cells.
     */
    data: XOR<CellUpdateManyMutationInput, CellUncheckedUpdateManyInput>
    /**
     * Filter which Cells to update
     */
    where?: CellWhereInput
    /**
     * Limit how many Cells to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cell upsert
   */
  export type CellUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * The filter to search for the Cell to update in case it exists.
     */
    where: CellWhereUniqueInput
    /**
     * In case the Cell found by the `where` argument doesn't exist, create a new Cell with this data.
     */
    create: XOR<CellCreateInput, CellUncheckedCreateInput>
    /**
     * In case the Cell was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CellUpdateInput, CellUncheckedUpdateInput>
  }

  /**
   * Cell delete
   */
  export type CellDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
    /**
     * Filter which Cell to delete.
     */
    where: CellWhereUniqueInput
  }

  /**
   * Cell deleteMany
   */
  export type CellDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cells to delete
     */
    where?: CellWhereInput
    /**
     * Limit how many Cells to delete.
     */
    limit?: number
  }

  /**
   * Cell without action
   */
  export type CellDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cell
     */
    select?: CellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cell
     */
    omit?: CellOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CellInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BaseScalarFieldEnum: {
    id: 'id',
    baseName: 'baseName',
    description: 'description',
    color: 'color',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type BaseScalarFieldEnum = (typeof BaseScalarFieldEnum)[keyof typeof BaseScalarFieldEnum]


  export const TableScalarFieldEnum: {
    id: 'id',
    tableName: 'tableName',
    displayOrder: 'displayOrder',
    baseId: 'baseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type TableScalarFieldEnum = (typeof TableScalarFieldEnum)[keyof typeof TableScalarFieldEnum]


  export const ViewScalarFieldEnum: {
    id: 'id',
    viewName: 'viewName',
    tableId: 'tableId',
    filters: 'filters',
    groupByColumnId: 'groupByColumnId',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ViewScalarFieldEnum = (typeof ViewScalarFieldEnum)[keyof typeof ViewScalarFieldEnum]


  export const ColumnScalarFieldEnum: {
    id: 'id',
    columnName: 'columnName',
    fieldType: 'fieldType',
    displayOrder: 'displayOrder',
    tableId: 'tableId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type ColumnScalarFieldEnum = (typeof ColumnScalarFieldEnum)[keyof typeof ColumnScalarFieldEnum]


  export const RowScalarFieldEnum: {
    id: 'id',
    displayOrder: 'displayOrder',
    tableId: 'tableId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type RowScalarFieldEnum = (typeof RowScalarFieldEnum)[keyof typeof RowScalarFieldEnum]


  export const CellScalarFieldEnum: {
    id: 'id',
    cellValue: 'cellValue',
    rowId: 'rowId',
    columnId: 'columnId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CellScalarFieldEnum = (typeof CellScalarFieldEnum)[keyof typeof CellScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'FieldType'
   */
  export type EnumFieldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldType'>
    


  /**
   * Reference to a field of type 'FieldType[]'
   */
  export type ListEnumFieldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdBases?: BaseListRelationFilter
    createdTables?: TableListRelationFilter
    createdColumns?: ColumnListRelationFilter
    createdRows?: RowListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBases?: BaseOrderByRelationAggregateInput
    createdTables?: TableOrderByRelationAggregateInput
    createdColumns?: ColumnOrderByRelationAggregateInput
    createdRows?: RowOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdBases?: BaseListRelationFilter
    createdTables?: TableListRelationFilter
    createdColumns?: ColumnListRelationFilter
    createdRows?: RowListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BaseWhereInput = {
    AND?: BaseWhereInput | BaseWhereInput[]
    OR?: BaseWhereInput[]
    NOT?: BaseWhereInput | BaseWhereInput[]
    id?: StringFilter<"Base"> | string
    baseName?: StringFilter<"Base"> | string
    description?: StringNullableFilter<"Base"> | string | null
    color?: StringFilter<"Base"> | string
    displayOrder?: IntFilter<"Base"> | number
    createdAt?: DateTimeFilter<"Base"> | Date | string
    updatedAt?: DateTimeFilter<"Base"> | Date | string
    createdById?: StringNullableFilter<"Base"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tables?: TableListRelationFilter
  }

  export type BaseOrderByWithRelationInput = {
    id?: SortOrder
    baseName?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    tables?: TableOrderByRelationAggregateInput
  }

  export type BaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BaseWhereInput | BaseWhereInput[]
    OR?: BaseWhereInput[]
    NOT?: BaseWhereInput | BaseWhereInput[]
    baseName?: StringFilter<"Base"> | string
    description?: StringNullableFilter<"Base"> | string | null
    color?: StringFilter<"Base"> | string
    displayOrder?: IntFilter<"Base"> | number
    createdAt?: DateTimeFilter<"Base"> | Date | string
    updatedAt?: DateTimeFilter<"Base"> | Date | string
    createdById?: StringNullableFilter<"Base"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tables?: TableListRelationFilter
  }, "id">

  export type BaseOrderByWithAggregationInput = {
    id?: SortOrder
    baseName?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: BaseCountOrderByAggregateInput
    _avg?: BaseAvgOrderByAggregateInput
    _max?: BaseMaxOrderByAggregateInput
    _min?: BaseMinOrderByAggregateInput
    _sum?: BaseSumOrderByAggregateInput
  }

  export type BaseScalarWhereWithAggregatesInput = {
    AND?: BaseScalarWhereWithAggregatesInput | BaseScalarWhereWithAggregatesInput[]
    OR?: BaseScalarWhereWithAggregatesInput[]
    NOT?: BaseScalarWhereWithAggregatesInput | BaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Base"> | string
    baseName?: StringWithAggregatesFilter<"Base"> | string
    description?: StringNullableWithAggregatesFilter<"Base"> | string | null
    color?: StringWithAggregatesFilter<"Base"> | string
    displayOrder?: IntWithAggregatesFilter<"Base"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Base"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Base"> | Date | string
    createdById?: StringNullableWithAggregatesFilter<"Base"> | string | null
  }

  export type TableWhereInput = {
    AND?: TableWhereInput | TableWhereInput[]
    OR?: TableWhereInput[]
    NOT?: TableWhereInput | TableWhereInput[]
    id?: StringFilter<"Table"> | string
    tableName?: StringFilter<"Table"> | string
    displayOrder?: IntFilter<"Table"> | number
    baseId?: StringFilter<"Table"> | string
    createdAt?: DateTimeFilter<"Table"> | Date | string
    updatedAt?: DateTimeFilter<"Table"> | Date | string
    createdById?: StringNullableFilter<"Table"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    base?: XOR<BaseScalarRelationFilter, BaseWhereInput>
    columns?: ColumnListRelationFilter
    rows?: RowListRelationFilter
    views?: ViewListRelationFilter
  }

  export type TableOrderByWithRelationInput = {
    id?: SortOrder
    tableName?: SortOrder
    displayOrder?: SortOrder
    baseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    base?: BaseOrderByWithRelationInput
    columns?: ColumnOrderByRelationAggregateInput
    rows?: RowOrderByRelationAggregateInput
    views?: ViewOrderByRelationAggregateInput
  }

  export type TableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    baseId_tableName?: TableBaseIdTableNameCompoundUniqueInput
    AND?: TableWhereInput | TableWhereInput[]
    OR?: TableWhereInput[]
    NOT?: TableWhereInput | TableWhereInput[]
    tableName?: StringFilter<"Table"> | string
    displayOrder?: IntFilter<"Table"> | number
    baseId?: StringFilter<"Table"> | string
    createdAt?: DateTimeFilter<"Table"> | Date | string
    updatedAt?: DateTimeFilter<"Table"> | Date | string
    createdById?: StringNullableFilter<"Table"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    base?: XOR<BaseScalarRelationFilter, BaseWhereInput>
    columns?: ColumnListRelationFilter
    rows?: RowListRelationFilter
    views?: ViewListRelationFilter
  }, "id" | "baseId_tableName">

  export type TableOrderByWithAggregationInput = {
    id?: SortOrder
    tableName?: SortOrder
    displayOrder?: SortOrder
    baseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: TableCountOrderByAggregateInput
    _avg?: TableAvgOrderByAggregateInput
    _max?: TableMaxOrderByAggregateInput
    _min?: TableMinOrderByAggregateInput
    _sum?: TableSumOrderByAggregateInput
  }

  export type TableScalarWhereWithAggregatesInput = {
    AND?: TableScalarWhereWithAggregatesInput | TableScalarWhereWithAggregatesInput[]
    OR?: TableScalarWhereWithAggregatesInput[]
    NOT?: TableScalarWhereWithAggregatesInput | TableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Table"> | string
    tableName?: StringWithAggregatesFilter<"Table"> | string
    displayOrder?: IntWithAggregatesFilter<"Table"> | number
    baseId?: StringWithAggregatesFilter<"Table"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Table"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Table"> | Date | string
    createdById?: StringNullableWithAggregatesFilter<"Table"> | string | null
  }

  export type ViewWhereInput = {
    AND?: ViewWhereInput | ViewWhereInput[]
    OR?: ViewWhereInput[]
    NOT?: ViewWhereInput | ViewWhereInput[]
    id?: StringFilter<"View"> | string
    viewName?: StringFilter<"View"> | string
    tableId?: StringFilter<"View"> | string
    filters?: JsonFilter<"View">
    groupByColumnId?: StringNullableFilter<"View"> | string | null
    displayOrder?: IntFilter<"View"> | number
    createdAt?: DateTimeFilter<"View"> | Date | string
    updatedAt?: DateTimeFilter<"View"> | Date | string
    table?: XOR<TableScalarRelationFilter, TableWhereInput>
  }

  export type ViewOrderByWithRelationInput = {
    id?: SortOrder
    viewName?: SortOrder
    tableId?: SortOrder
    filters?: SortOrder
    groupByColumnId?: SortOrderInput | SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    table?: TableOrderByWithRelationInput
  }

  export type ViewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tableId_viewName?: ViewTableIdViewNameCompoundUniqueInput
    AND?: ViewWhereInput | ViewWhereInput[]
    OR?: ViewWhereInput[]
    NOT?: ViewWhereInput | ViewWhereInput[]
    viewName?: StringFilter<"View"> | string
    tableId?: StringFilter<"View"> | string
    filters?: JsonFilter<"View">
    groupByColumnId?: StringNullableFilter<"View"> | string | null
    displayOrder?: IntFilter<"View"> | number
    createdAt?: DateTimeFilter<"View"> | Date | string
    updatedAt?: DateTimeFilter<"View"> | Date | string
    table?: XOR<TableScalarRelationFilter, TableWhereInput>
  }, "id" | "tableId_viewName">

  export type ViewOrderByWithAggregationInput = {
    id?: SortOrder
    viewName?: SortOrder
    tableId?: SortOrder
    filters?: SortOrder
    groupByColumnId?: SortOrderInput | SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ViewCountOrderByAggregateInput
    _avg?: ViewAvgOrderByAggregateInput
    _max?: ViewMaxOrderByAggregateInput
    _min?: ViewMinOrderByAggregateInput
    _sum?: ViewSumOrderByAggregateInput
  }

  export type ViewScalarWhereWithAggregatesInput = {
    AND?: ViewScalarWhereWithAggregatesInput | ViewScalarWhereWithAggregatesInput[]
    OR?: ViewScalarWhereWithAggregatesInput[]
    NOT?: ViewScalarWhereWithAggregatesInput | ViewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"View"> | string
    viewName?: StringWithAggregatesFilter<"View"> | string
    tableId?: StringWithAggregatesFilter<"View"> | string
    filters?: JsonWithAggregatesFilter<"View">
    groupByColumnId?: StringNullableWithAggregatesFilter<"View"> | string | null
    displayOrder?: IntWithAggregatesFilter<"View"> | number
    createdAt?: DateTimeWithAggregatesFilter<"View"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"View"> | Date | string
  }

  export type ColumnWhereInput = {
    AND?: ColumnWhereInput | ColumnWhereInput[]
    OR?: ColumnWhereInput[]
    NOT?: ColumnWhereInput | ColumnWhereInput[]
    id?: StringFilter<"Column"> | string
    columnName?: StringFilter<"Column"> | string
    fieldType?: EnumFieldTypeFilter<"Column"> | $Enums.FieldType
    displayOrder?: IntFilter<"Column"> | number
    tableId?: StringFilter<"Column"> | string
    createdAt?: DateTimeFilter<"Column"> | Date | string
    updatedAt?: DateTimeFilter<"Column"> | Date | string
    createdById?: StringNullableFilter<"Column"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    table?: XOR<TableScalarRelationFilter, TableWhereInput>
    cells?: CellListRelationFilter
  }

  export type ColumnOrderByWithRelationInput = {
    id?: SortOrder
    columnName?: SortOrder
    fieldType?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    table?: TableOrderByWithRelationInput
    cells?: CellOrderByRelationAggregateInput
  }

  export type ColumnWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tableId_columnName?: ColumnTableIdColumnNameCompoundUniqueInput
    AND?: ColumnWhereInput | ColumnWhereInput[]
    OR?: ColumnWhereInput[]
    NOT?: ColumnWhereInput | ColumnWhereInput[]
    columnName?: StringFilter<"Column"> | string
    fieldType?: EnumFieldTypeFilter<"Column"> | $Enums.FieldType
    displayOrder?: IntFilter<"Column"> | number
    tableId?: StringFilter<"Column"> | string
    createdAt?: DateTimeFilter<"Column"> | Date | string
    updatedAt?: DateTimeFilter<"Column"> | Date | string
    createdById?: StringNullableFilter<"Column"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    table?: XOR<TableScalarRelationFilter, TableWhereInput>
    cells?: CellListRelationFilter
  }, "id" | "tableId_columnName">

  export type ColumnOrderByWithAggregationInput = {
    id?: SortOrder
    columnName?: SortOrder
    fieldType?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: ColumnCountOrderByAggregateInput
    _avg?: ColumnAvgOrderByAggregateInput
    _max?: ColumnMaxOrderByAggregateInput
    _min?: ColumnMinOrderByAggregateInput
    _sum?: ColumnSumOrderByAggregateInput
  }

  export type ColumnScalarWhereWithAggregatesInput = {
    AND?: ColumnScalarWhereWithAggregatesInput | ColumnScalarWhereWithAggregatesInput[]
    OR?: ColumnScalarWhereWithAggregatesInput[]
    NOT?: ColumnScalarWhereWithAggregatesInput | ColumnScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Column"> | string
    columnName?: StringWithAggregatesFilter<"Column"> | string
    fieldType?: EnumFieldTypeWithAggregatesFilter<"Column"> | $Enums.FieldType
    displayOrder?: IntWithAggregatesFilter<"Column"> | number
    tableId?: StringWithAggregatesFilter<"Column"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Column"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Column"> | Date | string
    createdById?: StringNullableWithAggregatesFilter<"Column"> | string | null
  }

  export type RowWhereInput = {
    AND?: RowWhereInput | RowWhereInput[]
    OR?: RowWhereInput[]
    NOT?: RowWhereInput | RowWhereInput[]
    id?: StringFilter<"Row"> | string
    displayOrder?: IntFilter<"Row"> | number
    tableId?: StringFilter<"Row"> | string
    createdAt?: DateTimeFilter<"Row"> | Date | string
    updatedAt?: DateTimeFilter<"Row"> | Date | string
    createdById?: StringNullableFilter<"Row"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    table?: XOR<TableScalarRelationFilter, TableWhereInput>
    cells?: CellListRelationFilter
  }

  export type RowOrderByWithRelationInput = {
    id?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    table?: TableOrderByWithRelationInput
    cells?: CellOrderByRelationAggregateInput
  }

  export type RowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RowWhereInput | RowWhereInput[]
    OR?: RowWhereInput[]
    NOT?: RowWhereInput | RowWhereInput[]
    displayOrder?: IntFilter<"Row"> | number
    tableId?: StringFilter<"Row"> | string
    createdAt?: DateTimeFilter<"Row"> | Date | string
    updatedAt?: DateTimeFilter<"Row"> | Date | string
    createdById?: StringNullableFilter<"Row"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    table?: XOR<TableScalarRelationFilter, TableWhereInput>
    cells?: CellListRelationFilter
  }, "id">

  export type RowOrderByWithAggregationInput = {
    id?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: RowCountOrderByAggregateInput
    _avg?: RowAvgOrderByAggregateInput
    _max?: RowMaxOrderByAggregateInput
    _min?: RowMinOrderByAggregateInput
    _sum?: RowSumOrderByAggregateInput
  }

  export type RowScalarWhereWithAggregatesInput = {
    AND?: RowScalarWhereWithAggregatesInput | RowScalarWhereWithAggregatesInput[]
    OR?: RowScalarWhereWithAggregatesInput[]
    NOT?: RowScalarWhereWithAggregatesInput | RowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Row"> | string
    displayOrder?: IntWithAggregatesFilter<"Row"> | number
    tableId?: StringWithAggregatesFilter<"Row"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Row"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Row"> | Date | string
    createdById?: StringNullableWithAggregatesFilter<"Row"> | string | null
  }

  export type CellWhereInput = {
    AND?: CellWhereInput | CellWhereInput[]
    OR?: CellWhereInput[]
    NOT?: CellWhereInput | CellWhereInput[]
    id?: StringFilter<"Cell"> | string
    cellValue?: StringNullableFilter<"Cell"> | string | null
    rowId?: StringFilter<"Cell"> | string
    columnId?: StringFilter<"Cell"> | string
    createdAt?: DateTimeFilter<"Cell"> | Date | string
    updatedAt?: DateTimeFilter<"Cell"> | Date | string
    row?: XOR<RowScalarRelationFilter, RowWhereInput>
    column?: XOR<ColumnScalarRelationFilter, ColumnWhereInput>
  }

  export type CellOrderByWithRelationInput = {
    id?: SortOrder
    cellValue?: SortOrderInput | SortOrder
    rowId?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    row?: RowOrderByWithRelationInput
    column?: ColumnOrderByWithRelationInput
  }

  export type CellWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rowId_columnId?: CellRowIdColumnIdCompoundUniqueInput
    AND?: CellWhereInput | CellWhereInput[]
    OR?: CellWhereInput[]
    NOT?: CellWhereInput | CellWhereInput[]
    cellValue?: StringNullableFilter<"Cell"> | string | null
    rowId?: StringFilter<"Cell"> | string
    columnId?: StringFilter<"Cell"> | string
    createdAt?: DateTimeFilter<"Cell"> | Date | string
    updatedAt?: DateTimeFilter<"Cell"> | Date | string
    row?: XOR<RowScalarRelationFilter, RowWhereInput>
    column?: XOR<ColumnScalarRelationFilter, ColumnWhereInput>
  }, "id" | "rowId_columnId">

  export type CellOrderByWithAggregationInput = {
    id?: SortOrder
    cellValue?: SortOrderInput | SortOrder
    rowId?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CellCountOrderByAggregateInput
    _max?: CellMaxOrderByAggregateInput
    _min?: CellMinOrderByAggregateInput
  }

  export type CellScalarWhereWithAggregatesInput = {
    AND?: CellScalarWhereWithAggregatesInput | CellScalarWhereWithAggregatesInput[]
    OR?: CellScalarWhereWithAggregatesInput[]
    NOT?: CellScalarWhereWithAggregatesInput | CellScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cell"> | string
    cellValue?: StringNullableWithAggregatesFilter<"Cell"> | string | null
    rowId?: StringWithAggregatesFilter<"Cell"> | string
    columnId?: StringWithAggregatesFilter<"Cell"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Cell"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cell"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBases?: BaseCreateNestedManyWithoutCreatedByInput
    createdTables?: TableCreateNestedManyWithoutCreatedByInput
    createdColumns?: ColumnCreateNestedManyWithoutCreatedByInput
    createdRows?: RowCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBases?: BaseUncheckedCreateNestedManyWithoutCreatedByInput
    createdTables?: TableUncheckedCreateNestedManyWithoutCreatedByInput
    createdColumns?: ColumnUncheckedCreateNestedManyWithoutCreatedByInput
    createdRows?: RowUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBases?: BaseUpdateManyWithoutCreatedByNestedInput
    createdTables?: TableUpdateManyWithoutCreatedByNestedInput
    createdColumns?: ColumnUpdateManyWithoutCreatedByNestedInput
    createdRows?: RowUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBases?: BaseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdTables?: TableUncheckedUpdateManyWithoutCreatedByNestedInput
    createdColumns?: ColumnUncheckedUpdateManyWithoutCreatedByNestedInput
    createdRows?: RowUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BaseCreateInput = {
    id?: string
    baseName: string
    description?: string | null
    color?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedBasesInput
    tables?: TableCreateNestedManyWithoutBaseInput
  }

  export type BaseUncheckedCreateInput = {
    id?: string
    baseName: string
    description?: string | null
    color?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    tables?: TableUncheckedCreateNestedManyWithoutBaseInput
  }

  export type BaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedBasesNestedInput
    tables?: TableUpdateManyWithoutBaseNestedInput
  }

  export type BaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    tables?: TableUncheckedUpdateManyWithoutBaseNestedInput
  }

  export type BaseCreateManyInput = {
    id?: string
    baseName: string
    description?: string | null
    color?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type BaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TableCreateInput = {
    id?: string
    tableName: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTablesInput
    base: BaseCreateNestedOneWithoutTablesInput
    columns?: ColumnCreateNestedManyWithoutTableInput
    rows?: RowCreateNestedManyWithoutTableInput
    views?: ViewCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateInput = {
    id?: string
    tableName: string
    displayOrder?: number
    baseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    columns?: ColumnUncheckedCreateNestedManyWithoutTableInput
    rows?: RowUncheckedCreateNestedManyWithoutTableInput
    views?: ViewUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTablesNestedInput
    base?: BaseUpdateOneRequiredWithoutTablesNestedInput
    columns?: ColumnUpdateManyWithoutTableNestedInput
    rows?: RowUpdateManyWithoutTableNestedInput
    views?: ViewUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    baseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    columns?: ColumnUncheckedUpdateManyWithoutTableNestedInput
    rows?: RowUncheckedUpdateManyWithoutTableNestedInput
    views?: ViewUncheckedUpdateManyWithoutTableNestedInput
  }

  export type TableCreateManyInput = {
    id?: string
    tableName: string
    displayOrder?: number
    baseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type TableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    baseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ViewCreateInput = {
    id?: string
    viewName: string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: string | null
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    table: TableCreateNestedOneWithoutViewsInput
  }

  export type ViewUncheckedCreateInput = {
    id?: string
    viewName: string
    tableId: string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: string | null
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewName?: StringFieldUpdateOperationsInput | string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: TableUpdateOneRequiredWithoutViewsNestedInput
  }

  export type ViewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewName?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViewCreateManyInput = {
    id?: string
    viewName: string
    tableId: string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: string | null
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewName?: StringFieldUpdateOperationsInput | string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewName?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColumnCreateInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedColumnsInput
    table: TableCreateNestedOneWithoutColumnsInput
    cells?: CellCreateNestedManyWithoutColumnInput
  }

  export type ColumnUncheckedCreateInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    cells?: CellUncheckedCreateNestedManyWithoutColumnInput
  }

  export type ColumnUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedColumnsNestedInput
    table?: TableUpdateOneRequiredWithoutColumnsNestedInput
    cells?: CellUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    cells?: CellUncheckedUpdateManyWithoutColumnNestedInput
  }

  export type ColumnCreateManyInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type ColumnUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColumnUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RowCreateInput = {
    id?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedRowsInput
    table: TableCreateNestedOneWithoutRowsInput
    cells?: CellCreateNestedManyWithoutRowInput
  }

  export type RowUncheckedCreateInput = {
    id?: string
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    cells?: CellUncheckedCreateNestedManyWithoutRowInput
  }

  export type RowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedRowsNestedInput
    table?: TableUpdateOneRequiredWithoutRowsNestedInput
    cells?: CellUpdateManyWithoutRowNestedInput
  }

  export type RowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    cells?: CellUncheckedUpdateManyWithoutRowNestedInput
  }

  export type RowCreateManyInput = {
    id?: string
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type RowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CellCreateInput = {
    id?: string
    cellValue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    row: RowCreateNestedOneWithoutCellsInput
    column: ColumnCreateNestedOneWithoutCellsInput
  }

  export type CellUncheckedCreateInput = {
    id?: string
    cellValue?: string | null
    rowId: string
    columnId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CellUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    row?: RowUpdateOneRequiredWithoutCellsNestedInput
    column?: ColumnUpdateOneRequiredWithoutCellsNestedInput
  }

  export type CellUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    rowId?: StringFieldUpdateOperationsInput | string
    columnId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CellCreateManyInput = {
    id?: string
    cellValue?: string | null
    rowId: string
    columnId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CellUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CellUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    rowId?: StringFieldUpdateOperationsInput | string
    columnId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BaseListRelationFilter = {
    every?: BaseWhereInput
    some?: BaseWhereInput
    none?: BaseWhereInput
  }

  export type TableListRelationFilter = {
    every?: TableWhereInput
    some?: TableWhereInput
    none?: TableWhereInput
  }

  export type ColumnListRelationFilter = {
    every?: ColumnWhereInput
    some?: ColumnWhereInput
    none?: ColumnWhereInput
  }

  export type RowListRelationFilter = {
    every?: RowWhereInput
    some?: RowWhereInput
    none?: RowWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ColumnOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type BaseCountOrderByAggregateInput = {
    id?: SortOrder
    baseName?: SortOrder
    description?: SortOrder
    color?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type BaseAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type BaseMaxOrderByAggregateInput = {
    id?: SortOrder
    baseName?: SortOrder
    description?: SortOrder
    color?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type BaseMinOrderByAggregateInput = {
    id?: SortOrder
    baseName?: SortOrder
    description?: SortOrder
    color?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type BaseSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BaseScalarRelationFilter = {
    is?: BaseWhereInput
    isNot?: BaseWhereInput
  }

  export type ViewListRelationFilter = {
    every?: ViewWhereInput
    some?: ViewWhereInput
    none?: ViewWhereInput
  }

  export type ViewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TableBaseIdTableNameCompoundUniqueInput = {
    baseId: string
    tableName: string
  }

  export type TableCountOrderByAggregateInput = {
    id?: SortOrder
    tableName?: SortOrder
    displayOrder?: SortOrder
    baseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type TableAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type TableMaxOrderByAggregateInput = {
    id?: SortOrder
    tableName?: SortOrder
    displayOrder?: SortOrder
    baseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type TableMinOrderByAggregateInput = {
    id?: SortOrder
    tableName?: SortOrder
    displayOrder?: SortOrder
    baseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type TableSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TableScalarRelationFilter = {
    is?: TableWhereInput
    isNot?: TableWhereInput
  }

  export type ViewTableIdViewNameCompoundUniqueInput = {
    tableId: string
    viewName: string
  }

  export type ViewCountOrderByAggregateInput = {
    id?: SortOrder
    viewName?: SortOrder
    tableId?: SortOrder
    filters?: SortOrder
    groupByColumnId?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViewAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ViewMaxOrderByAggregateInput = {
    id?: SortOrder
    viewName?: SortOrder
    tableId?: SortOrder
    groupByColumnId?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViewMinOrderByAggregateInput = {
    id?: SortOrder
    viewName?: SortOrder
    tableId?: SortOrder
    groupByColumnId?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ViewSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumFieldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldType[] | ListEnumFieldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FieldType[] | ListEnumFieldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFieldTypeFilter<$PrismaModel> | $Enums.FieldType
  }

  export type CellListRelationFilter = {
    every?: CellWhereInput
    some?: CellWhereInput
    none?: CellWhereInput
  }

  export type CellOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ColumnTableIdColumnNameCompoundUniqueInput = {
    tableId: string
    columnName: string
  }

  export type ColumnCountOrderByAggregateInput = {
    id?: SortOrder
    columnName?: SortOrder
    fieldType?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type ColumnAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ColumnMaxOrderByAggregateInput = {
    id?: SortOrder
    columnName?: SortOrder
    fieldType?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type ColumnMinOrderByAggregateInput = {
    id?: SortOrder
    columnName?: SortOrder
    fieldType?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type ColumnSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type EnumFieldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldType[] | ListEnumFieldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FieldType[] | ListEnumFieldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel> | $Enums.FieldType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFieldTypeFilter<$PrismaModel>
    _max?: NestedEnumFieldTypeFilter<$PrismaModel>
  }

  export type RowCountOrderByAggregateInput = {
    id?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type RowAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type RowMaxOrderByAggregateInput = {
    id?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type RowMinOrderByAggregateInput = {
    id?: SortOrder
    displayOrder?: SortOrder
    tableId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type RowSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type RowScalarRelationFilter = {
    is?: RowWhereInput
    isNot?: RowWhereInput
  }

  export type ColumnScalarRelationFilter = {
    is?: ColumnWhereInput
    isNot?: ColumnWhereInput
  }

  export type CellRowIdColumnIdCompoundUniqueInput = {
    rowId: string
    columnId: string
  }

  export type CellCountOrderByAggregateInput = {
    id?: SortOrder
    cellValue?: SortOrder
    rowId?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CellMaxOrderByAggregateInput = {
    id?: SortOrder
    cellValue?: SortOrder
    rowId?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CellMinOrderByAggregateInput = {
    id?: SortOrder
    cellValue?: SortOrder
    rowId?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BaseCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BaseCreateWithoutCreatedByInput, BaseUncheckedCreateWithoutCreatedByInput> | BaseCreateWithoutCreatedByInput[] | BaseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BaseCreateOrConnectWithoutCreatedByInput | BaseCreateOrConnectWithoutCreatedByInput[]
    createMany?: BaseCreateManyCreatedByInputEnvelope
    connect?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
  }

  export type TableCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TableCreateWithoutCreatedByInput, TableUncheckedCreateWithoutCreatedByInput> | TableCreateWithoutCreatedByInput[] | TableUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TableCreateOrConnectWithoutCreatedByInput | TableCreateOrConnectWithoutCreatedByInput[]
    createMany?: TableCreateManyCreatedByInputEnvelope
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
  }

  export type ColumnCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ColumnCreateWithoutCreatedByInput, ColumnUncheckedCreateWithoutCreatedByInput> | ColumnCreateWithoutCreatedByInput[] | ColumnUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutCreatedByInput | ColumnCreateOrConnectWithoutCreatedByInput[]
    createMany?: ColumnCreateManyCreatedByInputEnvelope
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
  }

  export type RowCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<RowCreateWithoutCreatedByInput, RowUncheckedCreateWithoutCreatedByInput> | RowCreateWithoutCreatedByInput[] | RowUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: RowCreateOrConnectWithoutCreatedByInput | RowCreateOrConnectWithoutCreatedByInput[]
    createMany?: RowCreateManyCreatedByInputEnvelope
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[]
  }

  export type BaseUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BaseCreateWithoutCreatedByInput, BaseUncheckedCreateWithoutCreatedByInput> | BaseCreateWithoutCreatedByInput[] | BaseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BaseCreateOrConnectWithoutCreatedByInput | BaseCreateOrConnectWithoutCreatedByInput[]
    createMany?: BaseCreateManyCreatedByInputEnvelope
    connect?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
  }

  export type TableUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TableCreateWithoutCreatedByInput, TableUncheckedCreateWithoutCreatedByInput> | TableCreateWithoutCreatedByInput[] | TableUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TableCreateOrConnectWithoutCreatedByInput | TableCreateOrConnectWithoutCreatedByInput[]
    createMany?: TableCreateManyCreatedByInputEnvelope
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
  }

  export type ColumnUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ColumnCreateWithoutCreatedByInput, ColumnUncheckedCreateWithoutCreatedByInput> | ColumnCreateWithoutCreatedByInput[] | ColumnUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutCreatedByInput | ColumnCreateOrConnectWithoutCreatedByInput[]
    createMany?: ColumnCreateManyCreatedByInputEnvelope
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
  }

  export type RowUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<RowCreateWithoutCreatedByInput, RowUncheckedCreateWithoutCreatedByInput> | RowCreateWithoutCreatedByInput[] | RowUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: RowCreateOrConnectWithoutCreatedByInput | RowCreateOrConnectWithoutCreatedByInput[]
    createMany?: RowCreateManyCreatedByInputEnvelope
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BaseUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BaseCreateWithoutCreatedByInput, BaseUncheckedCreateWithoutCreatedByInput> | BaseCreateWithoutCreatedByInput[] | BaseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BaseCreateOrConnectWithoutCreatedByInput | BaseCreateOrConnectWithoutCreatedByInput[]
    upsert?: BaseUpsertWithWhereUniqueWithoutCreatedByInput | BaseUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BaseCreateManyCreatedByInputEnvelope
    set?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
    disconnect?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
    delete?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
    connect?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
    update?: BaseUpdateWithWhereUniqueWithoutCreatedByInput | BaseUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BaseUpdateManyWithWhereWithoutCreatedByInput | BaseUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BaseScalarWhereInput | BaseScalarWhereInput[]
  }

  export type TableUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TableCreateWithoutCreatedByInput, TableUncheckedCreateWithoutCreatedByInput> | TableCreateWithoutCreatedByInput[] | TableUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TableCreateOrConnectWithoutCreatedByInput | TableCreateOrConnectWithoutCreatedByInput[]
    upsert?: TableUpsertWithWhereUniqueWithoutCreatedByInput | TableUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TableCreateManyCreatedByInputEnvelope
    set?: TableWhereUniqueInput | TableWhereUniqueInput[]
    disconnect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    delete?: TableWhereUniqueInput | TableWhereUniqueInput[]
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    update?: TableUpdateWithWhereUniqueWithoutCreatedByInput | TableUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TableUpdateManyWithWhereWithoutCreatedByInput | TableUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TableScalarWhereInput | TableScalarWhereInput[]
  }

  export type ColumnUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ColumnCreateWithoutCreatedByInput, ColumnUncheckedCreateWithoutCreatedByInput> | ColumnCreateWithoutCreatedByInput[] | ColumnUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutCreatedByInput | ColumnCreateOrConnectWithoutCreatedByInput[]
    upsert?: ColumnUpsertWithWhereUniqueWithoutCreatedByInput | ColumnUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ColumnCreateManyCreatedByInputEnvelope
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    update?: ColumnUpdateWithWhereUniqueWithoutCreatedByInput | ColumnUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ColumnUpdateManyWithWhereWithoutCreatedByInput | ColumnUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
  }

  export type RowUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<RowCreateWithoutCreatedByInput, RowUncheckedCreateWithoutCreatedByInput> | RowCreateWithoutCreatedByInput[] | RowUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: RowCreateOrConnectWithoutCreatedByInput | RowCreateOrConnectWithoutCreatedByInput[]
    upsert?: RowUpsertWithWhereUniqueWithoutCreatedByInput | RowUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: RowCreateManyCreatedByInputEnvelope
    set?: RowWhereUniqueInput | RowWhereUniqueInput[]
    disconnect?: RowWhereUniqueInput | RowWhereUniqueInput[]
    delete?: RowWhereUniqueInput | RowWhereUniqueInput[]
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[]
    update?: RowUpdateWithWhereUniqueWithoutCreatedByInput | RowUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: RowUpdateManyWithWhereWithoutCreatedByInput | RowUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: RowScalarWhereInput | RowScalarWhereInput[]
  }

  export type BaseUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BaseCreateWithoutCreatedByInput, BaseUncheckedCreateWithoutCreatedByInput> | BaseCreateWithoutCreatedByInput[] | BaseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BaseCreateOrConnectWithoutCreatedByInput | BaseCreateOrConnectWithoutCreatedByInput[]
    upsert?: BaseUpsertWithWhereUniqueWithoutCreatedByInput | BaseUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BaseCreateManyCreatedByInputEnvelope
    set?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
    disconnect?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
    delete?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
    connect?: BaseWhereUniqueInput | BaseWhereUniqueInput[]
    update?: BaseUpdateWithWhereUniqueWithoutCreatedByInput | BaseUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BaseUpdateManyWithWhereWithoutCreatedByInput | BaseUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BaseScalarWhereInput | BaseScalarWhereInput[]
  }

  export type TableUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TableCreateWithoutCreatedByInput, TableUncheckedCreateWithoutCreatedByInput> | TableCreateWithoutCreatedByInput[] | TableUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TableCreateOrConnectWithoutCreatedByInput | TableCreateOrConnectWithoutCreatedByInput[]
    upsert?: TableUpsertWithWhereUniqueWithoutCreatedByInput | TableUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TableCreateManyCreatedByInputEnvelope
    set?: TableWhereUniqueInput | TableWhereUniqueInput[]
    disconnect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    delete?: TableWhereUniqueInput | TableWhereUniqueInput[]
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    update?: TableUpdateWithWhereUniqueWithoutCreatedByInput | TableUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TableUpdateManyWithWhereWithoutCreatedByInput | TableUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TableScalarWhereInput | TableScalarWhereInput[]
  }

  export type ColumnUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ColumnCreateWithoutCreatedByInput, ColumnUncheckedCreateWithoutCreatedByInput> | ColumnCreateWithoutCreatedByInput[] | ColumnUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutCreatedByInput | ColumnCreateOrConnectWithoutCreatedByInput[]
    upsert?: ColumnUpsertWithWhereUniqueWithoutCreatedByInput | ColumnUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ColumnCreateManyCreatedByInputEnvelope
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    update?: ColumnUpdateWithWhereUniqueWithoutCreatedByInput | ColumnUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ColumnUpdateManyWithWhereWithoutCreatedByInput | ColumnUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
  }

  export type RowUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<RowCreateWithoutCreatedByInput, RowUncheckedCreateWithoutCreatedByInput> | RowCreateWithoutCreatedByInput[] | RowUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: RowCreateOrConnectWithoutCreatedByInput | RowCreateOrConnectWithoutCreatedByInput[]
    upsert?: RowUpsertWithWhereUniqueWithoutCreatedByInput | RowUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: RowCreateManyCreatedByInputEnvelope
    set?: RowWhereUniqueInput | RowWhereUniqueInput[]
    disconnect?: RowWhereUniqueInput | RowWhereUniqueInput[]
    delete?: RowWhereUniqueInput | RowWhereUniqueInput[]
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[]
    update?: RowUpdateWithWhereUniqueWithoutCreatedByInput | RowUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: RowUpdateManyWithWhereWithoutCreatedByInput | RowUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: RowScalarWhereInput | RowScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedBasesInput = {
    create?: XOR<UserCreateWithoutCreatedBasesInput, UserUncheckedCreateWithoutCreatedBasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedBasesInput
    connect?: UserWhereUniqueInput
  }

  export type TableCreateNestedManyWithoutBaseInput = {
    create?: XOR<TableCreateWithoutBaseInput, TableUncheckedCreateWithoutBaseInput> | TableCreateWithoutBaseInput[] | TableUncheckedCreateWithoutBaseInput[]
    connectOrCreate?: TableCreateOrConnectWithoutBaseInput | TableCreateOrConnectWithoutBaseInput[]
    createMany?: TableCreateManyBaseInputEnvelope
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
  }

  export type TableUncheckedCreateNestedManyWithoutBaseInput = {
    create?: XOR<TableCreateWithoutBaseInput, TableUncheckedCreateWithoutBaseInput> | TableCreateWithoutBaseInput[] | TableUncheckedCreateWithoutBaseInput[]
    connectOrCreate?: TableCreateOrConnectWithoutBaseInput | TableCreateOrConnectWithoutBaseInput[]
    createMany?: TableCreateManyBaseInputEnvelope
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutCreatedBasesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedBasesInput, UserUncheckedCreateWithoutCreatedBasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedBasesInput
    upsert?: UserUpsertWithoutCreatedBasesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedBasesInput, UserUpdateWithoutCreatedBasesInput>, UserUncheckedUpdateWithoutCreatedBasesInput>
  }

  export type TableUpdateManyWithoutBaseNestedInput = {
    create?: XOR<TableCreateWithoutBaseInput, TableUncheckedCreateWithoutBaseInput> | TableCreateWithoutBaseInput[] | TableUncheckedCreateWithoutBaseInput[]
    connectOrCreate?: TableCreateOrConnectWithoutBaseInput | TableCreateOrConnectWithoutBaseInput[]
    upsert?: TableUpsertWithWhereUniqueWithoutBaseInput | TableUpsertWithWhereUniqueWithoutBaseInput[]
    createMany?: TableCreateManyBaseInputEnvelope
    set?: TableWhereUniqueInput | TableWhereUniqueInput[]
    disconnect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    delete?: TableWhereUniqueInput | TableWhereUniqueInput[]
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    update?: TableUpdateWithWhereUniqueWithoutBaseInput | TableUpdateWithWhereUniqueWithoutBaseInput[]
    updateMany?: TableUpdateManyWithWhereWithoutBaseInput | TableUpdateManyWithWhereWithoutBaseInput[]
    deleteMany?: TableScalarWhereInput | TableScalarWhereInput[]
  }

  export type TableUncheckedUpdateManyWithoutBaseNestedInput = {
    create?: XOR<TableCreateWithoutBaseInput, TableUncheckedCreateWithoutBaseInput> | TableCreateWithoutBaseInput[] | TableUncheckedCreateWithoutBaseInput[]
    connectOrCreate?: TableCreateOrConnectWithoutBaseInput | TableCreateOrConnectWithoutBaseInput[]
    upsert?: TableUpsertWithWhereUniqueWithoutBaseInput | TableUpsertWithWhereUniqueWithoutBaseInput[]
    createMany?: TableCreateManyBaseInputEnvelope
    set?: TableWhereUniqueInput | TableWhereUniqueInput[]
    disconnect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    delete?: TableWhereUniqueInput | TableWhereUniqueInput[]
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    update?: TableUpdateWithWhereUniqueWithoutBaseInput | TableUpdateWithWhereUniqueWithoutBaseInput[]
    updateMany?: TableUpdateManyWithWhereWithoutBaseInput | TableUpdateManyWithWhereWithoutBaseInput[]
    deleteMany?: TableScalarWhereInput | TableScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedTablesInput = {
    create?: XOR<UserCreateWithoutCreatedTablesInput, UserUncheckedCreateWithoutCreatedTablesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTablesInput
    connect?: UserWhereUniqueInput
  }

  export type BaseCreateNestedOneWithoutTablesInput = {
    create?: XOR<BaseCreateWithoutTablesInput, BaseUncheckedCreateWithoutTablesInput>
    connectOrCreate?: BaseCreateOrConnectWithoutTablesInput
    connect?: BaseWhereUniqueInput
  }

  export type ColumnCreateNestedManyWithoutTableInput = {
    create?: XOR<ColumnCreateWithoutTableInput, ColumnUncheckedCreateWithoutTableInput> | ColumnCreateWithoutTableInput[] | ColumnUncheckedCreateWithoutTableInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutTableInput | ColumnCreateOrConnectWithoutTableInput[]
    createMany?: ColumnCreateManyTableInputEnvelope
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
  }

  export type RowCreateNestedManyWithoutTableInput = {
    create?: XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput> | RowCreateWithoutTableInput[] | RowUncheckedCreateWithoutTableInput[]
    connectOrCreate?: RowCreateOrConnectWithoutTableInput | RowCreateOrConnectWithoutTableInput[]
    createMany?: RowCreateManyTableInputEnvelope
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[]
  }

  export type ViewCreateNestedManyWithoutTableInput = {
    create?: XOR<ViewCreateWithoutTableInput, ViewUncheckedCreateWithoutTableInput> | ViewCreateWithoutTableInput[] | ViewUncheckedCreateWithoutTableInput[]
    connectOrCreate?: ViewCreateOrConnectWithoutTableInput | ViewCreateOrConnectWithoutTableInput[]
    createMany?: ViewCreateManyTableInputEnvelope
    connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
  }

  export type ColumnUncheckedCreateNestedManyWithoutTableInput = {
    create?: XOR<ColumnCreateWithoutTableInput, ColumnUncheckedCreateWithoutTableInput> | ColumnCreateWithoutTableInput[] | ColumnUncheckedCreateWithoutTableInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutTableInput | ColumnCreateOrConnectWithoutTableInput[]
    createMany?: ColumnCreateManyTableInputEnvelope
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
  }

  export type RowUncheckedCreateNestedManyWithoutTableInput = {
    create?: XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput> | RowCreateWithoutTableInput[] | RowUncheckedCreateWithoutTableInput[]
    connectOrCreate?: RowCreateOrConnectWithoutTableInput | RowCreateOrConnectWithoutTableInput[]
    createMany?: RowCreateManyTableInputEnvelope
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[]
  }

  export type ViewUncheckedCreateNestedManyWithoutTableInput = {
    create?: XOR<ViewCreateWithoutTableInput, ViewUncheckedCreateWithoutTableInput> | ViewCreateWithoutTableInput[] | ViewUncheckedCreateWithoutTableInput[]
    connectOrCreate?: ViewCreateOrConnectWithoutTableInput | ViewCreateOrConnectWithoutTableInput[]
    createMany?: ViewCreateManyTableInputEnvelope
    connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutCreatedTablesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTablesInput, UserUncheckedCreateWithoutCreatedTablesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTablesInput
    upsert?: UserUpsertWithoutCreatedTablesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTablesInput, UserUpdateWithoutCreatedTablesInput>, UserUncheckedUpdateWithoutCreatedTablesInput>
  }

  export type BaseUpdateOneRequiredWithoutTablesNestedInput = {
    create?: XOR<BaseCreateWithoutTablesInput, BaseUncheckedCreateWithoutTablesInput>
    connectOrCreate?: BaseCreateOrConnectWithoutTablesInput
    upsert?: BaseUpsertWithoutTablesInput
    connect?: BaseWhereUniqueInput
    update?: XOR<XOR<BaseUpdateToOneWithWhereWithoutTablesInput, BaseUpdateWithoutTablesInput>, BaseUncheckedUpdateWithoutTablesInput>
  }

  export type ColumnUpdateManyWithoutTableNestedInput = {
    create?: XOR<ColumnCreateWithoutTableInput, ColumnUncheckedCreateWithoutTableInput> | ColumnCreateWithoutTableInput[] | ColumnUncheckedCreateWithoutTableInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutTableInput | ColumnCreateOrConnectWithoutTableInput[]
    upsert?: ColumnUpsertWithWhereUniqueWithoutTableInput | ColumnUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: ColumnCreateManyTableInputEnvelope
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    update?: ColumnUpdateWithWhereUniqueWithoutTableInput | ColumnUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: ColumnUpdateManyWithWhereWithoutTableInput | ColumnUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
  }

  export type RowUpdateManyWithoutTableNestedInput = {
    create?: XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput> | RowCreateWithoutTableInput[] | RowUncheckedCreateWithoutTableInput[]
    connectOrCreate?: RowCreateOrConnectWithoutTableInput | RowCreateOrConnectWithoutTableInput[]
    upsert?: RowUpsertWithWhereUniqueWithoutTableInput | RowUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: RowCreateManyTableInputEnvelope
    set?: RowWhereUniqueInput | RowWhereUniqueInput[]
    disconnect?: RowWhereUniqueInput | RowWhereUniqueInput[]
    delete?: RowWhereUniqueInput | RowWhereUniqueInput[]
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[]
    update?: RowUpdateWithWhereUniqueWithoutTableInput | RowUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: RowUpdateManyWithWhereWithoutTableInput | RowUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: RowScalarWhereInput | RowScalarWhereInput[]
  }

  export type ViewUpdateManyWithoutTableNestedInput = {
    create?: XOR<ViewCreateWithoutTableInput, ViewUncheckedCreateWithoutTableInput> | ViewCreateWithoutTableInput[] | ViewUncheckedCreateWithoutTableInput[]
    connectOrCreate?: ViewCreateOrConnectWithoutTableInput | ViewCreateOrConnectWithoutTableInput[]
    upsert?: ViewUpsertWithWhereUniqueWithoutTableInput | ViewUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: ViewCreateManyTableInputEnvelope
    set?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
    disconnect?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
    delete?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
    connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
    update?: ViewUpdateWithWhereUniqueWithoutTableInput | ViewUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: ViewUpdateManyWithWhereWithoutTableInput | ViewUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: ViewScalarWhereInput | ViewScalarWhereInput[]
  }

  export type ColumnUncheckedUpdateManyWithoutTableNestedInput = {
    create?: XOR<ColumnCreateWithoutTableInput, ColumnUncheckedCreateWithoutTableInput> | ColumnCreateWithoutTableInput[] | ColumnUncheckedCreateWithoutTableInput[]
    connectOrCreate?: ColumnCreateOrConnectWithoutTableInput | ColumnCreateOrConnectWithoutTableInput[]
    upsert?: ColumnUpsertWithWhereUniqueWithoutTableInput | ColumnUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: ColumnCreateManyTableInputEnvelope
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[]
    update?: ColumnUpdateWithWhereUniqueWithoutTableInput | ColumnUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: ColumnUpdateManyWithWhereWithoutTableInput | ColumnUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
  }

  export type RowUncheckedUpdateManyWithoutTableNestedInput = {
    create?: XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput> | RowCreateWithoutTableInput[] | RowUncheckedCreateWithoutTableInput[]
    connectOrCreate?: RowCreateOrConnectWithoutTableInput | RowCreateOrConnectWithoutTableInput[]
    upsert?: RowUpsertWithWhereUniqueWithoutTableInput | RowUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: RowCreateManyTableInputEnvelope
    set?: RowWhereUniqueInput | RowWhereUniqueInput[]
    disconnect?: RowWhereUniqueInput | RowWhereUniqueInput[]
    delete?: RowWhereUniqueInput | RowWhereUniqueInput[]
    connect?: RowWhereUniqueInput | RowWhereUniqueInput[]
    update?: RowUpdateWithWhereUniqueWithoutTableInput | RowUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: RowUpdateManyWithWhereWithoutTableInput | RowUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: RowScalarWhereInput | RowScalarWhereInput[]
  }

  export type ViewUncheckedUpdateManyWithoutTableNestedInput = {
    create?: XOR<ViewCreateWithoutTableInput, ViewUncheckedCreateWithoutTableInput> | ViewCreateWithoutTableInput[] | ViewUncheckedCreateWithoutTableInput[]
    connectOrCreate?: ViewCreateOrConnectWithoutTableInput | ViewCreateOrConnectWithoutTableInput[]
    upsert?: ViewUpsertWithWhereUniqueWithoutTableInput | ViewUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: ViewCreateManyTableInputEnvelope
    set?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
    disconnect?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
    delete?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
    connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[]
    update?: ViewUpdateWithWhereUniqueWithoutTableInput | ViewUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: ViewUpdateManyWithWhereWithoutTableInput | ViewUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: ViewScalarWhereInput | ViewScalarWhereInput[]
  }

  export type TableCreateNestedOneWithoutViewsInput = {
    create?: XOR<TableCreateWithoutViewsInput, TableUncheckedCreateWithoutViewsInput>
    connectOrCreate?: TableCreateOrConnectWithoutViewsInput
    connect?: TableWhereUniqueInput
  }

  export type TableUpdateOneRequiredWithoutViewsNestedInput = {
    create?: XOR<TableCreateWithoutViewsInput, TableUncheckedCreateWithoutViewsInput>
    connectOrCreate?: TableCreateOrConnectWithoutViewsInput
    upsert?: TableUpsertWithoutViewsInput
    connect?: TableWhereUniqueInput
    update?: XOR<XOR<TableUpdateToOneWithWhereWithoutViewsInput, TableUpdateWithoutViewsInput>, TableUncheckedUpdateWithoutViewsInput>
  }

  export type UserCreateNestedOneWithoutCreatedColumnsInput = {
    create?: XOR<UserCreateWithoutCreatedColumnsInput, UserUncheckedCreateWithoutCreatedColumnsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedColumnsInput
    connect?: UserWhereUniqueInput
  }

  export type TableCreateNestedOneWithoutColumnsInput = {
    create?: XOR<TableCreateWithoutColumnsInput, TableUncheckedCreateWithoutColumnsInput>
    connectOrCreate?: TableCreateOrConnectWithoutColumnsInput
    connect?: TableWhereUniqueInput
  }

  export type CellCreateNestedManyWithoutColumnInput = {
    create?: XOR<CellCreateWithoutColumnInput, CellUncheckedCreateWithoutColumnInput> | CellCreateWithoutColumnInput[] | CellUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: CellCreateOrConnectWithoutColumnInput | CellCreateOrConnectWithoutColumnInput[]
    createMany?: CellCreateManyColumnInputEnvelope
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[]
  }

  export type CellUncheckedCreateNestedManyWithoutColumnInput = {
    create?: XOR<CellCreateWithoutColumnInput, CellUncheckedCreateWithoutColumnInput> | CellCreateWithoutColumnInput[] | CellUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: CellCreateOrConnectWithoutColumnInput | CellCreateOrConnectWithoutColumnInput[]
    createMany?: CellCreateManyColumnInputEnvelope
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[]
  }

  export type EnumFieldTypeFieldUpdateOperationsInput = {
    set?: $Enums.FieldType
  }

  export type UserUpdateOneWithoutCreatedColumnsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedColumnsInput, UserUncheckedCreateWithoutCreatedColumnsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedColumnsInput
    upsert?: UserUpsertWithoutCreatedColumnsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedColumnsInput, UserUpdateWithoutCreatedColumnsInput>, UserUncheckedUpdateWithoutCreatedColumnsInput>
  }

  export type TableUpdateOneRequiredWithoutColumnsNestedInput = {
    create?: XOR<TableCreateWithoutColumnsInput, TableUncheckedCreateWithoutColumnsInput>
    connectOrCreate?: TableCreateOrConnectWithoutColumnsInput
    upsert?: TableUpsertWithoutColumnsInput
    connect?: TableWhereUniqueInput
    update?: XOR<XOR<TableUpdateToOneWithWhereWithoutColumnsInput, TableUpdateWithoutColumnsInput>, TableUncheckedUpdateWithoutColumnsInput>
  }

  export type CellUpdateManyWithoutColumnNestedInput = {
    create?: XOR<CellCreateWithoutColumnInput, CellUncheckedCreateWithoutColumnInput> | CellCreateWithoutColumnInput[] | CellUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: CellCreateOrConnectWithoutColumnInput | CellCreateOrConnectWithoutColumnInput[]
    upsert?: CellUpsertWithWhereUniqueWithoutColumnInput | CellUpsertWithWhereUniqueWithoutColumnInput[]
    createMany?: CellCreateManyColumnInputEnvelope
    set?: CellWhereUniqueInput | CellWhereUniqueInput[]
    disconnect?: CellWhereUniqueInput | CellWhereUniqueInput[]
    delete?: CellWhereUniqueInput | CellWhereUniqueInput[]
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[]
    update?: CellUpdateWithWhereUniqueWithoutColumnInput | CellUpdateWithWhereUniqueWithoutColumnInput[]
    updateMany?: CellUpdateManyWithWhereWithoutColumnInput | CellUpdateManyWithWhereWithoutColumnInput[]
    deleteMany?: CellScalarWhereInput | CellScalarWhereInput[]
  }

  export type CellUncheckedUpdateManyWithoutColumnNestedInput = {
    create?: XOR<CellCreateWithoutColumnInput, CellUncheckedCreateWithoutColumnInput> | CellCreateWithoutColumnInput[] | CellUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: CellCreateOrConnectWithoutColumnInput | CellCreateOrConnectWithoutColumnInput[]
    upsert?: CellUpsertWithWhereUniqueWithoutColumnInput | CellUpsertWithWhereUniqueWithoutColumnInput[]
    createMany?: CellCreateManyColumnInputEnvelope
    set?: CellWhereUniqueInput | CellWhereUniqueInput[]
    disconnect?: CellWhereUniqueInput | CellWhereUniqueInput[]
    delete?: CellWhereUniqueInput | CellWhereUniqueInput[]
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[]
    update?: CellUpdateWithWhereUniqueWithoutColumnInput | CellUpdateWithWhereUniqueWithoutColumnInput[]
    updateMany?: CellUpdateManyWithWhereWithoutColumnInput | CellUpdateManyWithWhereWithoutColumnInput[]
    deleteMany?: CellScalarWhereInput | CellScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedRowsInput = {
    create?: XOR<UserCreateWithoutCreatedRowsInput, UserUncheckedCreateWithoutCreatedRowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedRowsInput
    connect?: UserWhereUniqueInput
  }

  export type TableCreateNestedOneWithoutRowsInput = {
    create?: XOR<TableCreateWithoutRowsInput, TableUncheckedCreateWithoutRowsInput>
    connectOrCreate?: TableCreateOrConnectWithoutRowsInput
    connect?: TableWhereUniqueInput
  }

  export type CellCreateNestedManyWithoutRowInput = {
    create?: XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput> | CellCreateWithoutRowInput[] | CellUncheckedCreateWithoutRowInput[]
    connectOrCreate?: CellCreateOrConnectWithoutRowInput | CellCreateOrConnectWithoutRowInput[]
    createMany?: CellCreateManyRowInputEnvelope
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[]
  }

  export type CellUncheckedCreateNestedManyWithoutRowInput = {
    create?: XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput> | CellCreateWithoutRowInput[] | CellUncheckedCreateWithoutRowInput[]
    connectOrCreate?: CellCreateOrConnectWithoutRowInput | CellCreateOrConnectWithoutRowInput[]
    createMany?: CellCreateManyRowInputEnvelope
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutCreatedRowsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedRowsInput, UserUncheckedCreateWithoutCreatedRowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedRowsInput
    upsert?: UserUpsertWithoutCreatedRowsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedRowsInput, UserUpdateWithoutCreatedRowsInput>, UserUncheckedUpdateWithoutCreatedRowsInput>
  }

  export type TableUpdateOneRequiredWithoutRowsNestedInput = {
    create?: XOR<TableCreateWithoutRowsInput, TableUncheckedCreateWithoutRowsInput>
    connectOrCreate?: TableCreateOrConnectWithoutRowsInput
    upsert?: TableUpsertWithoutRowsInput
    connect?: TableWhereUniqueInput
    update?: XOR<XOR<TableUpdateToOneWithWhereWithoutRowsInput, TableUpdateWithoutRowsInput>, TableUncheckedUpdateWithoutRowsInput>
  }

  export type CellUpdateManyWithoutRowNestedInput = {
    create?: XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput> | CellCreateWithoutRowInput[] | CellUncheckedCreateWithoutRowInput[]
    connectOrCreate?: CellCreateOrConnectWithoutRowInput | CellCreateOrConnectWithoutRowInput[]
    upsert?: CellUpsertWithWhereUniqueWithoutRowInput | CellUpsertWithWhereUniqueWithoutRowInput[]
    createMany?: CellCreateManyRowInputEnvelope
    set?: CellWhereUniqueInput | CellWhereUniqueInput[]
    disconnect?: CellWhereUniqueInput | CellWhereUniqueInput[]
    delete?: CellWhereUniqueInput | CellWhereUniqueInput[]
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[]
    update?: CellUpdateWithWhereUniqueWithoutRowInput | CellUpdateWithWhereUniqueWithoutRowInput[]
    updateMany?: CellUpdateManyWithWhereWithoutRowInput | CellUpdateManyWithWhereWithoutRowInput[]
    deleteMany?: CellScalarWhereInput | CellScalarWhereInput[]
  }

  export type CellUncheckedUpdateManyWithoutRowNestedInput = {
    create?: XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput> | CellCreateWithoutRowInput[] | CellUncheckedCreateWithoutRowInput[]
    connectOrCreate?: CellCreateOrConnectWithoutRowInput | CellCreateOrConnectWithoutRowInput[]
    upsert?: CellUpsertWithWhereUniqueWithoutRowInput | CellUpsertWithWhereUniqueWithoutRowInput[]
    createMany?: CellCreateManyRowInputEnvelope
    set?: CellWhereUniqueInput | CellWhereUniqueInput[]
    disconnect?: CellWhereUniqueInput | CellWhereUniqueInput[]
    delete?: CellWhereUniqueInput | CellWhereUniqueInput[]
    connect?: CellWhereUniqueInput | CellWhereUniqueInput[]
    update?: CellUpdateWithWhereUniqueWithoutRowInput | CellUpdateWithWhereUniqueWithoutRowInput[]
    updateMany?: CellUpdateManyWithWhereWithoutRowInput | CellUpdateManyWithWhereWithoutRowInput[]
    deleteMany?: CellScalarWhereInput | CellScalarWhereInput[]
  }

  export type RowCreateNestedOneWithoutCellsInput = {
    create?: XOR<RowCreateWithoutCellsInput, RowUncheckedCreateWithoutCellsInput>
    connectOrCreate?: RowCreateOrConnectWithoutCellsInput
    connect?: RowWhereUniqueInput
  }

  export type ColumnCreateNestedOneWithoutCellsInput = {
    create?: XOR<ColumnCreateWithoutCellsInput, ColumnUncheckedCreateWithoutCellsInput>
    connectOrCreate?: ColumnCreateOrConnectWithoutCellsInput
    connect?: ColumnWhereUniqueInput
  }

  export type RowUpdateOneRequiredWithoutCellsNestedInput = {
    create?: XOR<RowCreateWithoutCellsInput, RowUncheckedCreateWithoutCellsInput>
    connectOrCreate?: RowCreateOrConnectWithoutCellsInput
    upsert?: RowUpsertWithoutCellsInput
    connect?: RowWhereUniqueInput
    update?: XOR<XOR<RowUpdateToOneWithWhereWithoutCellsInput, RowUpdateWithoutCellsInput>, RowUncheckedUpdateWithoutCellsInput>
  }

  export type ColumnUpdateOneRequiredWithoutCellsNestedInput = {
    create?: XOR<ColumnCreateWithoutCellsInput, ColumnUncheckedCreateWithoutCellsInput>
    connectOrCreate?: ColumnCreateOrConnectWithoutCellsInput
    upsert?: ColumnUpsertWithoutCellsInput
    connect?: ColumnWhereUniqueInput
    update?: XOR<XOR<ColumnUpdateToOneWithWhereWithoutCellsInput, ColumnUpdateWithoutCellsInput>, ColumnUncheckedUpdateWithoutCellsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumFieldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldType[] | ListEnumFieldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FieldType[] | ListEnumFieldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFieldTypeFilter<$PrismaModel> | $Enums.FieldType
  }

  export type NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldType[] | ListEnumFieldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FieldType[] | ListEnumFieldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel> | $Enums.FieldType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFieldTypeFilter<$PrismaModel>
    _max?: NestedEnumFieldTypeFilter<$PrismaModel>
  }

  export type BaseCreateWithoutCreatedByInput = {
    id?: string
    baseName: string
    description?: string | null
    color?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tables?: TableCreateNestedManyWithoutBaseInput
  }

  export type BaseUncheckedCreateWithoutCreatedByInput = {
    id?: string
    baseName: string
    description?: string | null
    color?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tables?: TableUncheckedCreateNestedManyWithoutBaseInput
  }

  export type BaseCreateOrConnectWithoutCreatedByInput = {
    where: BaseWhereUniqueInput
    create: XOR<BaseCreateWithoutCreatedByInput, BaseUncheckedCreateWithoutCreatedByInput>
  }

  export type BaseCreateManyCreatedByInputEnvelope = {
    data: BaseCreateManyCreatedByInput | BaseCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TableCreateWithoutCreatedByInput = {
    id?: string
    tableName: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    base: BaseCreateNestedOneWithoutTablesInput
    columns?: ColumnCreateNestedManyWithoutTableInput
    rows?: RowCreateNestedManyWithoutTableInput
    views?: ViewCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateWithoutCreatedByInput = {
    id?: string
    tableName: string
    displayOrder?: number
    baseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    columns?: ColumnUncheckedCreateNestedManyWithoutTableInput
    rows?: RowUncheckedCreateNestedManyWithoutTableInput
    views?: ViewUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableCreateOrConnectWithoutCreatedByInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutCreatedByInput, TableUncheckedCreateWithoutCreatedByInput>
  }

  export type TableCreateManyCreatedByInputEnvelope = {
    data: TableCreateManyCreatedByInput | TableCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ColumnCreateWithoutCreatedByInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    table: TableCreateNestedOneWithoutColumnsInput
    cells?: CellCreateNestedManyWithoutColumnInput
  }

  export type ColumnUncheckedCreateWithoutCreatedByInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cells?: CellUncheckedCreateNestedManyWithoutColumnInput
  }

  export type ColumnCreateOrConnectWithoutCreatedByInput = {
    where: ColumnWhereUniqueInput
    create: XOR<ColumnCreateWithoutCreatedByInput, ColumnUncheckedCreateWithoutCreatedByInput>
  }

  export type ColumnCreateManyCreatedByInputEnvelope = {
    data: ColumnCreateManyCreatedByInput | ColumnCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type RowCreateWithoutCreatedByInput = {
    id?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    table: TableCreateNestedOneWithoutRowsInput
    cells?: CellCreateNestedManyWithoutRowInput
  }

  export type RowUncheckedCreateWithoutCreatedByInput = {
    id?: string
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cells?: CellUncheckedCreateNestedManyWithoutRowInput
  }

  export type RowCreateOrConnectWithoutCreatedByInput = {
    where: RowWhereUniqueInput
    create: XOR<RowCreateWithoutCreatedByInput, RowUncheckedCreateWithoutCreatedByInput>
  }

  export type RowCreateManyCreatedByInputEnvelope = {
    data: RowCreateManyCreatedByInput | RowCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type BaseUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: BaseWhereUniqueInput
    update: XOR<BaseUpdateWithoutCreatedByInput, BaseUncheckedUpdateWithoutCreatedByInput>
    create: XOR<BaseCreateWithoutCreatedByInput, BaseUncheckedCreateWithoutCreatedByInput>
  }

  export type BaseUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: BaseWhereUniqueInput
    data: XOR<BaseUpdateWithoutCreatedByInput, BaseUncheckedUpdateWithoutCreatedByInput>
  }

  export type BaseUpdateManyWithWhereWithoutCreatedByInput = {
    where: BaseScalarWhereInput
    data: XOR<BaseUpdateManyMutationInput, BaseUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type BaseScalarWhereInput = {
    AND?: BaseScalarWhereInput | BaseScalarWhereInput[]
    OR?: BaseScalarWhereInput[]
    NOT?: BaseScalarWhereInput | BaseScalarWhereInput[]
    id?: StringFilter<"Base"> | string
    baseName?: StringFilter<"Base"> | string
    description?: StringNullableFilter<"Base"> | string | null
    color?: StringFilter<"Base"> | string
    displayOrder?: IntFilter<"Base"> | number
    createdAt?: DateTimeFilter<"Base"> | Date | string
    updatedAt?: DateTimeFilter<"Base"> | Date | string
    createdById?: StringNullableFilter<"Base"> | string | null
  }

  export type TableUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TableWhereUniqueInput
    update: XOR<TableUpdateWithoutCreatedByInput, TableUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TableCreateWithoutCreatedByInput, TableUncheckedCreateWithoutCreatedByInput>
  }

  export type TableUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TableWhereUniqueInput
    data: XOR<TableUpdateWithoutCreatedByInput, TableUncheckedUpdateWithoutCreatedByInput>
  }

  export type TableUpdateManyWithWhereWithoutCreatedByInput = {
    where: TableScalarWhereInput
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TableScalarWhereInput = {
    AND?: TableScalarWhereInput | TableScalarWhereInput[]
    OR?: TableScalarWhereInput[]
    NOT?: TableScalarWhereInput | TableScalarWhereInput[]
    id?: StringFilter<"Table"> | string
    tableName?: StringFilter<"Table"> | string
    displayOrder?: IntFilter<"Table"> | number
    baseId?: StringFilter<"Table"> | string
    createdAt?: DateTimeFilter<"Table"> | Date | string
    updatedAt?: DateTimeFilter<"Table"> | Date | string
    createdById?: StringNullableFilter<"Table"> | string | null
  }

  export type ColumnUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ColumnWhereUniqueInput
    update: XOR<ColumnUpdateWithoutCreatedByInput, ColumnUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ColumnCreateWithoutCreatedByInput, ColumnUncheckedCreateWithoutCreatedByInput>
  }

  export type ColumnUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ColumnWhereUniqueInput
    data: XOR<ColumnUpdateWithoutCreatedByInput, ColumnUncheckedUpdateWithoutCreatedByInput>
  }

  export type ColumnUpdateManyWithWhereWithoutCreatedByInput = {
    where: ColumnScalarWhereInput
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ColumnScalarWhereInput = {
    AND?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
    OR?: ColumnScalarWhereInput[]
    NOT?: ColumnScalarWhereInput | ColumnScalarWhereInput[]
    id?: StringFilter<"Column"> | string
    columnName?: StringFilter<"Column"> | string
    fieldType?: EnumFieldTypeFilter<"Column"> | $Enums.FieldType
    displayOrder?: IntFilter<"Column"> | number
    tableId?: StringFilter<"Column"> | string
    createdAt?: DateTimeFilter<"Column"> | Date | string
    updatedAt?: DateTimeFilter<"Column"> | Date | string
    createdById?: StringNullableFilter<"Column"> | string | null
  }

  export type RowUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: RowWhereUniqueInput
    update: XOR<RowUpdateWithoutCreatedByInput, RowUncheckedUpdateWithoutCreatedByInput>
    create: XOR<RowCreateWithoutCreatedByInput, RowUncheckedCreateWithoutCreatedByInput>
  }

  export type RowUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: RowWhereUniqueInput
    data: XOR<RowUpdateWithoutCreatedByInput, RowUncheckedUpdateWithoutCreatedByInput>
  }

  export type RowUpdateManyWithWhereWithoutCreatedByInput = {
    where: RowScalarWhereInput
    data: XOR<RowUpdateManyMutationInput, RowUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type RowScalarWhereInput = {
    AND?: RowScalarWhereInput | RowScalarWhereInput[]
    OR?: RowScalarWhereInput[]
    NOT?: RowScalarWhereInput | RowScalarWhereInput[]
    id?: StringFilter<"Row"> | string
    displayOrder?: IntFilter<"Row"> | number
    tableId?: StringFilter<"Row"> | string
    createdAt?: DateTimeFilter<"Row"> | Date | string
    updatedAt?: DateTimeFilter<"Row"> | Date | string
    createdById?: StringNullableFilter<"Row"> | string | null
  }

  export type UserCreateWithoutCreatedBasesInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdTables?: TableCreateNestedManyWithoutCreatedByInput
    createdColumns?: ColumnCreateNestedManyWithoutCreatedByInput
    createdRows?: RowCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedBasesInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdTables?: TableUncheckedCreateNestedManyWithoutCreatedByInput
    createdColumns?: ColumnUncheckedCreateNestedManyWithoutCreatedByInput
    createdRows?: RowUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedBasesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedBasesInput, UserUncheckedCreateWithoutCreatedBasesInput>
  }

  export type TableCreateWithoutBaseInput = {
    id?: string
    tableName: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTablesInput
    columns?: ColumnCreateNestedManyWithoutTableInput
    rows?: RowCreateNestedManyWithoutTableInput
    views?: ViewCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateWithoutBaseInput = {
    id?: string
    tableName: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    columns?: ColumnUncheckedCreateNestedManyWithoutTableInput
    rows?: RowUncheckedCreateNestedManyWithoutTableInput
    views?: ViewUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableCreateOrConnectWithoutBaseInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutBaseInput, TableUncheckedCreateWithoutBaseInput>
  }

  export type TableCreateManyBaseInputEnvelope = {
    data: TableCreateManyBaseInput | TableCreateManyBaseInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedBasesInput = {
    update: XOR<UserUpdateWithoutCreatedBasesInput, UserUncheckedUpdateWithoutCreatedBasesInput>
    create: XOR<UserCreateWithoutCreatedBasesInput, UserUncheckedCreateWithoutCreatedBasesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedBasesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedBasesInput, UserUncheckedUpdateWithoutCreatedBasesInput>
  }

  export type UserUpdateWithoutCreatedBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdTables?: TableUpdateManyWithoutCreatedByNestedInput
    createdColumns?: ColumnUpdateManyWithoutCreatedByNestedInput
    createdRows?: RowUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdTables?: TableUncheckedUpdateManyWithoutCreatedByNestedInput
    createdColumns?: ColumnUncheckedUpdateManyWithoutCreatedByNestedInput
    createdRows?: RowUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type TableUpsertWithWhereUniqueWithoutBaseInput = {
    where: TableWhereUniqueInput
    update: XOR<TableUpdateWithoutBaseInput, TableUncheckedUpdateWithoutBaseInput>
    create: XOR<TableCreateWithoutBaseInput, TableUncheckedCreateWithoutBaseInput>
  }

  export type TableUpdateWithWhereUniqueWithoutBaseInput = {
    where: TableWhereUniqueInput
    data: XOR<TableUpdateWithoutBaseInput, TableUncheckedUpdateWithoutBaseInput>
  }

  export type TableUpdateManyWithWhereWithoutBaseInput = {
    where: TableScalarWhereInput
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyWithoutBaseInput>
  }

  export type UserCreateWithoutCreatedTablesInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBases?: BaseCreateNestedManyWithoutCreatedByInput
    createdColumns?: ColumnCreateNestedManyWithoutCreatedByInput
    createdRows?: RowCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedTablesInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBases?: BaseUncheckedCreateNestedManyWithoutCreatedByInput
    createdColumns?: ColumnUncheckedCreateNestedManyWithoutCreatedByInput
    createdRows?: RowUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedTablesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTablesInput, UserUncheckedCreateWithoutCreatedTablesInput>
  }

  export type BaseCreateWithoutTablesInput = {
    id?: string
    baseName: string
    description?: string | null
    color?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedBasesInput
  }

  export type BaseUncheckedCreateWithoutTablesInput = {
    id?: string
    baseName: string
    description?: string | null
    color?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type BaseCreateOrConnectWithoutTablesInput = {
    where: BaseWhereUniqueInput
    create: XOR<BaseCreateWithoutTablesInput, BaseUncheckedCreateWithoutTablesInput>
  }

  export type ColumnCreateWithoutTableInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedColumnsInput
    cells?: CellCreateNestedManyWithoutColumnInput
  }

  export type ColumnUncheckedCreateWithoutTableInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    cells?: CellUncheckedCreateNestedManyWithoutColumnInput
  }

  export type ColumnCreateOrConnectWithoutTableInput = {
    where: ColumnWhereUniqueInput
    create: XOR<ColumnCreateWithoutTableInput, ColumnUncheckedCreateWithoutTableInput>
  }

  export type ColumnCreateManyTableInputEnvelope = {
    data: ColumnCreateManyTableInput | ColumnCreateManyTableInput[]
    skipDuplicates?: boolean
  }

  export type RowCreateWithoutTableInput = {
    id?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedRowsInput
    cells?: CellCreateNestedManyWithoutRowInput
  }

  export type RowUncheckedCreateWithoutTableInput = {
    id?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    cells?: CellUncheckedCreateNestedManyWithoutRowInput
  }

  export type RowCreateOrConnectWithoutTableInput = {
    where: RowWhereUniqueInput
    create: XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput>
  }

  export type RowCreateManyTableInputEnvelope = {
    data: RowCreateManyTableInput | RowCreateManyTableInput[]
    skipDuplicates?: boolean
  }

  export type ViewCreateWithoutTableInput = {
    id?: string
    viewName: string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: string | null
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViewUncheckedCreateWithoutTableInput = {
    id?: string
    viewName: string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: string | null
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViewCreateOrConnectWithoutTableInput = {
    where: ViewWhereUniqueInput
    create: XOR<ViewCreateWithoutTableInput, ViewUncheckedCreateWithoutTableInput>
  }

  export type ViewCreateManyTableInputEnvelope = {
    data: ViewCreateManyTableInput | ViewCreateManyTableInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedTablesInput = {
    update: XOR<UserUpdateWithoutCreatedTablesInput, UserUncheckedUpdateWithoutCreatedTablesInput>
    create: XOR<UserCreateWithoutCreatedTablesInput, UserUncheckedCreateWithoutCreatedTablesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTablesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTablesInput, UserUncheckedUpdateWithoutCreatedTablesInput>
  }

  export type UserUpdateWithoutCreatedTablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBases?: BaseUpdateManyWithoutCreatedByNestedInput
    createdColumns?: ColumnUpdateManyWithoutCreatedByNestedInput
    createdRows?: RowUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBases?: BaseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdColumns?: ColumnUncheckedUpdateManyWithoutCreatedByNestedInput
    createdRows?: RowUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type BaseUpsertWithoutTablesInput = {
    update: XOR<BaseUpdateWithoutTablesInput, BaseUncheckedUpdateWithoutTablesInput>
    create: XOR<BaseCreateWithoutTablesInput, BaseUncheckedCreateWithoutTablesInput>
    where?: BaseWhereInput
  }

  export type BaseUpdateToOneWithWhereWithoutTablesInput = {
    where?: BaseWhereInput
    data: XOR<BaseUpdateWithoutTablesInput, BaseUncheckedUpdateWithoutTablesInput>
  }

  export type BaseUpdateWithoutTablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedBasesNestedInput
  }

  export type BaseUncheckedUpdateWithoutTablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ColumnUpsertWithWhereUniqueWithoutTableInput = {
    where: ColumnWhereUniqueInput
    update: XOR<ColumnUpdateWithoutTableInput, ColumnUncheckedUpdateWithoutTableInput>
    create: XOR<ColumnCreateWithoutTableInput, ColumnUncheckedCreateWithoutTableInput>
  }

  export type ColumnUpdateWithWhereUniqueWithoutTableInput = {
    where: ColumnWhereUniqueInput
    data: XOR<ColumnUpdateWithoutTableInput, ColumnUncheckedUpdateWithoutTableInput>
  }

  export type ColumnUpdateManyWithWhereWithoutTableInput = {
    where: ColumnScalarWhereInput
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyWithoutTableInput>
  }

  export type RowUpsertWithWhereUniqueWithoutTableInput = {
    where: RowWhereUniqueInput
    update: XOR<RowUpdateWithoutTableInput, RowUncheckedUpdateWithoutTableInput>
    create: XOR<RowCreateWithoutTableInput, RowUncheckedCreateWithoutTableInput>
  }

  export type RowUpdateWithWhereUniqueWithoutTableInput = {
    where: RowWhereUniqueInput
    data: XOR<RowUpdateWithoutTableInput, RowUncheckedUpdateWithoutTableInput>
  }

  export type RowUpdateManyWithWhereWithoutTableInput = {
    where: RowScalarWhereInput
    data: XOR<RowUpdateManyMutationInput, RowUncheckedUpdateManyWithoutTableInput>
  }

  export type ViewUpsertWithWhereUniqueWithoutTableInput = {
    where: ViewWhereUniqueInput
    update: XOR<ViewUpdateWithoutTableInput, ViewUncheckedUpdateWithoutTableInput>
    create: XOR<ViewCreateWithoutTableInput, ViewUncheckedCreateWithoutTableInput>
  }

  export type ViewUpdateWithWhereUniqueWithoutTableInput = {
    where: ViewWhereUniqueInput
    data: XOR<ViewUpdateWithoutTableInput, ViewUncheckedUpdateWithoutTableInput>
  }

  export type ViewUpdateManyWithWhereWithoutTableInput = {
    where: ViewScalarWhereInput
    data: XOR<ViewUpdateManyMutationInput, ViewUncheckedUpdateManyWithoutTableInput>
  }

  export type ViewScalarWhereInput = {
    AND?: ViewScalarWhereInput | ViewScalarWhereInput[]
    OR?: ViewScalarWhereInput[]
    NOT?: ViewScalarWhereInput | ViewScalarWhereInput[]
    id?: StringFilter<"View"> | string
    viewName?: StringFilter<"View"> | string
    tableId?: StringFilter<"View"> | string
    filters?: JsonFilter<"View">
    groupByColumnId?: StringNullableFilter<"View"> | string | null
    displayOrder?: IntFilter<"View"> | number
    createdAt?: DateTimeFilter<"View"> | Date | string
    updatedAt?: DateTimeFilter<"View"> | Date | string
  }

  export type TableCreateWithoutViewsInput = {
    id?: string
    tableName: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTablesInput
    base: BaseCreateNestedOneWithoutTablesInput
    columns?: ColumnCreateNestedManyWithoutTableInput
    rows?: RowCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateWithoutViewsInput = {
    id?: string
    tableName: string
    displayOrder?: number
    baseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    columns?: ColumnUncheckedCreateNestedManyWithoutTableInput
    rows?: RowUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableCreateOrConnectWithoutViewsInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutViewsInput, TableUncheckedCreateWithoutViewsInput>
  }

  export type TableUpsertWithoutViewsInput = {
    update: XOR<TableUpdateWithoutViewsInput, TableUncheckedUpdateWithoutViewsInput>
    create: XOR<TableCreateWithoutViewsInput, TableUncheckedCreateWithoutViewsInput>
    where?: TableWhereInput
  }

  export type TableUpdateToOneWithWhereWithoutViewsInput = {
    where?: TableWhereInput
    data: XOR<TableUpdateWithoutViewsInput, TableUncheckedUpdateWithoutViewsInput>
  }

  export type TableUpdateWithoutViewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTablesNestedInput
    base?: BaseUpdateOneRequiredWithoutTablesNestedInput
    columns?: ColumnUpdateManyWithoutTableNestedInput
    rows?: RowUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateWithoutViewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    baseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    columns?: ColumnUncheckedUpdateManyWithoutTableNestedInput
    rows?: RowUncheckedUpdateManyWithoutTableNestedInput
  }

  export type UserCreateWithoutCreatedColumnsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBases?: BaseCreateNestedManyWithoutCreatedByInput
    createdTables?: TableCreateNestedManyWithoutCreatedByInput
    createdRows?: RowCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedColumnsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBases?: BaseUncheckedCreateNestedManyWithoutCreatedByInput
    createdTables?: TableUncheckedCreateNestedManyWithoutCreatedByInput
    createdRows?: RowUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedColumnsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedColumnsInput, UserUncheckedCreateWithoutCreatedColumnsInput>
  }

  export type TableCreateWithoutColumnsInput = {
    id?: string
    tableName: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTablesInput
    base: BaseCreateNestedOneWithoutTablesInput
    rows?: RowCreateNestedManyWithoutTableInput
    views?: ViewCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateWithoutColumnsInput = {
    id?: string
    tableName: string
    displayOrder?: number
    baseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    rows?: RowUncheckedCreateNestedManyWithoutTableInput
    views?: ViewUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableCreateOrConnectWithoutColumnsInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutColumnsInput, TableUncheckedCreateWithoutColumnsInput>
  }

  export type CellCreateWithoutColumnInput = {
    id?: string
    cellValue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    row: RowCreateNestedOneWithoutCellsInput
  }

  export type CellUncheckedCreateWithoutColumnInput = {
    id?: string
    cellValue?: string | null
    rowId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CellCreateOrConnectWithoutColumnInput = {
    where: CellWhereUniqueInput
    create: XOR<CellCreateWithoutColumnInput, CellUncheckedCreateWithoutColumnInput>
  }

  export type CellCreateManyColumnInputEnvelope = {
    data: CellCreateManyColumnInput | CellCreateManyColumnInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedColumnsInput = {
    update: XOR<UserUpdateWithoutCreatedColumnsInput, UserUncheckedUpdateWithoutCreatedColumnsInput>
    create: XOR<UserCreateWithoutCreatedColumnsInput, UserUncheckedCreateWithoutCreatedColumnsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedColumnsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedColumnsInput, UserUncheckedUpdateWithoutCreatedColumnsInput>
  }

  export type UserUpdateWithoutCreatedColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBases?: BaseUpdateManyWithoutCreatedByNestedInput
    createdTables?: TableUpdateManyWithoutCreatedByNestedInput
    createdRows?: RowUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBases?: BaseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdTables?: TableUncheckedUpdateManyWithoutCreatedByNestedInput
    createdRows?: RowUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type TableUpsertWithoutColumnsInput = {
    update: XOR<TableUpdateWithoutColumnsInput, TableUncheckedUpdateWithoutColumnsInput>
    create: XOR<TableCreateWithoutColumnsInput, TableUncheckedCreateWithoutColumnsInput>
    where?: TableWhereInput
  }

  export type TableUpdateToOneWithWhereWithoutColumnsInput = {
    where?: TableWhereInput
    data: XOR<TableUpdateWithoutColumnsInput, TableUncheckedUpdateWithoutColumnsInput>
  }

  export type TableUpdateWithoutColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTablesNestedInput
    base?: BaseUpdateOneRequiredWithoutTablesNestedInput
    rows?: RowUpdateManyWithoutTableNestedInput
    views?: ViewUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateWithoutColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    baseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    rows?: RowUncheckedUpdateManyWithoutTableNestedInput
    views?: ViewUncheckedUpdateManyWithoutTableNestedInput
  }

  export type CellUpsertWithWhereUniqueWithoutColumnInput = {
    where: CellWhereUniqueInput
    update: XOR<CellUpdateWithoutColumnInput, CellUncheckedUpdateWithoutColumnInput>
    create: XOR<CellCreateWithoutColumnInput, CellUncheckedCreateWithoutColumnInput>
  }

  export type CellUpdateWithWhereUniqueWithoutColumnInput = {
    where: CellWhereUniqueInput
    data: XOR<CellUpdateWithoutColumnInput, CellUncheckedUpdateWithoutColumnInput>
  }

  export type CellUpdateManyWithWhereWithoutColumnInput = {
    where: CellScalarWhereInput
    data: XOR<CellUpdateManyMutationInput, CellUncheckedUpdateManyWithoutColumnInput>
  }

  export type CellScalarWhereInput = {
    AND?: CellScalarWhereInput | CellScalarWhereInput[]
    OR?: CellScalarWhereInput[]
    NOT?: CellScalarWhereInput | CellScalarWhereInput[]
    id?: StringFilter<"Cell"> | string
    cellValue?: StringNullableFilter<"Cell"> | string | null
    rowId?: StringFilter<"Cell"> | string
    columnId?: StringFilter<"Cell"> | string
    createdAt?: DateTimeFilter<"Cell"> | Date | string
    updatedAt?: DateTimeFilter<"Cell"> | Date | string
  }

  export type UserCreateWithoutCreatedRowsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBases?: BaseCreateNestedManyWithoutCreatedByInput
    createdTables?: TableCreateNestedManyWithoutCreatedByInput
    createdColumns?: ColumnCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedRowsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBases?: BaseUncheckedCreateNestedManyWithoutCreatedByInput
    createdTables?: TableUncheckedCreateNestedManyWithoutCreatedByInput
    createdColumns?: ColumnUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedRowsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedRowsInput, UserUncheckedCreateWithoutCreatedRowsInput>
  }

  export type TableCreateWithoutRowsInput = {
    id?: string
    tableName: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTablesInput
    base: BaseCreateNestedOneWithoutTablesInput
    columns?: ColumnCreateNestedManyWithoutTableInput
    views?: ViewCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateWithoutRowsInput = {
    id?: string
    tableName: string
    displayOrder?: number
    baseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    columns?: ColumnUncheckedCreateNestedManyWithoutTableInput
    views?: ViewUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableCreateOrConnectWithoutRowsInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutRowsInput, TableUncheckedCreateWithoutRowsInput>
  }

  export type CellCreateWithoutRowInput = {
    id?: string
    cellValue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    column: ColumnCreateNestedOneWithoutCellsInput
  }

  export type CellUncheckedCreateWithoutRowInput = {
    id?: string
    cellValue?: string | null
    columnId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CellCreateOrConnectWithoutRowInput = {
    where: CellWhereUniqueInput
    create: XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput>
  }

  export type CellCreateManyRowInputEnvelope = {
    data: CellCreateManyRowInput | CellCreateManyRowInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedRowsInput = {
    update: XOR<UserUpdateWithoutCreatedRowsInput, UserUncheckedUpdateWithoutCreatedRowsInput>
    create: XOR<UserCreateWithoutCreatedRowsInput, UserUncheckedCreateWithoutCreatedRowsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedRowsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedRowsInput, UserUncheckedUpdateWithoutCreatedRowsInput>
  }

  export type UserUpdateWithoutCreatedRowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBases?: BaseUpdateManyWithoutCreatedByNestedInput
    createdTables?: TableUpdateManyWithoutCreatedByNestedInput
    createdColumns?: ColumnUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedRowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBases?: BaseUncheckedUpdateManyWithoutCreatedByNestedInput
    createdTables?: TableUncheckedUpdateManyWithoutCreatedByNestedInput
    createdColumns?: ColumnUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type TableUpsertWithoutRowsInput = {
    update: XOR<TableUpdateWithoutRowsInput, TableUncheckedUpdateWithoutRowsInput>
    create: XOR<TableCreateWithoutRowsInput, TableUncheckedCreateWithoutRowsInput>
    where?: TableWhereInput
  }

  export type TableUpdateToOneWithWhereWithoutRowsInput = {
    where?: TableWhereInput
    data: XOR<TableUpdateWithoutRowsInput, TableUncheckedUpdateWithoutRowsInput>
  }

  export type TableUpdateWithoutRowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTablesNestedInput
    base?: BaseUpdateOneRequiredWithoutTablesNestedInput
    columns?: ColumnUpdateManyWithoutTableNestedInput
    views?: ViewUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateWithoutRowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    baseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    columns?: ColumnUncheckedUpdateManyWithoutTableNestedInput
    views?: ViewUncheckedUpdateManyWithoutTableNestedInput
  }

  export type CellUpsertWithWhereUniqueWithoutRowInput = {
    where: CellWhereUniqueInput
    update: XOR<CellUpdateWithoutRowInput, CellUncheckedUpdateWithoutRowInput>
    create: XOR<CellCreateWithoutRowInput, CellUncheckedCreateWithoutRowInput>
  }

  export type CellUpdateWithWhereUniqueWithoutRowInput = {
    where: CellWhereUniqueInput
    data: XOR<CellUpdateWithoutRowInput, CellUncheckedUpdateWithoutRowInput>
  }

  export type CellUpdateManyWithWhereWithoutRowInput = {
    where: CellScalarWhereInput
    data: XOR<CellUpdateManyMutationInput, CellUncheckedUpdateManyWithoutRowInput>
  }

  export type RowCreateWithoutCellsInput = {
    id?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedRowsInput
    table: TableCreateNestedOneWithoutRowsInput
  }

  export type RowUncheckedCreateWithoutCellsInput = {
    id?: string
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type RowCreateOrConnectWithoutCellsInput = {
    where: RowWhereUniqueInput
    create: XOR<RowCreateWithoutCellsInput, RowUncheckedCreateWithoutCellsInput>
  }

  export type ColumnCreateWithoutCellsInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedColumnsInput
    table: TableCreateNestedOneWithoutColumnsInput
  }

  export type ColumnUncheckedCreateWithoutCellsInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type ColumnCreateOrConnectWithoutCellsInput = {
    where: ColumnWhereUniqueInput
    create: XOR<ColumnCreateWithoutCellsInput, ColumnUncheckedCreateWithoutCellsInput>
  }

  export type RowUpsertWithoutCellsInput = {
    update: XOR<RowUpdateWithoutCellsInput, RowUncheckedUpdateWithoutCellsInput>
    create: XOR<RowCreateWithoutCellsInput, RowUncheckedCreateWithoutCellsInput>
    where?: RowWhereInput
  }

  export type RowUpdateToOneWithWhereWithoutCellsInput = {
    where?: RowWhereInput
    data: XOR<RowUpdateWithoutCellsInput, RowUncheckedUpdateWithoutCellsInput>
  }

  export type RowUpdateWithoutCellsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedRowsNestedInput
    table?: TableUpdateOneRequiredWithoutRowsNestedInput
  }

  export type RowUncheckedUpdateWithoutCellsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ColumnUpsertWithoutCellsInput = {
    update: XOR<ColumnUpdateWithoutCellsInput, ColumnUncheckedUpdateWithoutCellsInput>
    create: XOR<ColumnCreateWithoutCellsInput, ColumnUncheckedCreateWithoutCellsInput>
    where?: ColumnWhereInput
  }

  export type ColumnUpdateToOneWithWhereWithoutCellsInput = {
    where?: ColumnWhereInput
    data: XOR<ColumnUpdateWithoutCellsInput, ColumnUncheckedUpdateWithoutCellsInput>
  }

  export type ColumnUpdateWithoutCellsInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedColumnsNestedInput
    table?: TableUpdateOneRequiredWithoutColumnsNestedInput
  }

  export type ColumnUncheckedUpdateWithoutCellsInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BaseCreateManyCreatedByInput = {
    id?: string
    baseName: string
    description?: string | null
    color?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TableCreateManyCreatedByInput = {
    id?: string
    tableName: string
    displayOrder?: number
    baseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColumnCreateManyCreatedByInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RowCreateManyCreatedByInput = {
    id?: string
    displayOrder?: number
    tableId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BaseUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tables?: TableUpdateManyWithoutBaseNestedInput
  }

  export type BaseUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tables?: TableUncheckedUpdateManyWithoutBaseNestedInput
  }

  export type BaseUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    base?: BaseUpdateOneRequiredWithoutTablesNestedInput
    columns?: ColumnUpdateManyWithoutTableNestedInput
    rows?: RowUpdateManyWithoutTableNestedInput
    views?: ViewUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    baseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    columns?: ColumnUncheckedUpdateManyWithoutTableNestedInput
    rows?: RowUncheckedUpdateManyWithoutTableNestedInput
    views?: ViewUncheckedUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    baseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColumnUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: TableUpdateOneRequiredWithoutColumnsNestedInput
    cells?: CellUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cells?: CellUncheckedUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RowUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: TableUpdateOneRequiredWithoutRowsNestedInput
    cells?: CellUpdateManyWithoutRowNestedInput
  }

  export type RowUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cells?: CellUncheckedUpdateManyWithoutRowNestedInput
  }

  export type RowUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    tableId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableCreateManyBaseInput = {
    id?: string
    tableName: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type TableUpdateWithoutBaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTablesNestedInput
    columns?: ColumnUpdateManyWithoutTableNestedInput
    rows?: RowUpdateManyWithoutTableNestedInput
    views?: ViewUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateWithoutBaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    columns?: ColumnUncheckedUpdateManyWithoutTableNestedInput
    rows?: RowUncheckedUpdateManyWithoutTableNestedInput
    views?: ViewUncheckedUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateManyWithoutBaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ColumnCreateManyTableInput = {
    id?: string
    columnName: string
    fieldType?: $Enums.FieldType
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type RowCreateManyTableInput = {
    id?: string
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type ViewCreateManyTableInput = {
    id?: string
    viewName: string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: string | null
    displayOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColumnUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedColumnsNestedInput
    cells?: CellUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    cells?: CellUncheckedUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateManyWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    fieldType?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RowUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedRowsNestedInput
    cells?: CellUpdateManyWithoutRowNestedInput
  }

  export type RowUncheckedUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    cells?: CellUncheckedUpdateManyWithoutRowNestedInput
  }

  export type RowUncheckedUpdateManyWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ViewUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewName?: StringFieldUpdateOperationsInput | string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViewUncheckedUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewName?: StringFieldUpdateOperationsInput | string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViewUncheckedUpdateManyWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewName?: StringFieldUpdateOperationsInput | string
    filters?: JsonNullValueInput | InputJsonValue
    groupByColumnId?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CellCreateManyColumnInput = {
    id?: string
    cellValue?: string | null
    rowId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CellUpdateWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    row?: RowUpdateOneRequiredWithoutCellsNestedInput
  }

  export type CellUncheckedUpdateWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    rowId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CellUncheckedUpdateManyWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    rowId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CellCreateManyRowInput = {
    id?: string
    cellValue?: string | null
    columnId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CellUpdateWithoutRowInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    column?: ColumnUpdateOneRequiredWithoutCellsNestedInput
  }

  export type CellUncheckedUpdateWithoutRowInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CellUncheckedUpdateManyWithoutRowInput = {
    id?: StringFieldUpdateOperationsInput | string
    cellValue?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}