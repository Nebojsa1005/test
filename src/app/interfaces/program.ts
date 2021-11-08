import { Candidate } from "./candidate";


export interface Program {
    candidate: Candidate,
    program: string,
    date: Date,
    disability: boolean
}
