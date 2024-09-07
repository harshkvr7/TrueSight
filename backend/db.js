import pg from "pg";

export const db = new pg.Client({
    user: 'postgres.zzttrnefpmgkgfizphmj',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    database: 'postgres',
    password: 'TrueSight@123',
    port: '6543',
});