export interface Ticket {
    description: string,
    receiverCode: string | null,
    receiverName: string | null,
    sederCode: string,
    sederName: string | null,
    state: number,
    time: string,
    uid: string,
}