export interface ContactModel {
    name?: string;
    first_name?: string;
    last_name?: string;
    responsible_user_id?: number;
    group_id?: number;
    created_by?: number;
    updated_by?: number;
    created_at?: number;
    updated_at?: number;
    is_deleted?: boolean;
    is_unsorted?: boolean;
    closest_task_at?: number | null;
    custom_fields_values?: JSON | null;
    account_id?: number;
    _embedded?: JSON | null;
}