export type BreadcrumbItem = {
    id: string;
    name: string;
    link: string;
}

export interface Breadcrumb {
    dashboard: BreadcrumbItem;
    history: any;
    currentPage: string;
}