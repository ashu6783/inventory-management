import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    productId:string;
    name:string;
    price:number;
    rating?:number;
    stockQuantity:number;
}

export interface NewProduct {
    name:string;
    price:number;
    rating?:number;
    stockQuantity:number;
}

export interface SaleSummary{
    salesAummaryId:string;
    totalValue:number;
    changePerentage:number;
    date:string;
}

export interface PurchaseSummary{
    purchaseSummaryId:string;
    totalPurchased:number;
    changePercentage?:number;
    date:string;
}

export interface ExpenseSummary{
    expenseSummaryId:string;
    totalExpenses:number;
    date:string;
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category:string;
    date:string;
    amount:string;
}

export interface User {
    userId:string;
    name:string;
    email:string;    
}

export interface DashboardMetrics{
    popularProducts : Product[];
    saleSummary: SaleSummary[];
    purchaseSummary:PurchaseSummary[];
    expenseSummary:ExpenseSummary[];
    expenseByCategorySummary:ExpenseByCategorySummary[];
}

export const api=createApi({
    baseQuery:fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath:"api",
    tagTypes:["DashboardMetrics","Products","Users","Expenses"],
    endpoints:(build)=>({
        getDashboardMetrics:build.query<DashboardMetrics, void>({
            query : ()=> "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<Product[], string | void>({
        query: (search)=>({
            url:"/products",
            params:search ? {search}:{}
        }),
        providesTags:["Products"],
    }),
        createProduct: build.mutation<Product,NewProduct>({ //anything other than get is a mutation 
            query: (newProduct)=>({
             url:"/products",
             method: "POST",
             body:newProduct
         }),

         invalidatesTags: ["Products"] // anytimw we uptate a product or create a product it will send another api call immediately grabing the new list of products meaaning previous gets invalideated 
        }),
         getUsers : build.query<User[], void>({
            query:()=>"/users",
            providesTags:["Users"]
       
      }),
         getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
            query:()=>"/expenses",
            providesTags:["Expenses"]
       
      }),
    }),
});

export const {useGetDashboardMetricsQuery , useGetProductsQuery, useCreateProductMutation, useGetUsersQuery,useGetExpensesByCategoryQuery}=api;