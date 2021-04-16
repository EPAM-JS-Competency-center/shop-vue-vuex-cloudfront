import type { Address } from './address';

export enum ORDER_STATUS {
	Open = 'open',
	Approved = 'approved',
	Confirmed = 'confirmed',
	Sent = 'sent',
	Completed = 'completed',
	Cancelled = 'cancelled',
}

export const ORDER_STATUS_FLOW = [
	ORDER_STATUS.Open,
	ORDER_STATUS.Approved,
	ORDER_STATUS.Confirmed,
	ORDER_STATUS.Sent,
	ORDER_STATUS.Completed,
	ORDER_STATUS.Cancelled,
];

export interface StatusHistory {
	status: ORDER_STATUS;
	timestamp: string;
	comment: string;
}

export interface Order {
	id?: string;
	address: Address;
	items: unknown[]; // TODO: find exact
	statusHistory: StatusHistory[];
}
