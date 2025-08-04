export interface LeadModel {
    name?: string;
    price?: number,
    status_id?: number,
    pipeline_id?: number,
    created_by?: number,
    updated_by?: number,
    closed_at?: number,
    created_at?: number;
    updated_at?: number;
    loss_reason_id?: number;
    responsible_user_id?: number;
    custom_fields_values?: JSON | null;
    tags_to_add?: JSON | null;
    _embedded?: JSON | null;
}