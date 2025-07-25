// import { count } from "drizzle-orm";
// import { getDb } from "../db";
//
// type PaginateOptions = {
//   limit: number;
//   offset: number;
// };
//
// type PaginatedResponse<T> = {
//   data: T[];
//   meta: {
//     total: number;
//     limit: number;
//     offset: number;
//     hasMore: boolean;
//     nextOffset: number | null;
//   };
// };
//
// export async function paginateQuery<T>(
//   baseQuery: any,
//   db: ReturnType<typeof getDb>,
//   table: any,
//   options: PaginateOptions
// ): Promise<PaginatedResponse<T>> {
//   const { limit, offset } = options;
//
//   const paginatedQuery = baseQuery.limit(limit).offset(offset);
//
//   const categoriesPromise = paginatedQuery;
//   const countPromise = db
//     .select({ count: count() })
//     .from(table)
//     .then(rows => rows[0].count);
//
//   const [data, total] = await Promise.all([categoriesPromise, countPromise]);
//
//   const hasMore = offset + limit < total;
//
//   return {
//     data,
//     meta: {
//       total,
//       limit,
//       offset,
//       hasMore,
//       nextOffset: hasMore ? offset + limit : null,
//     },
//   };
// }
