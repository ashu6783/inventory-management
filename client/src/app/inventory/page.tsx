"use client";
import { useGetProductsQuery } from "../state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 190,
    flex: 0.8,
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 200,
    flex: 1.2,
    minWidth: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    flex: 0.6,
    valueGetter: (value, row) => `$${row.price}`,
    cellClassName: "font-semibold text-green-600",
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    flex: 0.6,
    valueGetter: (value, row) => (row.rating ? `${row.rating}/5` : "N/A"),
    cellClassName: "text-yellow-600",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
    flex: 0.8,
    cellClassName: (params) =>
      params.value < 10 ? "text-red-600 font-semibold" : "text-green-600",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-lg text-gray-600">Loading inventory...</span>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 text-xl mb-2">⚠️ Error</div>
        <div className="text-center text-red-500">
          Failed to fetch products.
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Header name="Inventory" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
          <p className="text-2xl font-bold text-red-600">
            {products.filter((p) => p.stockQuantity < 10).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {(
              products.reduce((acc, p) => acc + (p.rating || 0), 0) /
              products.length
            ).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Data Grid Container */}
      <div className="flex-1 w-full">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="h-[600px] w-full">
            <DataGrid
              rows={products}
              columns={columns}
              getRowId={(row) => row.productId}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50, 100]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25 },
                },
              }}
              sx={{
                border: "none",
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #f3f4f6",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f9fafb",
                  borderBottom: "2px solid #e5e7eb",
                },
                "& .MuiDataGrid-row": {
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                  },
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "2px solid #e5e7eb",
                  backgroundColor: "#f9fafb",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
