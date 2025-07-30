"use client"
import { useGetUsersQuery } from '../state/api'
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef[] = [
    { 
        field: "userId", 
        headerName: "ID", 
        width: 190,
        flex: 0.8
    },
    { 
        field: "name", 
        headerName: "User Name", 
        width: 200,
        flex: 1.2,
        minWidth: 150
    },
    { 
        field: "email", 
        headerName: "Email", 
        width: 200,
        flex: 1.2,
        minWidth: 150
    },
    
]

const Users = () => {
    const { data: users, isError, isLoading } = useGetUsersQuery();
    
    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                <span className='ml-4 text-lg text-gray-600'>Loading Users...</span>
            </div>
        )
    }

    if (isError || !users) {
        return (
            <div className='flex flex-col items-center justify-center h-64'>
                <div className='text-red-500 text-xl mb-2'>⚠️ Error</div>
                <div className='text-center text-red-500'>Failed to fetch products.</div>
                <button 
                    className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className='flex flex-col h-full w-full'>
            <Header name='Users' />

            {/* Data Grid Container */}
            <div className='flex-1 w-full'>
                <div className='bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden'>
                    <div className='h-[600px] w-full'>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            getRowId={(row) => row.userId}
                            checkboxSelection
                            disableRowSelectionOnClick
                            pageSizeOptions={[10, 25, 50, 100]}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 25 }
                                }
                            }}
                            sx={{
                                border: 'none',
                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid #f3f4f6',
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#f9fafb',
                                    borderBottom: '2px solid #e5e7eb',
                                },
                                '& .MuiDataGrid-row': {
                                    '&:hover': {
                                        backgroundColor: '#f8fafc',
                                    },
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: '2px solid #e5e7eb',
                                    backgroundColor: '#f9fafb',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users