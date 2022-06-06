export interface PaginationModel {
    page: number,
    pageSize: number,
}

export interface PaginationConfigurationModel {
    currentPage: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
}
