import { Address } from './address';
import { ContactOption } from './contact-option';

export interface Contact {
    // Properties für Personen und Unternehmen
    contactType: boolean;
    address: Address[];
    contactOptions: ContactOption[];

    // Properties für Personen
    lastname?: string;
    firstname?: string;
    birthdate?: string;
    gender?: number;

    // Properties für Unternehmen
    companyname?: string;
}
