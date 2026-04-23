import { z } from "zod";

export type SchemaType = {
    body?: z.ZodType;
    params?: z.ZodType;
    query?: z.ZodType;
};