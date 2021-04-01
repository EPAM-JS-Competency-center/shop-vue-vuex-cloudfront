import type { Address } from './address';

interface Status {
    status: string;
}

export interface Order {
    address: Address;
    items: unknown[]; // TODO: find exact
    statusHistory: Status[]
}