import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

export enum RxJSLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxjsLoggingLevel: RxJSLoggingLevel = RxJSLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RxJSLoggingLevel) {
    rxjsLoggingLevel = level
}

export const debug = (level: number, message: string) =>
    (source: Observable<any>) => source.pipe(
        tap(val => {
            if (level >= rxjsLoggingLevel) {
                console.log(`${message} : ${val}`);
            }



        })
    ) 