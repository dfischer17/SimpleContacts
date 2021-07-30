import { Address } from './address';

export interface Contact {
    contactType: boolean;
    lastname?: string;
    firstname?: string;
    companyname?: string;
    address: Address[];
}
