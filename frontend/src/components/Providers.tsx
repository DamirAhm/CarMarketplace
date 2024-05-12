'use client'

import {createCtx} from "@reatom/core";
import {reatomContext} from "@reatom/npm-react";
import {PropsWithChildren} from "react";
import {UserFetcher} from "./UserFetcher";

const ctx = createCtx()

export const Providers = ({children}: PropsWithChildren) => {
    return <>
        <reatomContext.Provider value={ctx}>
            <UserFetcher/>
            {children}
        </reatomContext.Provider>
    </>
}